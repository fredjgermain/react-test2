//import {LoadCollections} from './mongooseparser'; 
import {crud} from './crudaxios'; 
import Collection from './collection'; 
import Field from './field'; 
import { IOption } from '../testinput/input/inputcommon'; 

export {Collection, Field}; 


// DataAcessObject ==============================
export default class DataAccessObject { 
  public collections:Collection[] = []; 
  public response?:IResponse = {} as IResponse; 

  // Load Collections
  /*public async LoadCollections(collectionAccessors:string[]) { 
    const loadedCollections = await LoadCollections(collectionAccessors); 
    this.collections = loadedCollections; 
  } */ 

  public GetEmptyEntry(icollection:ICollection):IEntry { 
    return new Collection(icollection).GetDefaultEntry(); 
  } 

  public GetICollection(accessor:string):ICollection|void { 
    if(!accessor) 
      return; 
    return this.collections.find( c => c.icollection.accessor === accessor)?.icollection; 
  } 

  private GetCollection(accessor:string):Collection|void { 
    if(!accessor) 
      return; 
    return this.collections.find( c => c.icollection.accessor === accessor); 
  } 

  // CREATE .....................................  
  public async Create(accessor:string, entry:IEntry):Promise<boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    const responses = (await crud.Create(accessor, [entry])).data as IResponse[]; 
    this.response = responses[0] ?? {} as IResponse; 
    //console.log(this.response.data); 
    if(this.response.success) 
      selectedCollection.Create(this.response.data); 
    return this.response.success; 
  } 

  // UPDATE .....................................
  public async Update(accessor:string, entry:IEntry):Promise<boolean> { 
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
  public async Delete(accessor:string, entry:IEntry):Promise<boolean> { 
    const selectedCollection = this.GetCollection(accessor); 
    if(!selectedCollection) 
      return false; 
    const responses = (await crud.Delete(accessor, [entry])).data as IResponse[]; 
    this.response = responses[0] ?? {} as IResponse; 
    if(this.response.success) 
      selectedCollection.Delete(entry); 
    return this.response.success; 
  } 

  // GET FOREIGN INFO -----------------------------
  public GetForeignElements(ifield:IField): [ICollection, IField] | [] { 
    const foreignCollection = this.GetCollection(ifield.modeltype); 
    const foreignField = foreignCollection? foreignCollection.GetAbbreviateField(): null; 
    if(!foreignCollection || !foreignField) 
      return []; 
    return [foreignCollection.icollection, foreignField]; 
  } 

  public GetForeignValue(ifield:IField, id:string):any|undefined { 
    const [foreignCollection, foreignField] = this.GetForeignElements(ifield); 
    const foreignEntry = foreignCollection?.entries.find( e => e._id === id); 
    if(foreignEntry) 
      return foreignEntry[ifield.accessor]; 
    return; 
  }

  public GetForeignOptions(ifield:IField):IOption[] { 
    const [foreignCollection, foreignField] = this.GetForeignElements(ifield); 
    if(!foreignCollection || !foreignField) 
      return [] as IOption[]; 
    return foreignCollection.entries?.map( e => { 
      return {value:e._id, label:e[foreignField.accessor]} as IOption; 
    }); 
  } 
} 

/*public GetOptions(ifield:IField):IOption[] { 
    const field = new Field(ifield); 
    if(field.IsEnum()) 
      return field.GetEnumOptions(); 
    if(field.IsObjectID()) 
      return this.GetForeignOptions(ifield.modeltype); 
    return []; 
  } 
  
  public GetForeignCollection(ifield:IField):ICollection|void {
    const field = new Field(ifield); 
    const foreignCollection = this.GetCollection(ifield.modeltype); 
    if(!field.IsObjectID() || !foreignCollection) 
      return; 
    return foreignCollection.icollection; 
  } 

  public GetForeignField(ifield:IField):IField|void { 
    const foreignCollection = this.GetForeignCollection(ifield);
    if(!foreignCollection) 
      return; 
    return new Collection(foreignCollection).GetAbbreviateField(); 
  } 

  */