import React, { useContext } from 'react'; 
import {InputTableContext} from './inputtable'; 
import {IColumnSetting} from './columsetting/columsetter'; 
import {InputRowContext} from './inputrows'; 


interface IInputCellsContext{} 
const InputCellsContext = React.createContext({} as IInputCellsContext); 
// INPUT CELLS ==================================
interface IInputCells { 
  optionalColumnSettings?: IColumnSetting[]; 
} 
export function InputCells({optionalColumnSettings}: React.PropsWithChildren<IInputCells>) { 
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
export function InputCell({column}: IInputCell) { 
  const {tableHook:{entries, SetActiveEntry}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 
  const {ifield, renderFunc} = column; 
  
  let value; 
  if(row != undefined && row >=0) 
    value = entries[row][ifield.accessor];  // or default value as given by colsettings 
  value = value ?? ifield.defaultValue; 
  
  const onSendValue = (newValue:any) => SetActiveEntry(newValue, column); 
  // RENDER -------------------------------------
  return <td> 
    {renderFunc(value, onSendValue)} 
  </td> 
} 