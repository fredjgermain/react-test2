//import React from 'react'; 
//import {object} from 'prop-types'; 
import {crud} from '../../crud'; 
import {IEntry, IResult} from './interfaces'; 


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

// Column =======================================
export class Column { 
  public accessor: string = ''; 
  public label: string = ''; 
  public type: string = ''; 
  public subtype: string = ''; 
  public modeltype: string = ''; 
  public options: any = {}; 
  public defaultValue: any = {}; 
  public format:any = "${value}"; 

  constructor(
    accessor:string, 
    label:string, 
    type:string, 
    subtype:string, 
    modeltype:string, 
    options:any, 
    defaultValue:any, 
    format?:any) { 

    this.accessor = accessor; 
    this.label = label; 
    this.type = type; 
    this.subtype = subtype; 
    this.modeltype = modeltype; 
    this.options = options; 
    this.defaultValue = defaultValue; 
    this.format = format; 
  }
  
  // GetDefaultValue ----------------------------
  public IsMixed():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'Mixed' || toTest === 'mixed'; 
  }

  public IsBoolean():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'Boolean' || toTest === 'boolean'; 
  } 

  public IsNumber():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'Number' || toTest === 'number'; 
  } 
  
  public IsString():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'String' || toTest === 'string'; 
  } 

  public IsObjectID():boolean { 
    const toTest = !this.IsArray() ? this.type: this.subtype; 
    return toTest === 'ObjectID'; 
  } 

  public IsArray():boolean { 
    return this.type === 'Array'; 
  } 

  public IsEnum():boolean { 
    if(!this.options['enum']) 
      return false; 
    return true; 
  } 

} 


// Collection ===================================
export class Collection { 
  public accessor: string = ''; 
  public label: string = ''; 
  public columns: Array<Column> = []; 
  //public metadata: Object = {}; 
  public data: Array<IEntry> = []; 

  // Get Default Entry --------------------------
  public GetDefaultEntry() { 
    const defaultEntry = {} as IEntry; 
    this.columns.forEach( c => defaultEntry[c.accessor] = c.defaultValue ); 
    return defaultEntry; 
  } 

  // Return the main field to display as a abreviation of a entry. 
  public GetAbbreviateColumn() { 
    const abbreviatefield = this.columns.find( c => c.options === 'abbreviate' ); 
    if(!abbreviatefield) 
      return this.columns.find( c => c.IsString() || c.IsBoolean() || c.IsEnum || c.IsNumber ); 
    return abbreviatefield; 
  } 

  public GetAbbreviateValue(id:String) { 
    const abbreviatefield = this.GetAbbreviateColumn(); 
    const entry = this.data.find( e => e._id === id); 
    if(!entry || !abbreviatefield) 
      return ''; 
    return entry[abbreviatefield.accessor]; 
  } 


  // CRUD methods -------------------------------
  // Create .....................................
  public Create(entry:IEntry) { 
    return crud.Create(this.accessor, entry) 
      .then( res => { 
        const feedback = res.data[0] as IResult; 
        // no error ! 
        if(feedback.err.length === 0) 
          this.data.push(entry); 
        return feedback; 
      }) 
      .catch( err => err ); 
  } 
  
  // Read .......................................
  public async Read() { 
    return await crud.Read(this.accessor) 
      .then( res => this.data = res.data) 
      .catch( err => err ); 
  } 

  // Update .....................................
  public async Update(entry:IEntry) {
    return await crud.Update(this.accessor, entry) 
      .then( res => { 
        const feedback = res.data[0] as IResult; 
        // no error ! 
        if(feedback.err.length === 0) { 
          const index = this.data.findIndex(e=>e._id === entry._id); 
          if(index < 0) { 
            // error !?
            return feedback; 
          } 
          this.data[index] = {...entry}; 
        } 
        return feedback; 
      }) 
      .catch( err => err ); 
  }
  
  // Delete .....................................
  public async Delete(_id?:string) { 
    return await crud.Delete(this.accessor, _id) 
      .then( res => { 
        const feedback = res.data[0] as IResult; 
        // no error ! 
        if(feedback.err.length === 0) { 
          const index = this.data.findIndex(e=>e._id === _id); 
          if(index < 0) { 
            // error !? 
            return feedback; 
          } 
          this.data.splice(index, 1); 
        } 
        return feedback; 
      }) 
      .catch( err => err ); 
  }
} 