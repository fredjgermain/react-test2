import React, { useState, useEffect } from 'react'; 
import Selector, {IOption} from '../input/selector'; 
import {data} from '../common/data'; 
import CollectionTable from './collectiontable'; 

export const ActiveCollectionContext = React.createContext({} as any); 

// COLLECTION SELECTOR ==========================
export default function CollectionSelect() { 
  console.log('Collection selector'); 
  const [selected, setSelected] = useState(''); 

  const options:Array<IOption> = data.map( 
    (c, i) => {return {value:c, label: c.label}} 
  ); 

  const selector = <Selector selected={selected} setSelected={setSelected} options={options} />; 
  const activeCollectionContext = selected; 

  let table = <div>Empty table</div>; 
  if(selected) 
    table = <CollectionTable />; 

  // RENDER -------------------------------------
  return <ActiveCollectionContext.Provider value={activeCollectionContext} > 
    <h1>CRUD data</h1> 
    <p>Select an active collection from the list to read and/or edit it.</p> 
    {selector} 
    <hr/> 
    {table} 
  </ActiveCollectionContext.Provider>; 
} 