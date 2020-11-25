import DAO from '../common/dao/dao'; 


// TO move to CrudTable ...
type CrudFunc = (entry:IEntry) => Promise<boolean> 
interface ICrudSettings { 
  Create:CrudFunc; 
  Update:CrudFunc; 
  Delete:CrudFunc; 
}

// CrudSetter ===================================
export default class CrudSetter { 
  public dao:DAO = {} as DAO; 
  public activeCollection:ICollection = {} as ICollection; 

  public constructor(dao:DAO, activeCollection:ICollection) {
    this.dao = dao; 
    this.activeCollection = activeCollection; 
  }

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