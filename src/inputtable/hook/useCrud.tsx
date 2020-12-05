import {useEffect, useState} from 'react'; 
import {IOption} from '../../input/inputcommon'; 


// CrudFunc =====================================
export type CrudFund = (entry:any) => Promise<boolean>; 

// IDao =========================================
export interface IDao { 
  Create: (accessor:string, entry:IEntry) => Promise<boolean>; 
  Update: (accessor:string, entry:IEntry) => Promise<boolean>; 
  Delete: (accessor:string, entry:IEntry) => Promise<boolean>; 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValue: (ifield:IField, id:string) => any|undefined; 
  GetICollection: (accessor:string) => ICollection|void; 
} 

// ICRUDHOOK ------------------------------------
export interface ICrudHook { 
  entries: IEntry[]; 
  Create: CrudFund; 
  Update: CrudFund; 
  Delete: CrudFund; 
}
// useCrud ======================================
export function useCrud(icollection:ICollection) { 
  const [entries, setEntries] = useState(icollection.entries); 

  useEffect(() => { 
    setEntries(icollection.entries); 
  },[JSON.stringify(icollection.accessor)]) 

  // Build Crud methods 
  const Create = async (entry:IEntry):Promise<boolean> => { 
    const copy = [...entries]; 
    const index = copy.findIndex(e => e._id === entry._id); 
    if(index >= 0) 
      return false; 
      copy.push(entry); 
    setEntries(copy); 
    return true; 
  } 

  const Update = async (entry:IEntry):Promise<boolean> => { 
    const copy = [...entries]; 
    const index = copy.findIndex(e => e._id === entry._id); 
    if(index >= 0)  { 
      copy[index] = entry; 
      setEntries(copy); 
      return true; 
    } 
    return false; 
  }

  const Delete = async (entry:IEntry):Promise<boolean> => { 
    const copy = [...entries]; 
    const index = copy.findIndex(e => e._id === entry._id); 
    if(index >= 0)  { 
      copy.splice(index, 1); 
      setEntries(copy); 
      return true; 
    } 
    return false; 
  }

  return {entries, Create, Update, Delete} as ICrudHook; 
} 

