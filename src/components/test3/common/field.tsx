import React from 'react'; 
import {IField, ICrudTable, IEntry, IRow} from '../tablecomponent/tableinterfaces'; 


/*import {collection1, collection3} from '../../test2/common/data'; 
import Selector, {IOption} from '../../test2/input/selector'; */

//const data = [...collection3]; 

// TableData depends on IRow, IEntry, IField, but NOT with Field or Collection or Data
// TableData uses either read or edit to display content according to their respective types format etc.
// TableData does not calls on methods from Field. 

// Field and Collection communicate with data and Crud object. 
// Field and Collection shape informations to be passed through IRow and IField, and maybe ICollection. 


// Field class 
export default class Field { 
  public ifield:IField = {} as IField; 

  constructor(ifield:IField) { 
    this.ifield = ifield; 
  } 


  public GetEnumOptions() { 
    if(!this.IsEnum()) 
      return []; 
    return this.ifield.options['enum']; 
  }

  public GetElementType():string { 
    return this.IsObjectID() ? this.ifield.modeltype: this.ifield.subtype; 
  }

  // Type Testing ----------------------------
  public IsAbbreviable():boolean { 
      if(this.IsHiddenField()) 
        return false; 
      return this.ifield.options['abbreviate'] 
        || (this.IsString() || this.IsNumber() ); 
  } 

  public IsSortable():boolean { 
    return this.ifield.options['sort']; 
  } 

  public IsHiddenField():boolean { 
    return this.ifield.accessor.includes('_'); 
  } 

  public IsPrimitive():boolean { 
    return !this.IsEnum() && (this.IsNumber() || this.IsString() || this.IsBoolean()); 
  }

  public IsMixed():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'Mixed' || toTest === 'mixed'; 
  }

  public IsBoolean():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'Boolean' || toTest === 'boolean'; 
  } 

  public IsNumber():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'Number' || toTest === 'number'; 
  } 
  
  public IsString():boolean { 
    //console.log('toTest'); 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    //console.log([toTest, toTest === 'String' || toTest === 'string']); 
    return toTest === 'String' || toTest === 'string'; 
  } 

  public IsObjectID():boolean { 
    const toTest = !this.IsArray() ? this.ifield.type: this.ifield.subtype; 
    return toTest === 'ObjectID'; 
  } 

  public IsArray():boolean { 
    return this.ifield.type === 'Array'; 
  } 

  public IsEnum():boolean { 
    if(!this.ifield.options['enum']) 
      return false; 
    return true; 
  } 
}

  // Get foreign values/list --------------------
  //  - Needs access to foreign collection 
  /*public GetMainField(item:any):string { 
    return Object.keys(item).find( k => !(k.includes('_') ) ) ?? ''; 
  } 
  

  //
  public GetCollection(foreignCollection:string):Array<any> { 
    const collection = collection1;                   // replace dummy with real search results 
    return collection; 
  }
  
  public GetForeignOptions(foreignCollection:string):Array<IOption> { 
    const collection = this.GetCollection(foreignCollection); 
    const mainField:string = this.GetMainField(collection[0]);    // find main field using fields rather than Object.keys ... 
    if(!mainField || !collection) 
      return []; 
    return collection.map( (c:any) => { 
      return {value:c._id, label:c[mainField]}; 
    } ); 
  } 
  
  public GetForeignValue(foreignCollection:string, foreignId:string) { 
    const collection = this.GetCollection(foreignCollection); 
    const mainField:string = this.GetMainField(collection[0]);    // find main field using fields rather than Object.keys ... 
    const defaultValue = '';      // replace with real defaultValue 
    if(!mainField || !collection) 
      return defaultValue; 
    const foreignItem = collection.find( c => c._id === foreignId ); 
    return foreignItem? foreignItem[mainField] : defaultValue; 
  } 

  // Get enum list/values 
  
  
  // Get display functions ----------------------
  //display as read mode, as input field, as Selector ... 
  public SelectForeign(foreignCollection:string, foreignId:string, setForeign:any) { 
    const options = this.GetForeignOptions(foreignCollection); 
    console.log(options); 
    return <Selector selected={foreignId} setSelected={setForeign} options={options} /> 
  } 
  
} 

const defaultDisplay = (value:any) => { 
  return <span>{JSON.stringify(value)}</span>; 
}; 
*/
