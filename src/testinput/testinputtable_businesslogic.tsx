import React from 'react'; 
import {InputArray, InputData, IOption} from './input/inputcommon'; 
import InputSelect from './input/inputselect/inputselect'; 

import { ITableHook } from './inputtable/inputtablehook'; 
import {IFieldSettingRule, IForeignDao} from './inputtable/columsetting/columsetter';
import Field from '../components/common/dao/field'; 


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

// icolumn Predicate ======================================
const editable = (tableHook:ITableHook, row?:number) => { 
  return tableHook.GetActiveHook(row) === 'update' || tableHook.GetActiveHook(row) === 'create'; 
}; 

// BuildRenderFunc =====================================
const ReadMany = (ifield:IField, value:any) => { 
  const N = Array.isArray(value) ? value: []; 
  return <span>{new Field(ifield).GetElementType()} x {N.length}</span> 
}

const Display = (ifield:IField, value:any) => { 
  if(ifield.type === 'boolean') 
    return <span>{JSON.stringify(value)}</span>; 
  return <span>{value}</span>; 
}

// PRIMITIVE --------------------------------------
const ReadOnePrimitive = (ifield:IField, foreign:IForeignDao) => { 
  return (value:any, onSendValue:any) => { 
    return Display(ifield, value); 
}}; 

const EditOnePrimitive = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    return <InputData {...{value, onSendValue}} /> 
}}; 

const ReadManyPrimitive = (ifield:IField, foreign:IForeignDao) => {
  return (value:any, onSendValue:any) => { 
    return ReadMany(ifield, value); 
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
    return ReadMany(ifield, value); 
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
  return (value:any, onSendValue:any):any => { 
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
    return ReadMany(ifield, value); 
}}; 

const EditManyForeign = (ifield:IField, foreign:IForeignDao) => { 
  return (value:any, onSendValue:any) => { 
    const options:IOption[] = foreign.GetForeignOptions(ifield); 
    return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
}}; 


// Column Setting Rules -------------------------
export const ColumnSettingRules:IFieldSettingRule[] = [ 
  // Primitive
  {ifieldPredicate:OnePrimitive, buildRenderFunc: ReadOnePrimitive}, 
  {ifieldPredicate:OnePrimitive, cellPredicate:editable, buildRenderFunc: EditOnePrimitive}, 
  {ifieldPredicate:ManyPrimitive, buildRenderFunc: ReadManyPrimitive}, 
  {ifieldPredicate:ManyPrimitive, cellPredicate:editable,buildRenderFunc: EditManyPrimitive}, 

  // Enum
  {ifieldPredicate:OneEnum, buildRenderFunc: ReadOneEnum}, 
  {ifieldPredicate:OneEnum, cellPredicate:editable, buildRenderFunc: EditOneEnum}, 
  {ifieldPredicate:ManyEnum, buildRenderFunc: ReadManyEnum}, 
  {ifieldPredicate:ManyEnum, cellPredicate:editable, buildRenderFunc: EditManyEnum}, 

  // Foreign
  {ifieldPredicate:OneForeign, buildRenderFunc: ReadOneForeign}, 
  {ifieldPredicate:OneForeign, cellPredicate:editable, buildRenderFunc: EditOneForeign}, 
  {ifieldPredicate:ManyForeign, buildRenderFunc: ReadManyForeign}, 
  {ifieldPredicate:ManyForeign, cellPredicate:editable, buildRenderFunc: EditManyForeign}, 
] 
