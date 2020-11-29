import React from 'react'; 
import DAO, {Field} from '../common/dao/dao'; 
import {IOption, InputData, InputArray, InputSelect} from '../input/inputcommon'; 
import Check from '../input/check'; 
import {FieldFormatMapper} from '../common/tableSetter'; 
import CrudInlineBtn from '../tablecomponent/crudinlinebtn'; 
import {ITableHook, IColumnSetting, IColumnSettings, CrudFunc, RenderFunc} from '../input/inputtable/inputtable'; 


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
  field: string; 
  defaultValue?: any; 
  renderFunc: RenderFunc; 
} 
*/
const predicateEditable = (tableHook:ITableHook, row?:number) => { 
  return tableHook.GetActiveHook(row) === 'update' || tableHook.GetActiveHook(row) === 'create'; 
}; 
const colsettingsEdit:IColumnSettings = { 
  predicate: predicateEditable, 
  columnSettings: [ 
    /*{ifield:ifields[0], renderFunc:editfunc}, 
    {ifield:ifields[1], renderFunc:editfunc}, 
    {ifield:ifields[2], renderFunc:editfunc}, */
  ] as IColumnSetting[] 
} 




// RENDER FUNC ==================================
// type RenderFunc = (ifield:IField, value:any, onSendValue:any) => any;  ... html


// Read Single primitive
const ReadSinglePrimitive:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <SimpleDisplay {...{ifield, value}} /> 
} 

// Edit Single primitive 
const EditSinglePrimitive:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <InputData type={ifield.type} value={value} onSendValue={setValue} /> 
} 

// Read Single enum 
const ReadSingleEnum:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <SimpleDisplay {...{ifield, value}} /> 
} 

// Edit single enum 
const EditSingleEnum:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  const options:IOption[] = new Field(ifield).GetEnumOptions(); 
  return <InputSelect value={value} options={options} onSendValue={setValue} />; 
} 

// Edit Multi enum 
const EditMultiEnum:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  const options:IOption[] = new Field(ifield).GetEnumOptions(); 
  return <InputSelect value={value} options={options} onSendValue={setValue} isMulti />; 
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
const ReadArray:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <SimpleDisplay {...{ifield, value}} /> 
} 

// Edit Array Data 
const EditArrayData:RenderFunc = (ifield:IField, value:any, setValue:any):any => { 
  return <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue} /> 
} 

