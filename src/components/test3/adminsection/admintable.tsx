import React, {useContext, useState} from 'react'; 
import {AdminContext} from './admincontexter'; 

import TableData from '../tablecomponent/tabledata'; 
import Field from '../common/field'; 

import AdminPager from './adminpager'; 
import {usePage} from '../customhooks/usePage'; 
import AdminError from './adminerror'; 


import '../common/table.css'; 

// ADMIN TABLE ================================== 
export default function AdminTable() { 
  const {dao, selectedCollection} = useContext(AdminContext); 

  // Tabler -------------------------------------
  const activeCollection = dao.collections.find( c => c.icollection.accessor === selectedCollection); 
  const entries = activeCollection?.icollection.entries ?? []; 
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(entries, 5); 
  const [refresh, setRefresh] = useState(false); 

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
      await dao.Create(selectedCollection ?? '', entry)
      .then( () => { 
        setRefresh(() => !refresh); 
        return true; 
      }) 
      return true; 
    }, 
    Update: async (entry:IEntry) => { 
      await dao.Update(selectedCollection ?? '', entry)
      .then( () => { 
        setRefresh(() => !refresh); 
        return true; 
      }) 
      return true; 
    }, 
    Delete: async (entry:IEntry) => { 
      await dao.Delete(selectedCollection ?? '', entry)
      .then( () => { 
        setRefresh(() => !refresh); 
        return true; 
      }) 
      return true; 
    }, 
  } 

  const page = entries.slice(from, to);
  return <div>
    <AdminError /> 
    <AdminPager data={entries} from={from} to={to} pageIndex={pageIndex} setPageIndex={setPageIndex} pageIndexes={pageIndexes} /> 
    <TableData cols={fields} rows={page} crud={crud} /> 
  </div>
}
