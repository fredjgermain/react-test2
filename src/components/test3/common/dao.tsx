import React from 'react'; 
import {LoadCollections} from './mongoosedata'; 
import {crud} from '../../crud'; 

import Collection from './collection'; 
import Field from './field'; 

/*import InputData from '../input/inputdata/inputdata'; 
import InputArray from '../input/inputarray'; */
import { IOption, InputSelect, InputData } from '../input/inputcommon'; 


// DataAcessObject ==============================
export default class DataAccessObject { 
  public collections:Collection[] = []; 
  public response?:IResponse = {} as IResponse; 

  // Load Collections
  public async LoadCollections(collectionAccessors:string[]) { 
    const loadedCollections = await LoadCollections(collectionAccessors); 
    this.collections = loadedCollections; 
    this.SetCollectionCellModes(); 
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

  // --------------------------------------------
  public SetCollectionCellModes() { 
    this.collections.forEach( c => { 
      c.icollection.fields.forEach( f => { 
        this.SetCellMode(f); 
      }); 
    }) 
  } 

  public SetCellMode(ifield:IField) { 
    const field = new Field(ifield); 
  
    // Array Read
    if(field.IsArray()) { 
      ifield.cellMode.read = (value:any) => { 
        const elementtype = field.GetElementType(); 
        const n = value?.length ?? 0; 
        return <span> ({elementtype}x{n}) </span>; 
      }; 
    } 
  
    // Array Data 
    /*if(field.IsArray() && field.IsPrimitive()) { 
      ifield.cellMode.edit = (value:any, setValue:any) => { 
        return <InputArray type={ifield.subtype} 
          defaultValue={''} values={value} onBlur={setValue} />; 
      } 
    } */
  
    // Single Data
    /*if(!field.IsArray() && field.IsPrimitive()) { 
      ifield.cellMode.edit = (value:any, setValue:any) => { 
        return <InputData type={ifield.type} value={value} onBlur={setValue} />; 
      } 
    } */
  
    // Input - ObjectID or Enum edit with options
    /*if(field.IsObjectID() || field.IsEnum()) {
      ifield.cellMode.edit = (value:any, setValue:any) => { 
        return <Selector value={value} onBlur={setValue} options={this.GetOptions(ifield)} isMulti={field.IsArray()} /> 
      } 
    } */

    // Input - Array - ObjectID
    if(field.IsObjectID()) { 
      ifield.cellMode.read = (value:any) => { 
        const foreignLabel = this.GetOptions(ifield).find(o => o.value === value)?.label ?? ''; 
        return <span>{JSON.stringify(foreignLabel)}</span>; 
      } 
      /*ifield.cellMode.edit = (value:any, setValue:any) => { 
        return <Selector selected={value} setSelected={setValue} options={this.GetOptions(ifield)} isMulti={field.IsArray()} /> 
      } */
    } 
  
    // Input - Array - Enum
    if(field.IsEnum()) { 
      ifield.cellMode.read = (value:any) => { 
        return <span>{value}</span>; 
      } 
      /*ifield.cellMode.edit = (value:any, setValue:any) => { 
        return <Selector selected={value} setSelected={setValue} options={this.GetOptions(ifield)} isMulti={field.IsArray()} /> 
      } */
    } 
  }
} 
