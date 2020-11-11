import React from 'react'; 
import {mockCollections, mockFields} from './mockdb/datastructure'; 
import {mockDataCollections} from './mockdb/data'; 
import Collection from './collection'; 
import Field from './field'; 
import DataAccessObject from './dao'; 

// input ----
import Selector, {IOption} from '../input/selector'; 
import InputArray from '../input/inputarray'; 
import InputData from '../input/inputdata'; 
import { crud } from '../../crud';

//import {ICollection, IResult, ICrudTable, IEntry, IField} from '../tablecomponent/tableinterfaces'; 


export interface IMongooseCollection { 
  accessor:string; 
  label:string; 
} 

export interface IMongooseField { 
  accessor:string; 
  instance:string; 
  options: { 
    ref?: string; 
    label?: string; 
    sortType?: string; 
    defaultValue?: any; 
    format?: string; 
    [key:string]:any; 
  }; 
  $embeddedSchemaType?:{ 
    instance:string; 
  }; 
  [key:string]:any; 
} 



function GetDefaultValue(type:string, options:any):any { 
  if(options['defaultValue']) 
    return options['defaultValue']; 
  if(options['default']) 
    return options['default']; 
  if(type === 'Array') 
    return []; 
  return ''; 
} 


export const collections:Collection[] = new Array<Collection>(); 

// const collections:IMongooseCollection[] = (await crud.Read('collections')).data; 
export async function LoadCollections() { 
  const mongooseCollections = (await crud.Read('collections')).data as IMongooseCollection[]; 
  //const loadedCollections = await ParseCollection(loads); 
  for(let i=0; i<mongooseCollections.length; i++) { 
    const collection = await ParseCollection(mongooseCollections[i]); 
    collections.push(collection); 
  } 
  //console.log(collections); 
}

async function ParseCollection(collection:IMongooseCollection):Promise<Collection> { 
  const icollection:ICollection = {} as ICollection; 
  icollection.accessor = collection.accessor; 
  icollection.label = collection.label; 
  
  const fields = (await crud.Models(collection.accessor)).data.paths; 
  const mongooseFields = Object.keys(fields).map( f => { 
    return {accessor:f, ...fields[f] } as IMongooseField; 
  }); 
  icollection.fields = ParseFields(mongooseFields); 
  icollection.entries = (await crud.Read(collection.accessor)).data; 
  return new Collection(icollection); 
}

//async function ParseFields()
function ParseFields(fields:IMongooseField[]):IField[] { 
  return fields.map( f => { 
    const {accessor, instance, $embeddedSchemaType, options} = f; 
    const ifield:IField = {} as IField; 
    
    ifield.accessor = accessor; 
    ifield.label = options.label ?? ''; 
    ifield.options = options; 
    ifield.type = instance; 
    ifield.subtype = $embeddedSchemaType?.instance ?? ''; 
    ifield.modeltype = options.ref ?? ''; 
    ifield.format = options.format ?? "${value}"; 
    ifield.sort = options.sortType ?? ''; 

    ifield.defaultValue = GetDefaultValue(ifield.type, ifield.options); 
    ifield.cellMode = { 
      read: (value:any) => JSON.stringify(value), 
      edit: (value:any, setValue:any) => JSON.stringify(value), 
    }; 
    return ifield; 
  }); 
} 








function GetForeignOptions(foreignCollection:Collection|void) { 
  if(!foreignCollection) 
    return []; 
  const abvfield = foreignCollection.GetAbbreviateField(); 
  return foreignCollection.icollection.entries?.map( e => { 
    return {value:e._id, label:e[abvfield.accessor]} as IOption; 
  }); 
} 


// Must have access to "collections" during the whole execution and after modification of the DB
function SetCellMode(ifield:IField) { 
  const field = new Field(ifield); 

  //`IsArray:${field.IsArray()}`, 
  //`IsObjectId:${field.IsObjectID()}`,
  /*console.log([field.ifield.accessor, 
    `Is not Array:${!field.IsArray()}`, 
    `Is not Enum:${!field.IsEnum()}`, 
    `Is Data:${field.IsString() || field.IsNumber() || field.IsBoolean()}`, 
  ]);*/

  const RefreshForeignOptions = ():IOption[] => { 
    if(ifield.modeltype) {
      const foreignCollection = new Collection({} as ICollection); //collections.find(c => c.icollection.accessor === ifield.modeltype); 
      return GetForeignOptions(foreignCollection); 
    } 
    return []; 
  }; 

  // Array Read
  if(field.IsArray()) { 
    ifield.cellMode.read = (value:any) => { 
      const elementtype = field.GetElementType(); 
      const n = value?.length ?? 0; 
      return <span> ({elementtype}x{n}) </span>; 
    }; 
  } 

  // Array Data 
  if(field.IsArray() && field.IsPrimitive()) { 
    ifield.cellMode.edit = (value:any, setValue:any) => { 
      return <InputArray type={ifield.type} defaultValue={ifield.defaultValue} 
        values={value} setValues={setValue} />; 
    } 
  } 

  // Single Data
  if(!field.IsArray() && field.IsPrimitive()) { 
    ifield.cellMode.edit = (value:any, setValue:any) => { 
      return <InputData type={ifield.type} value={value} setValue={setValue} />; 
    } 
  } 

  // Input - Array - ObjectID
  if(field.IsObjectID()) { 
    ifield.cellMode.read = (value:any) => { 
      const foreignLabel = RefreshForeignOptions().find(o => o.value === value)?.label ?? ''; 
      return <span>{JSON.stringify(foreignLabel)}</span>; 
    } 
    ifield.cellMode.edit = (value:any, setValue:any) => { 
      return <Selector selected={value} setSelected={setValue} options={RefreshForeignOptions()} isMulti={field.IsArray()} /> 
    } 
  } 

  // Input - Array - Enum
  if(field.IsEnum()) { 
    ifield.cellMode.read = (value:any) => { 
      return <span>{value}</span>; 
    } 
    ifield.cellMode.edit = (value:any, setValue:any) => { 
      return <Selector selected={value} setSelected={setValue} options={field.GetEnumOptions()} isMulti={field.IsArray()} /> 
    } 
  } 
}



/*export async function LoadCollections() { 
  
  console.log(loadedCollections); 
  //loadedCollections.forEach( c => collections.push(c) ); 
} */
// AFTER LOADING DATA ... 
/*const mongooseCollections = LoadCollections(); 
console.log(mongooseCollections);*/

//export const collections:Collection[] = ParseCollections(mockCollections); // replace mockCollections with real data ... 



// ----------------------------------------------
const selectedCollection:Collection = {} as Collection; 



