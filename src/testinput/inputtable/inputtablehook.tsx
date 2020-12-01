import { useState } from 'react'; 
import { IColumnSetting, CrudFunc } from "./columsetting/columsetter"; 


export interface ITableStatus { 
  entries: IEntry[]; 
  activeEntry:IEntry; 
  activeRow:number; 
  activeMode:string; 
}
export interface ITableHook extends ITableStatus{ 
  setActiveEntry:any; 
  setActiveRow: any; 
  setActiveMode:any; 
  CrudAction: (crudFunc:CrudFunc) => Promise<void>; 
  SetActiveEntry: (newValue:any, columnSetting:IColumnSetting) => void; 
  GetActiveHook: (row?:number) => string; 
  ActivateHook: (mode?:string, row?:number) => void; 
  ResetActiveHooks: () => void; 
  GetColumnSettings: (row?:number, optionalColumnSettings?:IColumnSetting[]) => IColumnSetting[]; 
} 

export function useInputTableHook(entries:IEntry[], columnSettings:IColumnSetting[]):ITableHook { 
  const [activeEntry, setActiveEntry] = useState<IEntry>({} as IEntry); 
  const [activeRow, setActiveRow] = useState(-1); 
  const [activeMode, setActiveMode] = useState('read'); 

  const CrudAction = async (crudFunc:CrudFunc) => { 
    if(await crudFunc(activeEntry)) 
      ResetActiveHooks(); 
  } 

  const SetActiveEntry = (newValue:any, columnSetting:IColumnSetting) => { 
    const newEntries = {...activeEntry}; 
    newEntries[columnSetting.ifield.accessor as any] = newValue; 
    setActiveEntry(newEntries); 
  } 

  const GetActiveHook = (row?:number) => { 
    if(row != undefined && activeRow === row) 
      return activeMode; 
    return ''; 
  }

  const ActivateHook = (mode:string = 'read', row:number =-1) => { 
    const entry = entries[row] ?? {}; 
    setActiveMode(mode); 
    setActiveRow(row); 
    setActiveEntry(entry); 
  } 

  const ResetActiveHooks = () => { 
    setActiveEntry({} as IEntry); 
    setActiveRow(-1); 
    setActiveMode('read'); 
  } 

  const tableHook = {entries, activeEntry, setActiveEntry, activeRow, setActiveRow, activeMode, setActiveMode, 
    SetActiveEntry, CrudAction, GetActiveHook, ActivateHook, ResetActiveHooks} as ITableHook; 

  const GetColumnSettings = (row?:number, optionalColumnSettings?:IColumnSetting[]) => { 
    const fromTable = FindApplicableColumnSettings(row, columnSettings); 
    return fromTable ?? [] as IColumnSetting[]; 
  } 

  const FindApplicableColumnSettings = (row?:number, columnSettings?:IColumnSetting[]) => { 
    if(columnSettings === undefined) 
      return undefined; 
    const defaultColumnSetting = columnSettings.filter( cols => cols.predicate === undefined); 
    const applicableColumnSetting = columnSettings.filter( cols => cols.predicate && cols.predicate(tableHook, row)); 
    
    const foundColumSetting:IColumnSetting[] = []; 
    applicableColumnSetting.forEach( c => { 
      const fieldAccessor = foundColumSetting.map(fc => fc.ifield.accessor); 
      if(!fieldAccessor.includes(c.ifield.accessor)) 
        foundColumSetting.push(c); 
    }) 
    defaultColumnSetting.forEach( c => { 
      const fieldAccessor = foundColumSetting.map(fc => fc.ifield.accessor); 
      if(!fieldAccessor.includes(c.ifield.accessor)) 
        foundColumSetting.push(c); 
    }) 
    return OrderColumnSettings(foundColumSetting); 
  } 

  const OrderColumnSettings = (columnSettings:IColumnSetting[]) => { 
    return columnSettings.sort((a,b) => { 
      return (a.order ?? 0) - (b.order ?? 0) 
    }); 
  } 

  return {...tableHook, GetColumnSettings}; 
} 