import React, { useContext } from 'react'; 
import {InputTableContext, IColumnSetting} from './inputtable'; 
import {InputRowContext} from './inputrow'; 
import { read } from 'fs/promises';


interface IInputCellsContext{} 
const InputCellsContext = React.createContext({} as IInputCellsContext); 

interface IInputCells { 
  columns?: IColumnSetting[]; 
} 
export default function InputCells({columns=[]}: React.PropsWithChildren<IInputCells>) { 
  const {activeRowHook:{activeRow, setActiveRow}, 
    activeModeHook:{activeMode,setActiveMode}, 
    columnSettings} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 
  const RowIsActive = () => {return row != undefined && row === activeRow}; 

  // pick the righ column setting depending on activeRow and ModeHook
  const ColumnsSetting = RowIsActive() && (activeMode === 'update' || activeMode === 'create') ? columnSettings.edit : columnSettings.read; 

  return <InputCellsContext.Provider value={{}}> 
      {ColumnsSetting.map( (column, i) => { 
      return <InputCell key={i} {...{column}} /> 
    })} 
    </InputCellsContext.Provider> 
} 



interface IInputCell { 
  column: IColumnSetting; 
} 
function InputCell({column}: IInputCell) { 
  const {entriesHook:{Entries, setEntries}, 
    activeEntryHook:{activeEntry,setActiveEntry}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 
  
  //{row} {column.field} 
  let value; 
  if(row != undefined && row >=0) 
    value = Entries[row][column.field];  // or default value as given by colsettings 
  value = value ?? column.defaultValue; 
  console.log(value);

  /* onSendValue = modify activeEntryHook */ 
  const onSendValue = (newValue:any) => { 
    const newEntries = {...activeEntry}; 
    newEntries[column.field as any] = newValue; 
    setActiveEntry(newEntries); 
  }

  return <td> 
    {column.renderFunc(value, onSendValue)} 
  </td> 
} 