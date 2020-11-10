import Collection from './collection'; 
import {crud} from '../../crud'; 


// DataAcessObject ==============================
export default class DataAccessObject { 
  public collections:Collection[] = []; 
  public response:IResponse = {} as IResponse; 


  public GetCollection(accessor:string):Collection|void { 
    if(!accessor) 
      return; 
    return this.collections.find( c => c.icollection.accessor === accessor); 
  } 
  /*
  public Read(accessor:string, ids:string|string[]) { 
    let indexes = [ids].flat(); 
    const collection = collections.find( c => c.icollection.accessor === accessor); 
    if(!collection) 
      return []; 
    
    return collection.icollection.entries.filter( e => indexes.includes(e._id)); 
  } 
  */
  
  public async Create(accessor:string, entry:IEntry):Promise<Boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    /*if(response.err || !response.data) 


    .then( res => { 
      // success? 
      if(res) { 
        const newlyCreated = {} as IEntry; 
        selectedCollection.Create(newlyCreated); 
        // update result 
      } 
      return true; 
    }).catch( err => false); */
    return true; 
  } 

  public async Update(accessor:string, entry:IEntry):Promise<Boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    await crud.Update(accessor, entry) 
    .then( res => { 
      // success? 
      if(res) { 
        selectedCollection.Update(entry); 
        // update result 
      } 
      return true; 
    }).catch( err => false ); 
    return true; 
  } 

  public async Delete(accessor:string, entry:IEntry):Promise<Boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    await crud.Delete(accessor, entry) 
    .then( res => { 
      // success? 
      if(res) { 
        selectedCollection.Delete(entry); 
        // update result 
      } 
      return true; 
    }).catch( err => false ); 
    return true;
  } 
} 
