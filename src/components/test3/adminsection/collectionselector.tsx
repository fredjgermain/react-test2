import React, { useState, useContext } from 'react'; 
import {AdminContext} from './admincontexter'; 
import Selector, { IOption } from '../input/selector'; 
import TableData from '../tablecomponent/tabledata'; 
import { ICrudTable } from '../tablecomponent/tableinterfaces';


// select a collection accessor 


// COLLECTION SELECTOR ==========================
export default function CollectionSelector() { 
  const adminContext = useContext(AdminContext); 
  const {dao, selectedCollection} = adminContext; 
  adminContext.selectedCollection = 'questions'; 


  // Selector 
  const [selected, setSelected] = useState(adminContext.selectedCollection); 
  const options = dao.collections.map( c => { 
    return {value:c.icollection.accessor, label:c.icollection.label} as IOption; 
  }) 
  const selector = <Selector selected={selected} setSelected={setSelected} options={options} />
  

  // Tabler
  const activeCollection = dao.collections.find( c => c.icollection.accessor === selected); 
  const entries = activeCollection?.icollection.entries ?? []; 
  const fields = activeCollection?.icollection.fields ?? []; 
  const crud:ICrudTable = { 
    Create: async (entry:IEntry) => { 
      await dao.Create(selectedCollection ?? '', entry); 
    }, 
    Update: async (entry:IEntry) => { 
      await dao.Update(selectedCollection ?? '', entry); 
    }, 
    Delete: async (entry:IEntry) => { 
      await dao.Delete(selectedCollection ?? '', entry);  
    }, 
  } 
  const tabler = <TableData rows={entries} columnSettings={fields} crud={crud} />; 


  return <div> 
    <h1>Admin section</h1> 
    <p>Choose a collection</p> 
    <span>Collection: {selector}</span> 
    <div> 
      {tabler} 
    </div> 
  </div>; 
} 