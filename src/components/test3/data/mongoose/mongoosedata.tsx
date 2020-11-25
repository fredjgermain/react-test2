import Collection from '../../common/dao/collection'; 
import { crud } from '../../../crud'; 


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




export const collections:Collection[] = new Array<Collection>(); 

// const collections:IMongooseCollection[] = (await crud.Read('collections')).data; 
export async function LoadCollections(collectionsToFind:string[]):Promise<Collection[]> { 
  const mongooseCollections = (await crud.Read('collections')).data as IMongooseCollection[]; 
  const foundCollections = mongooseCollections.filter( c => collectionsToFind.includes(c.accessor) ); 
  const loadedCollections = new Array<Collection>(); 
  for(let i=0; i<foundCollections.length; i++) { 
    const collection = await LoadCollection(foundCollections[i]); 
    loadedCollections.push(collection); 
  } 
  return loadedCollections; 
} 

async function LoadCollection(collection:IMongooseCollection):Promise<Collection> { 
  const icollection:ICollection = {} as ICollection; 
  icollection.accessor = collection.accessor; 
  icollection.label = collection.label; 
  
  const fields = (await crud.Models(collection.accessor)).data.paths; 
  const mongooseFields = Object.keys(fields).map( f => { 
    return {accessor:f, ...fields[f] } as IMongooseField; 
  }); 
  icollection.fields = ParseFields(mongooseFields); 
  icollection.entries = (await crud.Read(collection.accessor)).data; 
  /* icollection.fields.forEach( f => { 
    SetCellMode(f); 
    //console.log(f.cellMode); 
  }); */
  return new Collection(icollection); 
} 

function GetDefaultValue(type:string, options:any):any { 
  if(options['defaultValue']) 
    return options['defaultValue']; 
  if(options['default']) 
    return options['default']; 
  if(type === 'Array') 
    return []; 
  if(type === 'Boolean') 
    return false; 
  if(type === 'Number') 
    return 0; 
  return ''; 
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
    return ifield; 
  }); 
} 