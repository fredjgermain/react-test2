import React from 'react'; 
import {InputData, IOption} from './inputcommon'; 
import {IColumnSetting, ITableHook, RenderFunc} from './inputtable/inputtablehook'; 
import {ifields, data} from './testinputtable_data'; 
import Field from '../common/dao/field'; 
import InputSelect from './inputselect/inputselect';


// RENDER FUNC ====================================
const SinglePrimitive = (field:Field) => !field.IsArray() && field.IsPrimitive(); 
const SingleEnum = (field:Field) => !field.IsArray() && field.IsEnum(); 
const SingleForeign = (field:Field) => !field.IsArray() && field.IsObjectID(); 
const ArrayPrimitive = (field:Field) => field.IsArray() && field.IsPrimitive(); 
const ArrayEnum = (field:Field) => field.IsArray() && field.IsEnum(); 
const ArrayForeign = (field:Field) => field.IsArray() && field.IsObjectID(); 
const SingleTestForeign = (field:Field) => field.ifield.accessor === '_id'; 


// Read RenderFunc --------------------------------
const ReadSingle = (ifield:IField, foreign:any) => {
  return (value:any, onSendValue:any) => { 
    return <span>{value}</span>; 
}}; 

const EditSingle = (ifield:IField, foreign:any) => {
  return (value:any, onSendValue:any) => { 
    return <InputData {...{value, onSendValue}} /> 
}}; 

const EditEnum = (ifield:IField, foreign:any) => { 
  const enums:any[] = ifield.options['enum'] ?? []; 
  const options = enums.map( o => {return {value:o, label:o} as IOption} ); 
  return (value:any, onSendValue:any) => { 
    
    return <InputSelect {...{value, onSendValue, options}} /> 
}}; 


// COLUMN SETTING PREDICATE -----------------------
const editable = (tableHook:ITableHook, row?:number) => { 
  return tableHook.GetActiveHook(row) === 'update' || tableHook.GetActiveHook(row) === 'create'; 
}; 

export interface IColumnSettingBuilder { 
  ifieldPredicate: (field:Field) => boolean; 
  predicate?: (tableHook:ITableHook, row?:number) => boolean; 
  order?: number; 
  renderFunc: (ifield:IField, foreign:any) => RenderFunc; 
} 


const testForeign = 'testDao'; 

const ColumnSettingBuilder:IColumnSettingBuilder[] = [ 
  {ifieldPredicate:SingleTestForeign, renderFunc: ReadSingle}, 
  {ifieldPredicate:SinglePrimitive, renderFunc: ReadSingle}, 
  {ifieldPredicate:SingleEnum, renderFunc: ReadSingle}, 
  
  {ifieldPredicate:SinglePrimitive, predicate:editable, renderFunc: EditSingle}, 
  {ifieldPredicate:SingleEnum, predicate:editable, renderFunc: EditEnum}, 
] 


function MakeColumnSettings(ifields:IField[]):IColumnSetting[] { 
  const foreign = {}; 
  let columnSettings:IColumnSetting[] = []; 
  function byiField(ifield:IField) { 
    return ColumnSettingBuilder.filter( cb => cb.ifieldPredicate(new Field(ifield)) ) 
    .map(cb => { 
      return {ifield, order:cb.order, predicate:cb.predicate, renderFunc:cb.renderFunc(ifield, foreign)  } as IColumnSetting; 
    }) 
  } 

  ifields.forEach( ifield => { 
    columnSettings = columnSettings.concat(byiField(ifield)); 
  }) 
  return columnSettings; 
} 

const columnSettings = MakeColumnSettings(ifields); 

// COLUMN SETTINGS ------------------------------
/*const columnSettings:IColumnSetting[] = [ 
    // read colsettings
    {ifield:ifields[0], order:-1, renderFunc:ReadSingle}, 
    {ifield:ifields[1], renderFunc:ReadSingle}, 
    {ifield:ifields[2], renderFunc:ReadSingle}, 

    // edit colsettings
    {predicate:editable, ifield:ifields[0], order:-1, renderFunc:EditSingle}, 
    {predicate:editable, ifield:ifields[1], renderFunc:EditSingle}, 
    {predicate:editable, ifield:ifields[2], renderFunc:EditSingle}, 
  ] as IColumnSetting[];*/

export {data, columnSettings}; 