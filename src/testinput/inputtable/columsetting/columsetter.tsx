import { IOption } from "../../input/inputcommon"; 
import { ITableHook } from '../inputtablehook'; 

// Interface Render Func ========================
export type RenderFunc = (value:any, onSendValue:any) => any; 

// Interface IFIELD SETTING ===================
export interface IFieldSetting { 
  // if 'undefined' it will be assumed as a default column setting if no other column setting predicate is passes. 
  cellPredicate?: (tableHook:ITableHook, row?:number) => boolean; 
  ifield: IField; 
  order?:number; 
  renderFunc: RenderFunc; 
} 

// Interface FIELD SETTER ================
export interface IFieldSettingRule { 
  ifieldPredicate: (ifield:IField) => boolean; 
  cellPredicate?: (tableHook:ITableHook, row?:number) => boolean; 
  order?: number; 
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

// COLUMNSETTER =================================
export class ColumnSetter { 
  /* 
  use dao.GetForeignOptions, and, dao.GetForeignValue 
  to build render function capable of accessing foreign collections. 
  */ 

  public BuildColumnSettings(foreignDao:IForeignDao, ifields:IField[], iColumnSettingRules:IFieldSettingRule[]):IFieldSetting[] { 
    let columnSettings:IFieldSetting[] = []; 
    function byiField(ifield:IField) { 
      return iColumnSettingRules.filter( cb => cb.ifieldPredicate(ifield) ) 
      .map(rule => { 
        return {ifield, 
          order:rule.order, 
          cellPredicate:rule.cellPredicate, 
          renderFunc:rule.buildRenderFunc(ifield, foreignDao) } as IFieldSetting; 
      }) 
    } 

    ifields.forEach( ifield => { 
      columnSettings = columnSettings.concat(byiField(ifield)); 
    }) 
    return columnSettings; 
  } 
}