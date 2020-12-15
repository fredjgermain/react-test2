import React from 'react'; 
import {IFieldRendering} from './common'; 
import {InputArray, InputData, InputSelect} from '../../input/inputcommon'; 
import Field from '../../mongoosedao/field'; 

export interface IForeignValues { 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValue: (ifield:IField, id:string) => any|undefined; 
} 

// BUILD FIELD RENDERING =================================
export function BuildDefaultFieldRenderings({GetForeignOptions, GetForeignValue}:IForeignValues) { 
  
  // Predicate ------------------------------------
  const OnePrimitive = (ifield:IField):boolean => !new Field(ifield).IsArray() && new Field(ifield).IsPrimitive(); 
  const ManyPrimitive = (ifield:IField):boolean => new Field(ifield).IsArray() && new Field(ifield).IsPrimitive(); 
  const OneEnum = (ifield:IField):boolean => !new Field(ifield).IsArray() && new Field(ifield).IsEnum(); 
  const ManyEnum = (ifield:IField):boolean => new Field(ifield).IsArray() && new Field(ifield).IsEnum(); 
  const OneForeign = (ifield:IField):boolean => !new Field(ifield).IsArray() && new Field(ifield).IsObjectID(); 
  const ManyForeign = (ifield:IField):boolean => new Field(ifield).IsArray() && new Field(ifield).IsObjectID(); 

  const Edit = (handle:string):boolean => ['update', 'create'].includes(handle); 

  const PredicateReadOnePrimitive = (ifield:IField, handle:string) => OnePrimitive(ifield) && !Edit(handle); 
  const PredicateEditOnePrimitive = (ifield:IField, handle:string) => OnePrimitive(ifield) && Edit(handle); 
  const PredicateReadManyPrimitive = (ifield:IField, handle:string) => ManyPrimitive(ifield) && !Edit(handle); 
  const PredicateEditManyPrimitive = (ifield:IField, handle:string) => ManyPrimitive(ifield) && Edit(handle); 

  const PredicateReadOneEnum = (ifield:IField, handle:string) => OneEnum(ifield) && !Edit(handle); 
  const PredicateEditOneEnum = (ifield:IField, handle:string) => OneEnum(ifield) && Edit(handle); 
  const PredicateReadManyEnum = (ifield:IField, handle:string) => ManyEnum(ifield) && !Edit(handle); 
  const PredicateEditManyEnum = (ifield:IField, handle:string) => ManyEnum(ifield) && Edit(handle); 

  const PredicateReadOneForeign = (ifield:IField, handle:string) => OneForeign(ifield) && !Edit(handle); 
  const PredicateEditOneForeign = (ifield:IField, handle:string) => OneForeign(ifield) && Edit(handle); 
  const PredicateReadManyForeign = (ifield:IField, handle:string) => ManyForeign(ifield) && !Edit(handle); 
  const PredicateEditManyForeign = (ifield:IField, handle:string) => ManyForeign(ifield) && Edit(handle); 

  // BuildRenderFunc -------------------------------------
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
  const ReadOnePrimitive = (ifield:IField) => (value:any, onSendValue:any) => 
    Display(ifield, value); 

  const EditOnePrimitive = (ifield:IField) => (value:any, onSendValue:any) => 
    <InputData {...{value, onSendValue}} /> 

  const ReadManyPrimitive = (ifield:IField) => (value:any, onSendValue:any) => 
    ReadMany(ifield, value); 

  const EditManyPrimitive = (ifield:IField) => (value:any, setValue:any) => 
    <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 

  // ENUM -----------------------------------------
  const ReadOneEnum = (ifield:IField) => (value:any, onSendValue:any) => 
    <span>{value}</span>; 

  const EditOneEnum = (ifield:IField) => (value:any, onSendValue:any) => { 
      const enums:any[] = ifield.options['enum'] ?? []; 
      const options = enums.map( o => {
        return {value:o, label:o} as IOption} 
      ); 
      return <InputSelect {...{value, onSendValue, options}} /> 
    }; 

  const ReadManyEnum = (ifield:IField) => (value:any, onSendValue:any) => 
    ReadMany(ifield, value); 

  const EditManyEnum = (ifield:IField) => (value:any, onSendValue:any) => { 
      const enums:any[] = ifield.options['enum'] ?? []; 
      const options = enums.map( o => { 
        return {value:o, label:o} as IOption} 
      ); 
      return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
    }; 

  // FOREIGN --------------------------------------
  const ReadOneForeign = (ifield:IField) => (value:any, onSendValue:any) => { 
      const foreignValue:any = GetForeignValue(ifield, value); 
      return <span>{JSON.stringify(foreignValue)}</span>; 
    } 

  const EditOneForeign = (ifield:IField) => (value:any, onSendValue:any) => { 
      const options:IOption[] = GetForeignOptions(ifield); 
      return <InputSelect {...{value, onSendValue, options}} /> 
    }; 

  const ReadManyForeign = (ifield:IField) => (value:any, onSendValue:any) => 
    ReadMany(ifield, value); 

  const EditManyForeign = (ifield:IField) => (value:any, onSendValue:any) => { 
      const options:IOption[] = GetForeignOptions(ifield); 
      return <InputSelect {...{value, onSendValue, options, isMulti:true}} /> 
    };

  // FieldRendering build ---------------------------------
  return [ 
    {predicate:PredicateReadOnePrimitive, renderer:ReadOnePrimitive}, 
    {predicate:PredicateEditOnePrimitive, renderer:EditOnePrimitive}, 
    {predicate:PredicateReadManyPrimitive, renderer:ReadManyPrimitive}, 
    {predicate:PredicateEditManyPrimitive, renderer:EditManyPrimitive}, 

    {predicate:PredicateReadOneEnum, renderer:ReadOneEnum}, 
    {predicate:PredicateEditOneEnum, renderer:EditOneEnum}, 
    {predicate:PredicateReadManyEnum, renderer:ReadManyEnum}, 
    {predicate:PredicateEditManyEnum, renderer:EditManyEnum}, 

    {predicate:PredicateReadOneForeign, renderer:ReadOneForeign}, 
    {predicate:PredicateEditOneForeign, renderer:EditOneForeign}, 
    {predicate:PredicateReadManyForeign, renderer:ReadManyForeign}, 
    {predicate:PredicateEditManyForeign, renderer:EditManyForeign}, 
  ] as IFieldRendering[]; 
}