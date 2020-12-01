import React from 'react'; 
import {ITableHook, useInputTableHook} from './inputtablehook'; 
import {RenderFunc, IColumnSetting, IColumnSettingRule, IForeignDao, CrudFunc, ColumnSetter} from './columsetting/columsetter'; 
import {InputHeader, InputHeaderContext, InputHeaderRow, InputHeaderRowContext} from './inputtableheader'; 
import {InputRows, InputRow, InputRowContext} from './inputrows'; 
import {InputCells, InputCell} from './inputcells'; 

export {InputHeader, InputHeaderContext, InputHeaderRow, InputHeaderRowContext, 
  InputRows, InputRow, InputRowContext, 
  InputCells, InputCell, ColumnSetter 
}; 
export type {ITableHook, IColumnSetting, IColumnSettingRule, IForeignDao, CrudFunc, RenderFunc}; 


// INPUT TABLE ==================================
interface IInputTableContext{ 
  tableHook:ITableHook; 
} 
export const InputTableContext = React.createContext({} as IInputTableContext); 
interface IInputTable{ 
  entries: any[]; 
  columnSettings: IColumnSetting[]; 
} 
export default function InputTable({entries, columnSettings, children}: React.PropsWithChildren<IInputTable>) { 
  const tableHook = useInputTableHook(entries, columnSettings); 

  // RENDER -------------------------------------
  const context = {tableHook, columnSettings} as IInputTableContext; 
  
  return <InputTableContext.Provider value={context} > 
      <div>{JSON.stringify([tableHook.activeMode, tableHook.activeRow])}</div> 
      <div>{JSON.stringify(tableHook.activeEntry)}</div> 
      <table>{children}</table> 
    </InputTableContext.Provider> 
}