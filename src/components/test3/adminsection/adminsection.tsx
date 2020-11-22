import React, { useState, useMemo } from 'react'; 
import DAO from '../data/dao/dao'; 
import {useLoad} from '../customhooks/useLoad'; 
import {InputSelect, IOption} from '../input/inputcommon'; 
import AdminTable from './admintable'; 

import '../common/table.css'; 
//import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";


interface IAdminContext { 
  dao: DAO; 
  activeCollection: ICollection; 
} 
export const AdminContext = React.createContext({} as IAdminContext); 
// ADMIN SECTION =================================
export default function AdminSection() { 
  const dao = useMemo(() => new DAO(), []); 
  const [selected, setSelected] = useState<Array<string>>([]); 
  const {status, Reload} = useLoad(async () => { 
    await dao.LoadCollections(['responses', 'questions', 'instructions', 'forms']); 
  }); 

  // RENDER ------------------------------------- 
  if(!status.success) 
    return <LoadingBtn/>; 

  const options:IOption[] = dao.collections.map( c => { 
    return {value: c.icollection.accessor, label: c.icollection.label} 
  }); 

  const adminTable = selected[0] ? <AdminTable /> : <p>Please choose a collection from the selector above.</p>; 
  const adminContext = {dao:dao, activeCollection:dao.GetICollection(selected[0]??'')} as IAdminContext; 
  return <AdminContext.Provider value={adminContext}> 
    <h2>Admin Section</h2> 
    <p>Choose a collection to create/read/update/delete items from it.</p> 
    <InputSelect value={selected} onSendValue={setSelected} options={options} />
    {adminTable} 
  </AdminContext.Provider> 
} 


function LoadingBtn () { 
  return <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      </link>
      <button className="buttonload">
      <i className="fa fa-spinner fa-spin"></i>Loading
    </button>
  </div>
}