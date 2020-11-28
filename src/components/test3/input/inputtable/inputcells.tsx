import React, { useContext } from 'react'; 
import {InputTableContext, IColumnSetting, IColumnSettings} from './inputtable'; 
import {InputRowContext} from './inputrow'; 


interface IInputCellsContext{} 
const InputCellsContext = React.createContext({} as IInputCellsContext); 
// INPUT CELLS ==================================
interface IInputCells { 
  optionalColumnSettings?: IColumnSettings[]; 
} 
export default function InputCells({optionalColumnSettings}: React.PropsWithChildren<IInputCells>) { 
  const {tableHook:{GetColumnSettings}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  // pick the right column setting depending on activeRow and ModeHook 
  const ColumnsSetting = GetColumnSettings(row, optionalColumnSettings); 

  // RENDER -------------------------------------
  return <InputCellsContext.Provider value={{}}> 
      {ColumnsSetting.map( (column, i) => { 
      return <InputCell key={i} {...{column}} /> 
    })} 
    </InputCellsContext.Provider> 
} 


// INPUT CELL ====================================
interface IInputCell { 
  column: IColumnSetting; 
} 
function InputCell({column}: IInputCell) { 
  const {tableHook:{entries, SetActiveEntry}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 
  
  let value; 
  if(row != undefined && row >=0) 
    value = entries[row][column.field];  // or default value as given by colsettings 
  value = value ?? column.defaultValue; 

  const onSendValue = (newValue:any) => SetActiveEntry(newValue, column); 

  // RENDER -------------------------------------
  return <td> 
    {column.renderFunc(value, onSendValue)} 
  </td> 
} 