import React, { useState, useEffect } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IEntry, EnumMode, IFeedback} from '../proxy/interfaces'; 
import {collections, LoadCollections} from '../proxy/proxy'; 

import Selector, {IOption} from '../input/selector'; 
import CollectionTable from './collectiontable'; 


class Loader { 
  public ready:boolean; 
  public LoadFunc:any; 
  private setReady:any; 
  
  constructor(ready:boolean, setReady:any, LoadFunc:any) { 
    this.ready = ready; 
    this.setReady = setReady; 
    this.LoadFunc = LoadFunc; 
  } 
  
  public async Reload() :Promise<void> { 
    await this.LoadFunc(); 
    this.setReady(true); 
    return; 
  } 
} 



interface IActiveDataContext { 
  activeCollection: Collection; 
  activeEntryHook: {activeEntry: IEntry, setActiveEntry:any}; 
  modeHook: {mode: EnumMode, setMode:any}; 
  feedbackHook: {feedback: IFeedback, setFeedback:any}; 
} 
export const ActiveDataContext = React.createContext({} as IActiveDataContext); 
// Load all collections, metadata, and datas. 
// COLLECTIONS ==================================
export default function CollectionsLoader() { 
  console.log('Collections'); 
  const [ready, setReady] = useState(false); 
  const collectionsLoader = new Loader(ready, setReady, LoadCollections); 
  const [selected, setSelected] = useState(''); 

  useEffect( () => { 
    collectionsLoader.Reload(); 
  }, []); 

  const activeDataContext:IActiveDataContext = { 
    activeCollection:collections.find( (c:Collection) => c.accessor === selected) ?? {} as Collection, 
    activeEntryHook:{ 
      activeEntry:{} as IEntry, 
      setActiveEntry:() => {return;}, 
    }, 
    modeHook:{ 
      mode: EnumMode.Read, 
      setMode: () => {return;}, 
    }, 
    feedbackHook: { 
      feedback:{oks:[], errs:[] } as IFeedback, 
      setFeedback:() => {return;}, 
    }, 
  } 
  
  if(!collectionsLoader.ready) 
    return <div>Loading ... </div>; 

  // Selector
  const options:Array<IOption> = collections.map( c => { 
    return {value: c.accessor, label: c.label}; 
  }); 
  const size = 30; 
  const selector = <div style={{width:`${size}ch`}} > 
    <span> 
      Select a collection: 
      <Selector selected={selected} setSelected={setSelected} options={options} /> 
    </span> 
  </div> 

  // Table
  const table = selected ? <CollectionTable/> : <div>No collection is selected.</div>; 

  // Render -------------------------------------
  return <ActiveDataContext.Provider value={activeDataContext} > 
    <h1>CRUD data</h1> 
    <p>Select an active collection from the list to read and/or edit it.</p> 
    {selector} 
    <hr/> 
    {table} 
  </ActiveDataContext.Provider>; 
} 