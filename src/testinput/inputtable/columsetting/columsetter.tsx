import { IOption } from "../../input/inputcommon"; 
import { ITableHook } from '../inputtablehook'; 


// Interface Render Func ========================
export type RenderFunc = (value:any, onSendValue:any) => any; 

// Interface COLUMN SETTING ===================
export interface IColumnSetting { 
  // if 'undefined' it will be assumed as a default column setting if no other column setting predicate is passes. 
  predicate?: (tableHook:ITableHook, row?:number) => boolean; 
  ifield: IField; 
  order?:number; 
  renderFunc: RenderFunc; 
} 

// Interface COLUMN SETTING RULE ================
export interface IColumnSettingRule { 
  ifieldPredicate: (ifield:IField) => boolean; 
  icolumnPredicate?: (tableHook:ITableHook, row?:number) => boolean; 
  order?: number; 
  buildRenderFunc: (ifield:IField, foreign:IForeignDao) => RenderFunc; 
} 

// CRUD FUNC ====================================
export type CrudFunc = (entry:IEntry) => Promise<boolean>; 

// FOREIGN DAO ==================================
export interface IForeignDao { 
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

  public BuildColumnSettings(foreignDao:IForeignDao, ifields:IField[], iColumnSettingRules:IColumnSettingRule[]):IColumnSetting[] { 
    let columnSettings:IColumnSetting[] = []; 
    function byiField(ifield:IField) { 
      return iColumnSettingRules.filter( cb => cb.ifieldPredicate(ifield) ) 
      .map(rule => { 
        return {ifield, 
          order:rule.order, 
          predicate:rule.icolumnPredicate, 
          renderFunc:rule.buildRenderFunc(ifield, foreignDao) } as IColumnSetting; 
      }) 
    } 

    ifields.forEach( ifield => { 
      columnSettings = columnSettings.concat(byiField(ifield)); 
    }) 
    return columnSettings; 
  } 
}