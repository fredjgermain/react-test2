import React, { useState, useRef } from 'react'; 
import ReactDom from 'react-dom'; 
import { renderToString } from 'react-dom/server'; 


type RenderFunc = (value:any, onSendValue:any) => any; 
interface RenderMap { 
  handle: string; 
  renderFunc: RenderFunc; 
} 
/*interface IColumnSetting { 
  ifield:IField; 
  RenderMap: RenderMap[]; 
}*/
export interface IColumnSetting { 
  field: string; 
  renderFunc: RenderFunc; 
  defaultValue?: any; 
} 

interface IInputTableContext{ 
  entriesHook:{ 
    Entries:any[]; 
    setEntries:any; 
  } 
  activeEntryHook:{ 
    activeEntry:any[]; 
    setActiveEntry:any; 
  } 
  activeRowHook:{ 
    activeRow:number; 
    setActiveRow: any; 
  } 
  activeModeHook: {
    activeMode:string, 
    setActiveMode:any
  };
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
  onSendValue: (newEntries:any[]) => void; 
  //crudSettings: 
}
// INPUT TABLE ==================================
export default function InputTable({entries, columnSettings, onSendValue, children}: React.PropsWithChildren<IInputTable>) { 
  console.log('InputTable'); 
  const [Entries, setEntries] = useState(entries); 
  const [activeEntry, setActiveEntry] = useState({}); 
  const [activeRow, setActiveRow] = useState(-1); 
  const [activeMode, setActiveMode] = useState('read'); 

  // RENDER -------------------------------------
  const entriesHook = {Entries, setEntries}; 
  const activeEntryHook = {activeEntry, setActiveEntry}; 
  const activeRowHook = {activeRow, setActiveRow}; 
  const activeModeHook = {activeMode, setActiveMode}; 
  const context = {entriesHook, activeEntryHook, activeRowHook, activeModeHook, columnSettings} as IInputTableContext; 
  
  return <InputTableContext.Provider value={context} > 
      <div>{JSON.stringify(activeEntryHook.activeEntry)}</div> 
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