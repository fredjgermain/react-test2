import React, { useState, useContext, useEffect, useMemo } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IFeedback, IEntry, EnumMode, IRow} from '../proxy/interfaces'; 
import Pager, {GetPage} from './pager'; 

import {ActiveDataContext} from './collections'; 
import EntryRow from '../entry/entryrow'; 

import './table.css'; 


// return an array of entries with index added to them for ease of sorting etc. 
function IndexData(data:Array<IEntry>) :Array<IRow> { 
  return data.map((e,i) => { 
    return {id:i+1, entry:e } as IRow; 
  }); 
} 

type CollectionTableContextType = { 
  activeEntryHook: {activeEntry:IEntry, setActiveEntry:any}; 
  feedbackHook: {feedback:IFeedback, setFeedback:any}; 
} 
export const CollectionTableContext = React.createContext({} as CollectionTableContextType);
// Collection Table =============================
export default function CollectionTable() { 
  console.log('collectionTable'); 
  const {activeCollection, activeEntryHook, modeHook, feedbackHook} = useContext(ActiveDataContext); 
  const [activeEntry, setActiveEntry] = useState({} as IEntry); 
  const [mode, setMode] = useState(EnumMode.Read); 
  const [feedback, setFeedback] = useState({oks:[], errs:[] } as IFeedback); 
  const [pageIndex, setPageIndex] = useState(0); 
  const {label, accessor, columns, data} = activeCollection; 

  console.log(mode);
  
  useEffect(() => { 
    activeEntryHook.activeEntry = activeEntry; 
    activeEntryHook.setActiveEntry = setActiveEntry; 
    modeHook.mode = mode; 
    modeHook.setMode = (newMode:EnumMode) => {
      console.log(newMode); 
      setMode(newMode); 
    }; 
    feedbackHook.feedback = feedback; 
    feedbackHook.setFeedback = setFeedback; 
  }, []); 

  /*useEffect(() => { 
    setFeedback({oks:[], errs:[] } as IFeedback); 
  }, [pageIndex]); */

  /*useEffect(() => { 
    setPageIndex(0); 
  }, [activeCollection]); */

  // Pager
  const indexedData = IndexData(data); 
  const page = GetPage(indexedData, pageIndex); 
  const pager = <Pager data={indexedData} pageIndexHook={{pageIndex, setPageIndex}} /> 

  // feedback display 
  const feedbackDisplay = <div> 
    <div className='feedback_green'> 
      {feedback.oks.map( (ok:string, i:number) => { 
        return <div key={i}>{ok}</div>; 
      })} 
    </div> 
    <div className='feedback_red'> 
      {feedback.errs.map( (err:string, i:number) => { 
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
    {page.map((row:IRow,i) => { 
      return <EntryRow key={i} row={row} /> 
    })} 
  </tbody> 

  // add entry
  const footer = <tfoot> 
    <EntryRow modearg={EnumMode.New}/> 
  </tfoot> 
  
  // Render -------------------------------------
  
  return <div>
    <div>|{activeEntry._id}|</div>
    <table> 
      {caption} 
      {header} 
      {body} 
      {footer} 
    </table> 
  </div>
}