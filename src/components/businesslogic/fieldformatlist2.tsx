import React from 'react'; 
import DAO, {Field} from '../common/dao/dao'; 
//import {IOption, InputData, InputArray, InputSelect} from '../testinput/input/inputcommon'; 
//import Check from '../testinput/input/check'; 
import {FieldFormatMapper} from '../common/tableSetter'; 
import CrudInlineBtn from '../../../../../trash/tablecomponent/crudinlinebtn'; 
//import {ITableHook, IColumnSetting, CrudFunc, RenderFunc} from '../../testinput/input/inputtable/inputtable'; 

/*
// DISPLAY COMPONENT ............................
function SimpleDisplay({ifield, value}:{ifield:IField, value:any}) { 
  const field = new Field(ifield); 
  if(field.IsArray()) { 
    const N = value as any[]; 
    return <span>{field.GetElementType()} x {N.length}</span> 
  } 
  if(field.IsBoolean()) 
    return <Check ok={value} />; 
  if(typeof value === 'object') 
    return <span>{JSON.stringify(value)}</span> 
  return <span>{value}</span>;  // add formatting ?? 
} 


// RENDER FUNC ====================================
// Predicate
const SinglePrimitive = (field:Field) => !field.IsArray() && field.IsPrimitive(); 
const SingleEnum = (field:Field) => !field.IsArray() && field.IsEnum(); 
const SingleForeign = (field:Field) => !field.IsArray() && field.IsObjectID(); 
const ArrayPrimitive = (field:Field) => field.IsArray() && field.IsPrimitive(); 
const ArrayEnum = (field:Field) => field.IsArray() && field.IsEnum(); 
const ArrayForeign = (field:Field) => field.IsArray() && field.IsObjectID(); 



// Render Func --------------------------------
// Read Single primitive
const ReadSinglePrimitive:ReadFunc = (ifield:IField, value:any):any => { 
  return <SimpleDisplay {...{ifield, value}} /> 
} 

// Edit Single primitive 
const EditSinglePrimitive:EditFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <InputData type={ifield.type} value={value} onSendValue={setValue} /> 
} 

// Read Single enum 
const ReadSingleEnum:ReadFunc = (ifield:IField, value:any):any => { 
  return <SimpleDisplay {...{ifield, value}} /> 
} 

// Edit single enum 
const EditSingleEnum:EditFunc = (ifield:IField, value:any, setValue:any):any => { 
  const options:IOption[] = new Field(ifield).GetEnumOptions(); 
  return <InputSelect value={value} options={options} onSendValue={setValue} />; 
} 

// Edit Multi enum 
const EditMultiEnum:EditFunc = (ifield:IField, value:any, setValue:any):any => { 
  const options:IOption[] = new Field(ifield).GetEnumOptions(); 
  return <InputSelect value={value} options={options} onSendValue={setValue} isMulti />; 
} 

// Read Single Foreign 
const ReadSingleForeign = (dao:DAO):ReadFunc => { 
  return (ifield:IField, value:any):any => { 
    const options:IOption[] = dao.GetForeignOptions(ifield); 
    const foreignLabel = options.find(o => o.value === value)?.label; 
    return <SimpleDisplay {...{ifield, value:foreignLabel}} /> 
  } 
} 

// Edit Single Foreign 
const EditSingleForeign = (dao:DAO):EditFunc => { 
  return (ifield:IField, value:any, setValue:any):any => { 
    const options:IOption[] = dao.GetForeignOptions(ifield); 
    return <InputSelect value={[value]} options={options} onSendValue={setValue} />; 
  } 
} 

// Edit Multi Foreign 
const EditMultiForeign = (dao:DAO):EditFunc => { 
  return (ifield:IField, value:any, setValue:any):any => { 
    const options:IOption[] = dao.GetForeignOptions(ifield); 
    return <InputSelect value={value} options={options} onSendValue={setValue} isMulti/>; 
  } 
} 

// Read Array 
const ReadArray:ReadFunc = (ifield:IField, value:any):any => { 
  return <SimpleDisplay {...{ifield, value}} /> 
} 

// Edit Array Data 
const EditArrayData:EditFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 
} 



export interface IColumnSettingBuilder { 
  ifieldPredicate: (field:Field) => boolean; 
  predicate?: (tableHook:ITableHook, row?:number) => boolean; 
  order?: number; 
  renderFunc: RenderFunc; 
} 

const testForeign = 'testDao'; 

const dao = new DAO; 

/*const ColumnSettingBuilder:IColumnSettingBuilder[] = [ 
  {ifieldPredicate:SinglePrimitive, renderFunc: ReadSinglePrimitive() }, 
  {ifieldPredicate:SingleEnum, renderFunc: ReadSingleEnum}, 
  {ifieldPredicate:SingleForeign, renderFunc: ReadSingleForeign(dao) }, 
  
  {ifieldPredicate:SinglePrimitive, predicate:editable, renderFunc: EditSingle}, 
  {ifieldPredicate:SingleEnum, predicate:editable, renderFunc: EditEnum}, 
] 


function MakeColumnSettings(ifields:IField[]):IColumnSetting[] { 
  let columnSettings:IColumnSetting[] = []; 
  function byiField(ifield:IField) { 
    return ColumnSettingBuilder.filter( cb => cb.ifieldPredicate(new Field(ifield)) ) 
    .map(cb => { 
      return {ifield, order:cb.order, predicate:cb.predicate, renderFunc:cb.renderFunc} as IColumnSetting; 
    }) 
  } 

  ifields.forEach( ifield => { 
    columnSettings = columnSettings.concat(byiField(ifield)); 
  }) 
  return columnSettings; 
} 

const columnSettings = MakeColumnSettings(ifields); 
*/