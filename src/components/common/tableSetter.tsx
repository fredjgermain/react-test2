import DAO, {Field} from './dao/dao'; 

export type FieldFormatMapper = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => void; 

// CRUD TABLE SETTER =============================
export default class CrudTableSetter{ 
  public dao:DAO = {} as DAO; 
  public activeCollection:ICollection = {} as ICollection; 

  public constructor(dao:DAO, activeCollection:ICollection) { 
    this.dao = dao; 
    this.activeCollection = activeCollection; 
  } 

  private GetVisibleFields():Field[] { 
    const fields = this.activeCollection.ifields.map( f => new Field(f) ).filter( f => !f.IsHiddenField()) ?? [] as Field[]; 
    return fields; 
  }

  // GetFieldsFormat ...............................
  public GetFieldsFormat(ifields:IField[], fieldFormatMapper:any[]):IFieldFormat[] { 
    //const ifields = this.GetVisibleFields().map( f => f.ifield); 
    return ifields.map( f => { 
      return this.GetFieldFormat(f, fieldFormatMapper); 
    }); 
  } 

  private GetFieldFormat(ifield:IField, fieldFormatMapper:FieldFormatMapper[]):IFieldFormat { 
    const ifieldFormat = {ifield} as IFieldFormat; 
    fieldFormatMapper.forEach( f => f(new Field(ifield), ifieldFormat, this.dao) );  
    return ifieldFormat; 
  } 

  // GetColumnSettings ................................
  public GetColumnSettings(predicate?:FieldPredicate|string[]):IField[] { 
    // convert to Field, excluding hidden fields. 
    const fields = this.GetVisibleFields(); 
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
    return {Create:this.Create(), Update:this.Update(), Delete:this.Delete()} as ICrudSettings; 
  } 

  private Create():(entry:IEntry) => Promise<boolean> { 
    const dao = this.dao; 
    const activeCollectionAccessor = this.activeCollection.accessor; 
    return async (entry:IEntry) => await dao.Create(activeCollectionAccessor, entry); 
  } 

  private Update():(entry:IEntry) => Promise<boolean> { 
    const dao = this.dao; 
    const activeCollectionAccessor = this.activeCollection.accessor; 
    return async (entry:IEntry) => await dao.Update(activeCollectionAccessor, entry); 
  } 

  private Delete():(entry:IEntry) => Promise<boolean> { 
    const dao = this.dao; 
    const activeCollectionAccessor = this.activeCollection.accessor; 
    return async (entry:IEntry) => await dao.Delete(activeCollectionAccessor, entry); 
  } 


  /*async Create(entry:IEntry):Promise<boolean> { 
    return await this.dao.Create(this.activeCollection.accessor, entry); 
  } 

  async Update(entry:IEntry):Promise<boolean> { 
    return await this.dao.Update(this.activeCollection.accessor, entry); 
  } 

  /*async Delete(entry:IEntry):Promise<boolean> { 
    return await this.dao.Delete(this.activeCollection.accessor, entry); 
  } */
}