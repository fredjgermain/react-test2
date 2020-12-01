import React from 'react'; 
//import DAO, {Collection, Field} from '../common/dao/dao'; 
/*import {IOption, InputData, InputArray, InputSelect} from '../testinput/input/inputcommon'; 
import Check from '../testinput/input/check'; 



// TO MOVE in Table component ... 
type ReadFunc = (ifield:IField, value:any) => any; 
type EditFunc = (ifield:IField, value:any, setValue:any) => any; 
interface ICellFormat { 
  ifield:IField; 
  readFunc: ReadFunc; 
  editFunc: EditFunc; 
} 
// CELL FORMATTER ===============================
export default class CellFormatter{ 
  public dao:DAO = {} as DAO; 
  public activeCollection:ICollection = {} as ICollection; 

  public constructor(dao:DAO, activeCollection:ICollection) { 
    this.dao = dao; 
    this.activeCollection = activeCollection; 
  } 

  public GetFieldsFormat():ICellFormat[] { 
    return this.activeCollection.fields.map( f => { 
      return this.GetFieldFormat(f); 
    }); 
  } 

  private GetFieldFormat(ifield:IField):ICellFormat { 
    const field = new Field(ifield); 
    const ifieldFormat = {} as ICellFormat; 

    // read/edit single primitive 
    if(!field.IsArray() && field.IsPrimitive()) { 
      ifieldFormat.readFunc = ReadSinglePrimitive; 
      ifieldFormat.editFunc = EditSinglePrimitive; 
    } 
    // read/edit single enum
    if(!field.IsArray() && field.IsEnum()) { 
      ifieldFormat.readFunc = ReadSingleEnum; 
      ifieldFormat.editFunc = EditSingleEnum; 
    } 
    // edit array enum
    if(field.IsArray() && field.IsEnum()) { 
      ifieldFormat.editFunc = EditMultiEnum; 
    } 
    // read/edit single foreign object
    if(!field.IsArray() && field.IsObjectID()) { 
      ifieldFormat.readFunc = ReadSingleForeign(this.dao); 
      ifieldFormat.editFunc = EditSingleForeign(this.dao); 
    } 
    // edit multi foreign object
    if(field.IsArray() && field.IsObjectID()) { 
      ifieldFormat.editFunc = EditMultiForeign(this.dao); 
    } 
    // read array any
    if(field.IsArray()) 
      ifieldFormat.readFunc = ReadArray; 
    // edit array primitive
    if(field.IsArray() && field.IsPrimitive()) 
      ifieldFormat.editFunc = EditArrayData; 
      
    return {} as ICellFormat; 
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
const ReadEdit_Primitive = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => { 
  if(!field.IsArray() && field.IsPrimitive()) { 
    ifieldFormat.readFunc = ReadSinglePrimitive; 
    ifieldFormat.editFunc = EditSinglePrimitive; 
  } 
}

// read/edit single enum
const ReadEdit_SingleEnum = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => { 
  if(!field.IsArray() && field.IsEnum()) { 
    ifieldFormat.readFunc = ReadSingleEnum; 
    ifieldFormat.editFunc = EditSingleEnum; 
  } 
}

// edit array enum
const Edit_ArrayEnum = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => {
  if(field.IsArray() && field.IsEnum()) { 
    ifieldFormat.editFunc = EditMultiEnum; 
  } 
}

// read/edit single foreign object
const ReadEdit_SingleForeign = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => {
  if(!field.IsArray() && field.IsObjectID()) { 
    ifieldFormat.readFunc = ReadSingleForeign(dao); 
    ifieldFormat.editFunc = EditSingleForeign(dao); 
  } 
}

// edit multi foreign object
const Edit_MultiForeign = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => {
  if(field.IsArray() && field.IsObjectID()) { 
    ifieldFormat.editFunc = EditMultiForeign(dao); 
  } 
}

// read array any
const Read_ArrayForeign = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => {
  if(field.IsArray()) 
    ifieldFormat.readFunc = ReadArray; 
}
// edit array primitive
const Edit_ArrayPrimitive = (field:Field, ifieldFormat:ICellFormat, dao:DAO) => {
  if(field.IsArray() && field.IsPrimitive()) 
    ifieldFormat.editFunc = EditArrayData; 
}
const CellFormatMapper:any[] = [ 
  ReadEdit_Primitive, 
  ReadEdit_SingleEnum,
  Edit_ArrayEnum,
  ReadEdit_SingleForeign,
  Edit_MultiForeign,
  Read_ArrayForeign,
  Edit_ArrayPrimitive
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
    const foreignLabel = options.find(o => o.value)?.label; 
    return <SimpleDisplay {...{ifield, value}} /> 
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
    return <InputArray type={ifield.type} value={value} onSendValue={setValue} defaultValue={ifield.defaultValue}/> 
  } 
*/