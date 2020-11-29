import { useState } from 'react'; 



// Interface COLUMN SETTTING ====================
export type RenderFunc = (ifield:IField, value:any, onSendValue:any) => any; 
interface RenderMap { 
  handle: string; 
  renderFunc: RenderFunc; 
} 

export interface IColumnSettings { 
  // if 'undefined' it will be assumed as a default column setting if no other column setting predicate is passes. 
  predicate?: (tableHook:ITableHook, row?:number) => boolean; 
  columnSettings: IColumnSetting[]; 
} 
export interface IColumnSetting { 
  ifield: IField; 
  renderFunc: RenderFunc; 
} 

// INPUT TABLE HOOK =============================
export type CrudFunc = (entry:IEntry) => Promise<boolean>; 


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
  GetColumnSettings: (row?:number, optionalColumnSettings?:IColumnSettings[]) => IColumnSetting[]; 
} 

export function useInputTableHook(entries:IEntry[], columnSettings:IColumnSettings[]):ITableHook { 
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

  const GetColumnSettings = (row?:number, optionalColumnSettings?:IColumnSettings[]) => { 
    const fromOptional = FindApplicableColumnSettings(row, optionalColumnSettings); 
    if(fromOptional != undefined && fromOptional.length > 0) 
      return fromOptional; 
    const fromTable = FindApplicableColumnSettings(row, columnSettings); 
    return fromTable ?? [] as IColumnSetting[]; 
  }

  const FindApplicableColumnSettings = (row?:number, columnSettings?:IColumnSettings[]) => { 
    if(columnSettings === undefined) 
      return undefined; 
    const defaultColumnSetting = columnSettings.find( cols => cols.predicate === undefined); 
    const applicableColumnSetting = columnSettings.find( cols => cols.predicate && cols.predicate(tableHook, row)); 
    return applicableColumnSetting?.columnSettings ?? defaultColumnSetting?.columnSettings; 
  }

  return {...tableHook, GetColumnSettings}; 
} 