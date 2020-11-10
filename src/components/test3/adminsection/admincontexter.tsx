import React from 'react'; 
import {collections, DataAccessObject} from '../common/mongoosedata'; 
import CollectionSelector from './collectionselector'; 

// Load data for admin section 
// Parsed data from mock data in mongoosedata.tsx 
// Instantiate DataAccessObject 

interface IAdminContext { 
  dao: DataAccessObject; 
  selectedCollection?: string; 
} 

export const AdminContext = React.createContext({} as IAdminContext); 

// ADMIN SECTION ================================
export default function AdminContexter() { 
  const adminContext = {dao:new DataAccessObject(), selectedCollection:''}; 
  adminContext.dao.collections = collections; 
  
  return <AdminContext.Provider value={adminContext} > 
    <div> 
      <CollectionSelector /> 
    </div>
  </AdminContext.Provider> 
} 
