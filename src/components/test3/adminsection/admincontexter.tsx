import React, {useEffect, useState, useMemo} from 'react'; 
//import {crud} from '../../crud'; 
//import Collection from '../common/collection'; 
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
  //console.log('admin'); 
  const dao = useMemo(() => new DataAccessObject(), []); 
  const [ready, setReady] = useState(false); 
  const collectionsLoader = new Loader(ready, setReady, 
    async () => { 
      await dao.LoadCollections(['responses', 'questions', 'instructions', 'forms']) 
    }); 
  //const [selected, setSelected] = useState(''); 
  
  useEffect( () => { 
    collectionsLoader.Reload(); 
  }, []); 

  if(!ready) 
    return <div>Loading</div>; 
  
  
  const adminContext = {dao:dao, selectedCollection:''}; 
  return <AdminContext.Provider value={adminContext} > 
    <div> 
      <CollectionSelector /> 
    </div>
  </AdminContext.Provider> 
} 
