import React, { useState, useMemo } from 'react'; 

import {} from '../custompackages';
import Dao from '../../mongoosedao/dao'; 
import {useLoad} from '../../customhooks/useLoad'; 
import {InputSelect, IOption} from '../custompackages'; 
import AdminTable from './admintable'; 

import '../common/table.css'; 
//import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";


interface IAdminContext { 
  dao: Dao; 
  activeCollection: ICollection; 
} 
export const AdminContext = React.createContext({} as IAdminContext); 
// ADMIN SECTION =================================
export default function AdminSection() { 
  const dao = useMemo(() => new Dao(), []); 
  const [selected, setSelected] = useState<string>(''); 
  
  const {status, Reload} = useLoad(async () => { 
    //await dao.LoadCollections(['responses', 'questions', 'instructions', 'forms']); 
  }); 

  // RENDER ------------------------------------- 
  if(!status.success) 
    return <LoadingBtn/>; 

  const options:IOption[] = dao.iCollections.map( c => { 
    return {value: c.accessor, label: c.label} 
  }); 

  const adminTable = selected[0] ? <AdminTable /> : <p>Please choose a collection from the selector above.</p>; 
  const adminContext = {dao:dao, activeCollection:dao.GetICollection(selected)} as IAdminContext; 
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