import React from 'react'; 
import {LoadCollections} from './mongoosedata'; 
import {crud} from '../../crud'; 

import Collection from './collection'; 
import Field from './field'; 

/*import InputData from '../input/inputdata/inputdata'; 
import InputArray from '../input/inputarray'; */
import { IOption, InputSelect, InputArray, InputData } from '../input/inputcommon'; 


// DataAcessObject ==============================
export default class DataAccessObject { 
  public collections:Collection[] = []; 
  public response?:IResponse = {} as IResponse; 

  // Load Collections
  public async LoadCollections(collectionAccessors:string[]) { 
    const loadedCollections = await LoadCollections(collectionAccessors); 
    this.collections = loadedCollections; 
    //this.SetCollectionCellModes(); 
  } 

  public GetCollection(accessor:string):Collection|void { 
    if(!accessor) 
      return; 
    return this.collections.find( c => c.icollection.accessor === accessor); 
  } 

  // CREATE .....................................  
  public async Create(accessor:string, entry:IEntry):Promise<Boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    const responses = (await crud.Create(accessor, [entry])).data as IResponse[]; 
    this.response = responses[0] ?? {} as IResponse; 
    console.log(this.response.data); 
    if(this.response.success) 
      selectedCollection.Create(this.response.data); 
    return this.response.success; 
  } 

  // UPDATE .....................................
  public async Update(accessor:string, entry:IEntry):Promise<Boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    const responses = (await crud.Update(accessor, [entry])).data as IResponse[]; 
    this.response = responses[0] ?? {} as IResponse; 
    if(this.response.success) 
      selectedCollection.Update(entry); 
    return this.response.success; 
  } 

  // DELETE .....................................
  public async Delete(accessor:string, entry:IEntry):Promise<Boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    const responses = (await crud.Delete(accessor, [entry])).data as IResponse[]; 
    this.response = responses[0] ?? {} as IResponse; 
    if(this.response.success) 
      selectedCollection.Delete(entry); 
    return this.response.success; 
  } 

  // SET CELL MODES -----------------------------
  public GetOptions(ifield:IField):IOption[] { 
    const field = new Field(ifield); 
    if(field.IsEnum()) 
      return field.GetEnumOptions(); 
    if(field.IsObjectID()) 
      return this.GetForeignOptions(ifield.modeltype); 
    return []; 
  } 

  public GetForeignOptions(accessor:string):IOption[] { 
    const foreignCollection = this.GetCollection(accessor); 
    if(!foreignCollection) 
      return [] as IOption[]; 
    const abvfield = foreignCollection.GetAbbreviateField(); 
    return foreignCollection.icollection.entries?.map( e => { 
      return {value:e._id, label:e[abvfield.accessor]} as IOption; 
    }); 
  } 
} 
