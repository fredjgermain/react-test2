import React, { useState, useEffect } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IEntry, EnumMode} from '../proxy/interfaces'; 
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

export const ActiveCollectionContext = React.createContext({} as Collection); 
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

  const activeCollection = collections.find( (c:Collection) => c.accessor === selected) ?? {} as Collection; 
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
  return <ActiveCollectionContext.Provider value={activeCollection} > 
    <h1>CRUD data</h1> 
    <p>Select an active collection from the list to read and/or edit it.</p> 
    {selector} 
    <hr/> 
    {table} 
  </ActiveCollectionContext.Provider>; 
} 