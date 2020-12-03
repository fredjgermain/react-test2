import DAO, {Field} from './dao/dao'; 
//import {IColumnSetting, ITableHook} from '../../testinput/input/inputtable/inputtable'; 


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

}