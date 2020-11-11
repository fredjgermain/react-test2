import React, {useEffect, useState} from 'react'; 
import {crud} from '../../crud'; 
import {LoadCollections, collections} from '../common/mongoosedata'; 
import Collection from '../common/collection'; 
import CollectionSelector from './collectionselector'; 
import DataAccessObject from '../common/dao'; 

// Load data for admin section 
// Parsed data from mock data in mongoosedata.tsx 
// Instantiate DataAccessObject 



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


interface IAdminContext { 
  dao: DataAccessObject; 
  selectedCollection?: string; 
} 

export const AdminContext = React.createContext({} as IAdminContext); 

// ADMIN SECTION ================================
export default function AdminContexter() { 
  const adminContext = {dao:new DataAccessObject(), selectedCollection:''}; 
  const [ready, setReady] = useState(false); 
  const collectionsLoader = new Loader(ready, setReady, LoadCollections); 
  const [selected, setSelected] = useState(''); 
  
  useEffect( () => { 
    collectionsLoader.Reload(); 
  }, []); 

  if(!ready) 
    return <div>Loading</div>; 
  
  adminContext.dao.collections = collections; 
  console.log(adminContext.dao.collections); 
  
  return <AdminContext.Provider value={adminContext} > 
    <div> 
      <CollectionSelector /> 
    </div>
  </AdminContext.Provider> 
} 
