import React, { useState } from 'react'; 

// INPUT TABLE HOOK =============================
export interface ITableHook {
  entries: IEntry[]; 
  activeEntry:IEntry; 
  setActiveEntry:any; 
  activeRow:number; 
  setActiveRow: any; 
  activeMode:string; 
  setActiveMode:any; 
  GetActiveMode: (row?:number) => string; 
  ActivateHook: (mode?:string, row?:number) => void; 
  ResetActiveHooks: () => void; 
} 

export function useInputTableHook(entries:IEntry[]):ITableHook { 
  const [activeEntry, setActiveEntry] = useState<IEntry>({} as IEntry); 
  const [activeRow, setActiveRow] = useState(-1); 
  const [activeMode, setActiveMode] = useState('read'); 

  /*const GetActiveMode = (row:number) => { 
    if(row != undefined || row === -1) 
      return ''; 
    if(activeRow === row) 
      return activeMode; 
    return ''; 
  }; */

  const GetActiveMode = (row?:number) => { 
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

  return {entries, activeEntry, setActiveEntry, activeRow, setActiveRow, activeMode, setActiveMode, GetActiveMode, ActivateHook, ResetActiveHooks}; 
} 


type RenderFunc = (value:any, onSendValue:any) => any; 
interface RenderMap { 
  handle: string; 
  renderFunc: RenderFunc; 
} 
export interface IColumnSetting { 
  field: string; 
  defaultValue?: any; 
  renderFunc: RenderFunc; 
} 

interface IInputTableContext{ 
  tableHook:ITableHook; 
  columnSettings: { 
    read:IColumnSetting[]; 
    edit:IColumnSetting[]; 
  } 
} 

export const InputTableContext = React.createContext({} as IInputTableContext); 
interface IInputTable{ 
  entries: any[]; 
  columnSettings: { 
    read:IColumnSetting[]; 
    edit:IColumnSetting[]; 
  } 
} 
// INPUT TABLE ==================================
export default function InputTable({entries, columnSettings, children}: React.PropsWithChildren<IInputTable>) { 
  console.log('InputTable'); 
  //const [Entries, setEntries] = useState(entries); 
  const tableHook = useInputTableHook(entries); 

  // RENDER -------------------------------------
  const context = {tableHook, columnSettings} as IInputTableContext; 
  
  return <InputTableContext.Provider value={context} > 
      <div>{JSON.stringify(tableHook.activeEntry)}</div> 
      <table>{children}</table> 
    </InputTableContext.Provider> 
}


/*
const domTestt = (dom:React.RefObject<HTMLDivElement>) => { 
  const div = document.createElement('div'); 
  const child = renderToString(<Child/>); 
  div.innerHTML = child; 
  //newElem.innerText = "new Element"; 
  //newElem.innerHTML = '<Child/>'; 
  
  ref.current?.appendChild(div); 
  console.log(ref.current);
} */