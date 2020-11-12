import React, { useState, useContext } from 'react'; 
import {AdminContext} from './admincontexter'; 
import Selector, { IOption } from '../input/selector'; 
import TableData from '../tablecomponent/tabledata'; 
import Field from '../common/field';
import '../common/table.css'; 

// assumes data loaded 
// assumes data have been parsed from mock data in mongoosedata.tsx 
// assumes instance of DataAccessObject 
// accesss instance of DataAccessObject 
// Initiate TableData ... 
// pass methods from Create,Update,Delete from DataAccessObject to TableData's props 

// ADMIN TABLE ================================== 
export default function AdminTable() { 
  const {dao, selectedCollection} = useContext(AdminContext); 

  // Tabler -------------------------------------
  const activeCollection = dao.collections.find( c => c.icollection.accessor === selectedCollection); 
  const entries = activeCollection?.icollection.entries ?? []; 

  /* Column Settings 
      As a default select non hidden fields */ 
  const fields = activeCollection?.icollection.fields.filter( f => { 
    return !(new Field(f).IsHiddenField()) 
  }) ?? []; 
  

  // RENDER -------------------------------------
  if(!selectedCollection) 
    return <div>No collection selected. </div> 

    
  // CRUD METHODS ......
  const crud:ITableDataAction = { 
    Create: async (entry:IEntry) => { 
      console.log([selectedCollection, entry]); 
      return await dao.Create(selectedCollection ?? '', entry); 
    }, 
    Update: async (entry:IEntry) => { 
      console.log([selectedCollection, entry]); 
      return await dao.Update(selectedCollection ?? '', entry); 
    }, 
    Delete: async (entry:IEntry) => { 
      return await dao.Delete(selectedCollection ?? '', entry); 
    }, 
  } 

  return <TableData rows={entries} columnSettings={fields} crud={crud} />; 
}