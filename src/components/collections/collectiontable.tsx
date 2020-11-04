import React, { useState, useContext } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IFeedbackHook, IEntry, EnumMode, IRow} from '../proxy/interfaces'; 
import Pager, {GetPage} from './pager'; 

import {ActiveCollectionContext} from './collections'; 
import EntryRow from '../entry/entryrow'; 

import './table.css'; 


// return an array of entries with index added to them for ease of sorting etc. 
function IndexData(data:Array<IEntry>) :Array<IRow> { 
  return data.map((e,i) => { 
    //const row:IRow = ; 
    return {id:i+1, entry:e } as IRow; 
  }); 
} 

/*type RefreshHookType = { 
  refresh:boolean; 
  setRefresh:() => void; 
} */

type CollectionTableContextType = { 
  activeEntryHook: {activeEntry:IEntry, setActiveEntry:any}; 
  modeHook: {mode:EnumMode, setMode:any}; 
  feedbackHook: IFeedbackHook; 
} 
export const CollectionTableContext = React.createContext({} as CollectionTableContextType);


// Collection Table =============================
export default function CollectionTable() { 
  console.log('collectionTable'); 
  const [feedBack, setFeedBack] = useState({oks:[], errs:[]}); 
  const feedbackHook = {feedback: feedBack, setFeedBack} as IFeedbackHook; 
  const [activeEntry, setActiveEntry] = useState({} as IEntry); 
  const [mode, setMode] = useState(EnumMode.Read); 

  //const [refresh, setRefresh] = useState(false); 
  //const refreshHook = {refresh:false, setRefresh:() => { setRefresh(() => !refresh) } } as RefreshHookType; 

  const activeCollection = useContext(ActiveCollectionContext); 

  const {label, accessor, columns, data} = activeCollection; 
  // pager divides dataHook into pages ... 
  // dataHook can be sorted and/or divided into pages ... 
  const indexedData = IndexData(data); 
  //const pageIndexes = PageIndexes(indexedData); 
  
  const [pageIndex, setPageIndex] = useState(0); 

  const page = GetPage(indexedData, pageIndex); 

  // Pager
  const pager = <Pager data={indexedData} pageIndexHook={{pageIndex, setPageIndex}} />   

  // feedback display 
  const feedbackDisplay = <div> 
    <div className='feedback_green'> 
      {feedBack.oks.map( (ok:string, i:number) => { 
        return <div key={i}>{ok}</div>; 
      })}
    </div>
    <div className='feedback_red'> 
      {feedBack.errs.map( (err:string, i:number) => { 
        return <div key={i}>{err}</div>; 
      })} 
    </div> 
  </div>; 

  // Caption 
  const caption = <caption> 
    <h2>Active collection: <em>{label}</em></h2> 
    <div> 
      {feedbackDisplay} 
    </div> 
    <div>
      {pager} 
    </div>
  </caption>; 

  // display columns header
  const header = <thead><tr> 
    <th>#</th> 
    {columns.map((col,i) => { 
      return <th key={i}>{col.label}</th>; 
    })} 
    <th>BTN</th> 
  </tr></thead> 

  // Entries
  const body = <tbody> 
    {page.map((row,i) => { 
      return <EntryRow key={i} row={row} /> 
    })} 
  </tbody> 

  // add entry
  const footer = <tfoot> 
    <EntryRow modearg={EnumMode.New}/> 
  </tfoot> 
  
  // Render -------------------------------------
  const collectionTaleContext:CollectionTableContextType = { 
    activeEntryHook:{activeEntry,setActiveEntry}, 
    modeHook: {mode, setMode}, 
    feedbackHook
  }; 
  return <CollectionTableContext.Provider value={collectionTaleContext}> 
      <div>|{collectionTaleContext.activeEntryHook.activeEntry._id}|</div> 
      <div>|{collectionTaleContext.modeHook.mode}|</div> 
      <table> 
        {caption} 
        {header} 
        {body} 
        {footer} 
      </table> 
    </CollectionTableContext.Provider>
}