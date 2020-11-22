import DAO, {Collection, Field} from './dao'; 
//import {IOption, InputData, InputArray, InputSelect} from '../../input/inputcommon'; 



export type FieldFormatMapper = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => void; 

// CRUD TABLE SETTER =============================
export default class CrudTableSetter{ 
  public dao:DAO = {} as DAO; 
  public activeCollection:ICollection = {} as ICollection; 

  public constructor(dao:DAO, activeCollection:ICollection) { 
    this.dao = dao; 
    this.activeCollection = activeCollection; 
  } 

  // GetFieldsFormat ...............................
  public GetFieldsFormat(CellFormatMapper:any[]):ICellFormat[] { 
    return this.activeCollection.fields.map( f => { 
      return this.GetFieldFormat(f, CellFormatMapper); 
    }); 
  } 

  private GetFieldFormat(ifield:IField, fieldFormatMapper:FieldFormatMapper[]):ICellFormat { 
    const ifieldFormat = {ifield} as ICellFormat; 
    fieldFormatMapper.forEach( f => f(new Field(ifield), ifieldFormat, this.dao) ) 
    return ifieldFormat; 
  }

  // GetColumnSettings ................................
  public GetColumnSettings(predicate?:ColumnPredicate|string[]):IField[] { 
    // convert to Field, excluding hidden fields. 
    const fields = this.activeCollection.fields.map( f => new Field(f) ).filter( f => !f.IsHiddenField) ?? []; 
    if(!fields.length) 
      return []; 
    const ifields = fields.map(f => f.ifield); 
    if(!predicate)
      return ifields; 
    if(Array.isArray(predicate)) 
      return ifields.filter( f => predicate.includes(f.accessor)) ?? []; 
    return ifields.filter( f => predicate(f)) ?? []; 
  } 

  // GetCrudSettings ............................
  public GetCrudSettings():ICrudSettings { 
    return {Create:this.Create, Update:this.Update, Delete:this.Delete} as ICrudSettings; 
  } 
  
  async Create(entry:IEntry):Promise<boolean> { 
    return await this.dao.Create(this.activeCollection.accessor, entry); 
  } 

  async Update(entry:IEntry):Promise<boolean> { 
    return await this.dao.Update(this.activeCollection.accessor, entry); 
  } 

  async Delete(entry:IEntry):Promise<boolean> { 
    return await this.dao.Delete(this.activeCollection.accessor, entry); 
  } 

  
}