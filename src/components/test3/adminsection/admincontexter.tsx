import React, {useEffect, useState, useMemo} from 'react'; 
//import {crud} from '../../crud'; 
//import Collection from '../common/collection'; 
import CollectionSelector from './collectionselector'; 
import DataAccessObject from '../common/dao'; 
import {useLoad} from '../customhooks/useLoad'; 


interface IAdminContext { 
  dao: DataAccessObject; 
  selectedCollection?: string; 
} 

export const AdminContext = React.createContext({} as IAdminContext); 

// ADMIN SECTION ================================
export default function AdminContexter() { 
  const dao = useMemo(() => new DataAccessObject(), []); 
  const neededCollection = ['responses', 'questions', 'instructions', 'forms']; 
  const {status, Reload} = useLoad(async () => { 
    await dao.LoadCollections(neededCollection) 
  }); 

  if(!status.success) 
    return <div>Loading</div>; 
  
  const adminContext = {dao:dao, selectedCollection:''}; 
  return <AdminContext.Provider value={adminContext} > 
    <div> 
      <CollectionSelector /> 
    </div>
  </AdminContext.Provider> 
} 
