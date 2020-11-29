import React from 'react'; 
import {ITableHook, useInputTableHook, IColumnSetting, IColumnSettings, CrudFunc, RenderFunc} from './inputtablehook'; 
export {useInputTableHook}; 
export type {ITableHook, IColumnSetting, IColumnSettings, CrudFunc, RenderFunc}; 

interface IInputTableContext{ 
  tableHook:ITableHook; 
  columnSettings:IColumnSettings[]; 
} 

export const InputTableContext = React.createContext({} as IInputTableContext); 
interface IInputTable{ 
  entries: any[]; 
  columnSettings: IColumnSettings[]; 
} 
// INPUT TABLE ==================================
export default function InputTable({entries, columnSettings, children}: React.PropsWithChildren<IInputTable>) { 
  console.log('InputTable'); 
  const tableHook = useInputTableHook(entries, columnSettings); 

  // RENDER -------------------------------------
  const context = {tableHook, columnSettings} as IInputTableContext; 
  
  return <InputTableContext.Provider value={context} > 
      <div>{JSON.stringify(tableHook.activeEntry)}</div> 
      <table>{children}</table> 
    </InputTableContext.Provider> 
}