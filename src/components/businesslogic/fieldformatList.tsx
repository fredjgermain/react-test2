import React from 'react'; 
/*import DAO, {Field} from '../common/dao/dao'; 
import {IOption, InputData, InputArray, InputSelect} from '../testinput/input/inputcommon'; 
import Check from '../testinput/input/check'; 
import {FieldFormatMapper} from '../common/tableSetter'; 
import CrudInlineBtn from '../../../../../trash/tablecomponent/crudinlinebtn'; 



// INLINE CRUD ----------------------------------
const InLineCrud = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => { 
  if(field.ifield.accessor === 'inlinecrud') { 
    ifieldFormat.readFunc = (ifield:IField, value:any):any => { 
      return <CrudInlineBtn /> 
    } 
    ifieldFormat.editFunc = (ifield:IField, value:any):any => { 
      return <CrudInlineBtn /> 
    } 
  } 
} 



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



// LIST OF READ / EDIT FUNCs ####################
// read/edit single primitive 
const ReadEdit_Primitive = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => { 
  if(!field.IsArray() && field.IsPrimitive()) { 
    ifieldFormat.readFunc = ReadSinglePrimitive; 
    ifieldFormat.editFunc = EditSinglePrimitive; 
  } 
} 

// read/edit single enum
const ReadEdit_SingleEnum = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => { 
  if(!field.IsArray() && field.IsEnum()) { 
    ifieldFormat.readFunc = ReadSingleEnum; 
    ifieldFormat.editFunc = EditSingleEnum; 
  } 
}

// edit array enum
const Edit_ArrayEnum = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => {
  if(field.IsArray() && field.IsEnum()) { 
    ifieldFormat.editFunc = EditMultiEnum; 
  } 
}

// read/edit single foreign object
const ReadEdit_SingleForeign = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => {
  if(!field.IsArray() && field.IsObjectID()) { 
    ifieldFormat.readFunc = ReadSingleForeign(dao); 
    ifieldFormat.editFunc = EditSingleForeign(dao); 
  } 
}

// edit multi foreign object
const Edit_MultiForeign = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => {
  if(field.IsArray() && field.IsObjectID()) { 
    ifieldFormat.editFunc = EditMultiForeign(dao); 
  } 
}

// read array any
const Read_ArrayForeign = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => {
  if(field.IsArray()) 
    ifieldFormat.readFunc = ReadArray; 
}
// edit array primitive
const Edit_ArrayPrimitive = (field:Field, ifieldFormat:IFieldFormat, dao:DAO) => {
  if(field.IsArray() && field.IsPrimitive()) 
    ifieldFormat.editFunc = EditArrayData; 
}

export const fieldFormatMappers:FieldFormatMapper[] = [ 
  ReadEdit_Primitive, 
  ReadEdit_SingleEnum, 
  Edit_ArrayEnum, 
  ReadEdit_SingleForeign, 
  Edit_MultiForeign, 
  Read_ArrayForeign, 
  Edit_ArrayPrimitive, 
  InLineCrud, 
] 


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
*/