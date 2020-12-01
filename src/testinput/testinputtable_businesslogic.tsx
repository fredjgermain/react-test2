import React from 'react'; 
import {InputArray, InputData, IOption} from './input/inputcommon'; 
import {ColumnSetter, IColumnSetting, IColumnSettingRule, IForeignDao, ITableHook} from './inputtable/inputtable'; 
import {ifields, data} from './testinputtable_data'; 
import Field from '../components/common/dao/field'; 
import InputSelect from './input/inputselect/inputselect'; 

/*export interface IColumnSettingRule { 
  ifieldPredicate: (ifield:IField) => boolean; 
  icolumnPredicate?: (tableHook:ITableHook, row?:number) => boolean; 
  order?: number; 
  buildRenderFunc: (ifield:IField, foreign:IForeignDao) => RenderFunc; 
}*/

// IField Predicate ===============================
const OnePrimitive = (ifield:IField) => !new Field(ifield).IsArray() && new Field(ifield).IsPrimitive(); 
const OneEnum = (ifield:IField) => !new Field(ifield).IsArray() && new Field(ifield).IsEnum(); 
const OneForeign = (ifield:IField) => !new Field(ifield).IsArray() && new Field(ifield).IsObjectID(); 
const ManyPrimitive = (ifield:IField) => new Field(ifield).IsArray() && new Field(ifield).IsPrimitive(); 
const ManyEnum = (ifield:IField) => new Field(ifield).IsArray() && new Field(ifield).IsEnum(); 
const ManyForeign = (ifield:IField) => new Field(ifield).IsArray() && new Field(ifield).IsObjectID(); 
const OneTestForeign = (ifield:IField) => ifield.accessor === '_id'; 

// Application Predicate ======================================
const editable = (tableHook:ITableHook, row?:number) => { 
  return tableHook.GetActiveHook(row) === 'update' || tableHook.GetActiveHook(row) === 'create'; 
}; 

// BuildRenderFunc ================================
// PRIMITIVE --------------------------------------
const ReadOnePrimitive = (ifield:IField, foreign:IForeignDao) => { 
  return (value:any, onSendValue:any) => { 
    return <span>{value}</span>; 
}}; 

const EditOnePrimitive = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    return <InputData {...{value, onSendValue}} /> 
}}; 

const ReadManyPrimitive = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    const N = value as any[]; 
    return <span>{new Field(ifield).GetElementType()} x {N.length}</span> 
}}; 

const EditManyPrimitive = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, setValue:any):any => { 
    return <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 
}}; 

// ENUM -----------------------------------------
const ReadOneEnum = (ifield:IField, foreign:IForeignDao) => { 
  return (value:any, onSendValue:any) => { 
    return <span>{value}</span>; 
}}; 

const EditOneEnum = (ifield:IField, foreign:IForeignDao) => { 
  const enums:any[] = ifield.options['enum'] ?? []; 
  const options = enums.map( o => {
    return {value:o, label:o} as IOption} 
  ); 
  return (value:any, onSendValue:any) => { 
    return <InputSelect {...{value, onSendValue, options}} /> 
}}; 

const ReadManyEnum = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    const N = value as any[]; 
    return <span>{new Field(ifield).GetElementType()} x {N.length}</span> 
}}; 

const EditManyEnum = (ifield:IField, foreign:IForeignDao) => { 
  const enums:any[] = ifield.options['enum'] ?? []; 
  const options = enums.map( o => {
    return {value:o, label:o} as IOption} 
  ); 
  return (value:any, onSendValue:any) => { 
    return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
}}; 

// FOREIGN --------------------------------------
const ReadOneForeign = (ifield:IField, foreign:IForeignDao) => {
  return (ifield:IField, value:any):any => { 
    const foreignValue:any = foreign.GetForeignValue(ifield, value); 
    return <span>{JSON.stringify(foreignValue)}</span>; 
  } 
}

const EditOneForeign = (ifield:IField, foreign:IForeignDao) => { 
  return (value:any, onSendValue:any) => { 
    const options:IOption[] = foreign.GetForeignOptions(ifield); 
    return <InputSelect {...{value, onSendValue, options}} /> 
}}; 

const ReadManyForeign = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    const N = value as any[]; 
    return <span>{new Field(ifield).GetElementType()} x {N.length}</span> 
}}; 

const EditManyForeign = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    const options:IOption[] = foreign.GetForeignOptions(ifield); 
    return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
}}; 


// Column Setting Rules -------------------------
const ColumnSettingRules:IColumnSettingRule[] = [ 
  // Primitive
  {ifieldPredicate:OnePrimitive, buildRenderFunc: ReadOnePrimitive}, 
  {ifieldPredicate:OnePrimitive, icolumnPredicate:editable, buildRenderFunc: EditOnePrimitive}, 
  {ifieldPredicate:ManyPrimitive, buildRenderFunc: ReadManyPrimitive}, 
  {ifieldPredicate:ManyPrimitive, icolumnPredicate:editable,buildRenderFunc: EditManyPrimitive}, 

  // Enum
  {ifieldPredicate:OneEnum, buildRenderFunc: ReadOneEnum}, 
  {ifieldPredicate:OneEnum, icolumnPredicate:editable, buildRenderFunc: EditOneEnum}, 
  {ifieldPredicate:ManyEnum, buildRenderFunc: ReadManyEnum}, 
  {ifieldPredicate:ManyEnum, icolumnPredicate:editable, buildRenderFunc: EditManyEnum}, 

  // Foreign
  {ifieldPredicate:OneForeign, buildRenderFunc: ReadOneForeign}, 
  {ifieldPredicate:OneForeign, icolumnPredicate:editable, buildRenderFunc: EditOneForeign}, 
  {ifieldPredicate:ManyForeign, buildRenderFunc: ReadManyForeign}, 
  {ifieldPredicate:ManyForeign, icolumnPredicate:editable, buildRenderFunc: EditManyForeign}, 
] 

const options = [ 
  {value:'1', label:'foreign option1'}, 
  {value:'2', label:'foreign option2'}, 
  {value:'3', label:'foreign option3'}, 
  {value:'4', label:'foreign option4'}, 
  {value:'5', label:'foreign option5'}, 
  {value:'6', label:'foreign option6'}, 
  {value:'7', label:'foreign option7'}, 
  {value:'8', label:'foreign option8'}, 
] as IOption[];

const Dao:IForeignDao = { 
  GetForeignOptions: (ifield:IField):IOption[] => { 
    return options; 
  },
    
  GetForeignValue: (ifield:IField, id:string) => { 
    return options.find( o => o.value === id); 
  }, 
}; 

const colSetter = new ColumnSetter(); 
const columnSettings = colSetter.BuildColumnSettings(Dao, ifields, ColumnSettingRules); 
export {data, columnSettings}; 