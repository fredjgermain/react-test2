import { useState, useEffect } from 'react'; 
import { IOption } from "../../input/inputcommon"; 
import { ITableHook, RenderFunc } from '../inputtable';


// FUNCTION 
function Unic<T>(array:T[]):T[] { 
  const unics:T[] = [] as T[]; 
  array.forEach( e => { 
    if(!unics.includes(e)) 
        unics.push(e) 
  }); 
  return unics; 
}


// FUNCTION REMOVE FROM 
function RemoveFrom<T>(array:T[], predicate:(value:T)=>boolean):[T[], T[]] { 
  const removed = array.filter( x => predicate(x)); 
  const remainder = array.filter( x => !predicate(x)); 
  return [removed, remainder]; 
} 


// FUNCTION REGROUP BY
function RegroupBy<T>(toRegroup:T[], predicate:(ref:T)=>(value:T)=>boolean ) { 
  if(!toRegroup || toRegroup.length===0) 
    return []; 
  let group = []; 
  let remainder = [...toRegroup]; 
  const groups = []; 
  while(remainder.length > 0) { 
    let ref = remainder.shift(); 
    if(ref) { 
      [group, remainder] = RemoveFrom(remainder, predicate(ref)); 
      groups.push([ref, ...group]); 
    }
  }
  return groups; 
}


// IFIELD SETTINGS ==============================
interface IFieldSetting { 
  cellPredicate?: (tableHook:ITableHook, row?:number) => boolean; 
  ifield: IField; 
  renderFunc: RenderFunc; 
} 
interface IFieldSetting_BusinessRule { 
  ifieldPredicate: (ifield:IField) => boolean; 
  cellPredicate?: (tableHook:ITableHook, row?:number) => boolean; 
  buildRenderFunc: (ifield:IField, foreign:IForeignDao) => RenderFunc; 
} 

// CRUD FUNC ====================================
export type CrudFunc = (entry:IEntry) => Promise<boolean>; 

// FOREIGN DAO ==================================
export interface IForeignDao { 
  Create: (entry:IEntry) => Promise<boolean>; 
  Update: (entry:IEntry) => Promise<boolean>; 
  Delete: (entry:IEntry) => Promise<boolean>; 

  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValue: (ifield:IField, id:string) => any|undefined; 

  [key:string]:any; 
} 


// COLUMN SETTINGS =============================
class ColumnSetting{ 
  public ifield:IField = {} as IField; 
  public ifieldSettings: IFieldSetting[] = []; 
  public order: number = 0; 
  public show: boolean = true; 
  public sort: number = 0; // 0: no sorting, 1: accendant sort, -1 descendant sort. 

  // returns applicable ifieldSetting depending on current tableBook and row. 
  public GetFieldSettings(tableHook:ITableHook, row:number):IFieldSetting|undefined { 
    const defaultFieldSetting = this.ifieldSettings.find( f => f.cellPredicate === undefined); 
    const applicableFieldSetting = this.ifieldSettings.find( f => f.cellPredicate && f.cellPredicate(tableHook, row) ); 
    return applicableFieldSetting ?? defaultFieldSetting; 
  } 

  // Creates a set of ColumnSettings from a set of IFieldSettings. 
  public static MakeColumnSettings(ifieldSettings:IFieldSetting[]):ColumnSetting[] { 
    const ifields = Unic( ifieldSettings.map(f=>f.ifield) ); 
    return ifields.map( (f,i) => { 
      return { 
        ifield:f, 
        order: 0, 
        show: true, 
        sort: 0, 
        ifieldSettings: ifieldSettings.filter( fs => fs.ifield === f) 
      } as ColumnSetting; 
    }); 
  } 
}


export function useColumnSettingHook(ifieldSettings:IFieldSetting[]) { 
  // default IColumnSetting 
  const defaultColSettings = ColumnSetting.MakeColumnSettings(ifieldSettings); 
  const [colSettings, setColSettings] = useState(defaultColSettings); 

  // Reset colSettings 
  useEffect(() => { 
    setColSettings(defaultColSettings); 
  },[JSON.stringify(ifieldSettings)]); 

  
  // PICK COLUMNS
  // '*' for remainder of columns ??
  function FilterColumns(columns:string[]) { 
    const filtered:(ColumnSetting|undefined)[] = columns.map( (c,i) => { 
      const found = defaultColSettings.find( cs => cs.ifield.accessor === c); 
      if(found) 
        found.order = i; 
      return found; 
    }); 
    if(filtered === undefined || filtered.length ===0) 
      return; 
    setColSettings(filtered as ColumnSetting[]); 
  } 

  // SortBy
  // <colName> ... sort ascending order
  // -<colName> ... sort descending order
  function SortBy(columns:string[]) { 

  }

  //return method to modify column setting. 
  // make column setting modification from TableContext. 
  // these methods may take an array of string to determine which column to display and in which order. 
} 