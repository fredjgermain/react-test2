import { useState } from 'react'; 
import { IFieldSetting, CrudFunc } from "./columsetting/columsetter"; 


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
  SetActiveEntry: (newValue:any, columnSetting:IFieldSetting) => void; 
  GetActiveHook: (row?:number) => string; 
  ActivateHook: (mode?:string, row?:number) => void; 
  ResetActiveHooks: () => void; 
  GetColumnSettings: (row?:number, optionalColumnSettings?:IFieldSetting[]) => IFieldSetting[]; 
} 

export function useInputTableHook(entries:IEntry[], columnSettings:IFieldSetting[]):ITableHook { 
  const [activeEntry, setActiveEntry] = useState<IEntry>({} as IEntry); 
  const [activeRow, setActiveRow] = useState(-1); 
  const [activeMode, setActiveMode] = useState('read'); 

  const CrudAction = async (crudFunc:CrudFunc) => { 
    if(await crudFunc(activeEntry)) 
      ResetActiveHooks(); 
  } 

  const SetActiveEntry = (newValue:any, columnSetting:IFieldSetting) => { 
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

    
  const GetColumnSettings = (row?:number, optionalColumnSettings?:IFieldSetting[]) => { 
    const fromTable = FindApplicableColumnSettings(row, columnSettings); 
    return fromTable ?? [] as IFieldSetting[]; 
  } 

  const FindApplicableColumnSettings = (row?:number, columnSettings?:IFieldSetting[]) => { 
    if(columnSettings === undefined) 
      return undefined; 
    const defaultColumnSetting = columnSettings.filter( cols => cols.cellPredicate === undefined); 
    const applicableColumnSetting = columnSettings.filter( cols => cols.cellPredicate && cols.cellPredicate(tableHook, row)); 
    
    const foundColumSetting:IFieldSetting[] = []; 
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

  const OrderColumnSettings = (columnSettings:IFieldSetting[]) => { 
    return columnSettings.sort((a,b) => { 
      return (a.order ?? 0) - (b.order ?? 0) 
    }); 
  } 

  return {...tableHook, GetColumnSettings}; 
} 