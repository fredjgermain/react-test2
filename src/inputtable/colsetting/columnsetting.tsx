import {IOption} from '../../input/inputcommon'; 
import {ITableHook} from '../hook/usetable'; 

export type {IOption, ITableHook}; 

// Interface Render Func ========================
export type Renderer = (value:any, onSendValue:any) => any; 

// IDao =========================================
export interface IDao { 
  Create: (accessor:string, entry:IEntry) => Promise<boolean>; 
  Update: (accessor:string, entry:IEntry) => Promise<boolean>; 
  Delete: (accessor:string, entry:IEntry) => Promise<boolean>; 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValue: (ifield:IField, id:string) => any|undefined; 
  GetICollection: (accessor:string) => ICollection|void; 
} 

// ColumnSetting ================================
export interface IColumnSetting { 
  ifield: IField; 
  order?: number; 
  sort?: number; 
  show?: boolean; 
  predicate?: (table:ITableHook, row:number) => boolean; 
  renderer: Renderer; 
}

export interface IColumnSettingRule { 
  ifieldPredicate: (ifield:IField) => boolean; 
  order?: number; 
  sort?: number; 
  show: boolean; 
  predicate?: (table:ITableHook, row:number) => boolean; 
  buildRenderer: (ifield:IField, foreign:IDao) => Renderer; 
} 

export function BuildColumnSetting(dao:IDao, ifields:IField[], icolrules:IColumnSettingRule[]) : IColumnSetting[] { 
  function byIField(ifield:IField):IColumnSetting[] { 
    const filtered = icolrules.filter( fr => fr.ifieldPredicate(ifield) ); 
    return filtered.map( fr => { 
      return { 
        ifield, 
        order: fr.order, 
        sort: fr.sort, 
        show: fr.show, 
        predicate: fr.predicate, 
        renderer: fr.buildRenderer(ifield, dao), 
      } as IColumnSetting; 
    }); 
  } 
  return (ifields.map( f => byIField(f) )).flat(); 
}