import React from 'react'; 
import DAO, {Field} from '../common/dao/dao'; 
import {IOption, InputData, InputArray, InputSelect} from '../input/inputcommon'; 
import Check from '../input/check'; 
import {FieldFormatMapper} from '../common/tableSetter'; 
import CrudInlineBtn from '../tablecomponent/crudinlinebtn'; 
import {ITableHook, IColumnSetting, CrudFunc, RenderFunc} from '../input/inputtable/inputtable'; 


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



// ICOLUMN SETTING ==============================
/*
IColumnSettings
  predicate?: (tableHook:ITableHook, row?:number) => boolean; 
  columnSettings: IColumnSetting[]; 

IColumnSetting { 
  ifield: IField; 
  renderFunc: RenderFunc; 
} 
*/
const predicateEditable = (tableHook:ITableHook, row?:number) => { 
  return tableHook.GetActiveHook(row) === 'update' || tableHook.GetActiveHook(row) === 'create'; 
}; 


// column predicates 
const SinglePrimitive = (field:Field) => !field.IsArray() && field.IsPrimitive(); 
const SingleEnum = (field:Field) => !field.IsArray() && field.IsEnum(); 
const SingleForeign = (field:Field) => !field.IsArray() && field.IsObjectID(); 
const ArrayPrimitive = (field:Field) => field.IsArray() && field.IsPrimitive(); 
const ArrayEnum = (field:Field) => field.IsArray() && field.IsEnum(); 
const ArrayForeign = (field:Field) => field.IsArray() && field.IsObjectID(); 

// default READ COLUMN SETTINGS ======================


// Read Single primitive
const ReadSinglePrimitive = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(SinglePrimitive(new Field(ifield))) 
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
        return <SimpleDisplay {...{ifield, value}} /> 
      }} as IColumnSetting; 
  return;
}

// Read Single enum 
const ReadSingleEnum = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(SingleEnum(new Field(ifield)))
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      return <SimpleDisplay {...{ifield, value}} />     
      }} as IColumnSetting; 
  return; 
} 

// Read Single Foreign 
const ReadSingleForeign = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(SingleForeign(new Field(ifield))) 
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      const options:IOption[] = dao.GetForeignOptions(ifield); 
      const foreignLabel = options.find(o => o.value === value)?.label; 
      return <SimpleDisplay {...{ifield, value:foreignLabel}} /> 
    }} as IColumnSetting; 
  return;
} 

// Read Array 
const ReadArray = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(new Field(ifield).IsArray())
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      return <SimpleDisplay {...{ifield, value}} /> 
    }} as IColumnSetting; 
  return;
}

const colSettingReadFuncs = [
  ReadSinglePrimitive, 
  ReadSingleEnum, 
  ReadArray, 
]



// default EDIT COLUMN SETTINGS ======================
// Edit Single primitive 
const EditSinglePrimitive = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(SinglePrimitive(new Field(ifield))) 
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
        return <InputData type={ifield.type} value={value} onSendValue={setValue} />     
      }} as IColumnSetting; 
  return;
}


// Edit single enum 
const EditSingleEnum = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(SingleEnum(new Field(ifield)))
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      const options:IOption[] = new Field(ifield).GetEnumOptions(); 
      return <InputSelect value={value} options={options} onSendValue={setValue} />;    
    }} as IColumnSetting; 
  return;
}

// Edit Multi enum 
const EditMultiEnum = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(ArrayEnum(new Field(ifield)))
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      const options:IOption[] = new Field(ifield).GetEnumOptions(); 
      return <InputSelect value={value} options={options} onSendValue={setValue} isMulti />;   
    }} as IColumnSetting; 
  return; 
}

// Edit Single Foreign 
const EditSingleForeign = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(SingleForeign(new Field(ifield)))
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      const options:IOption[] = dao.GetForeignOptions(ifield); 
      return <InputSelect value={[value]} options={options} onSendValue={setValue} />;  
    }} as IColumnSetting; 
  return; 
}

// Edit Multi Foreign 
const EditMultiForeign = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(ArrayForeign(new Field(ifield)))
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      const options:IOption[] = dao.GetForeignOptions(ifield); 
      return <InputSelect value={value} options={options} onSendValue={setValue} isMulti/>; 
    }} as IColumnSetting; 
  return; 
}


// Edit Array Data 
const EditArray = (ifield:IField, dao:DAO):IColumnSetting|undefined => {
  if(ArrayPrimitive(new Field(ifield)))
    return {ifield, renderFunc: (value:any, setValue:any):any => { 
      return <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 
    }} as IColumnSetting; 
  return; 
}


const colSettingEditFuncs = [
  EditSinglePrimitive, 
  EditSingleEnum, 
  EditMultiEnum,
  EditSingleForeign, 
  EditMultiForeign, 
  EditArray, 
]


// IColumnSettings ===============================
function MakeIColumSettings(ifields:IField[], dao:DAO) { 
  // calls collSettingReadFuncs, collSettingEditFuncs to generate ColumnSettingS[] 
  // must return 2 complete sets of ColumnSettings, one 'Read' the other 'Edit'. 
} 

const colsettingRead = {}; 

const colsettingEdit = {}; 
