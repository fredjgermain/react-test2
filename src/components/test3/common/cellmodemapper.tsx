import React from 'react'; 
import DataAccessObject from './dao'; 

import Collection from './collection'; 
import Field from './field'; 
import {InputData, InputArray, InputSelect} from '../input/inputcommon'; 
import { IOption } from '../../trash/inputselect/inputselect';



// Read Single primitive
const ReadSinglePrimitive = (ifield:IField):ReadFunc => { 
  return (value:any):any => { 
    // read Component 
    return <span>READ COMPONENT ...</span>; 
    //return <InputData type={ifield.type} value={value} onSendValue={setValue} /> 
  } 
} 

// Edit Single primitive 
const EditSinglePrimitive = (ifield:IField):EditFunc => { 
  return (value:any, setValue:any):any => { 
    return <InputData type={ifield.type} value={value} onSendValue={setValue} /> 
  } 
} 

// Read Single enum 
const ReadSingleEnum = (ifield:IField):ReadFunc => { 
  const field = new Field(ifield); 
  return (value:any):any => { 
    return <span>READ COMPONENT as {ifield.accessor} ...</span>; 
  } 
} 

// Edit single enum 
const EditSingleEnum = (ifield:IField):EditFunc => { 
  const field = new Field(ifield); 
  const options:IOption[] = field.GetEnumOptions(); 
  return (value:any, setValue:any):any => { 
    return <InputSelect value={value} options={options} onSendValue={setValue} />; 
  }
}

// Edit single enum 
const EditMultiEnum = (ifield:IField):EditFunc => { 
  const field = new Field(ifield); 
  const options:IOption[] = field.GetEnumOptions(); 
  return (value:any, setValue:any):any => { 
    return <InputSelect value={value} options={options} onSendValue={setValue} isMulti />; 
  }
}

// Read Single Foreign 
const ReadSingleForeign = (ifield:IField, dao:DataAccessObject):ReadFunc => { 
  const field = new Field(ifield); 
  return (value:any):any => { 
    const options:IOption[] = dao.GetForeignOptions(ifield.modeltype); 
    const foreignLabel = options.find(o => o.value)?.label; 
    return <span>READ COMPONENT as {foreignLabel} ...</span>; 
  } 
} 

// Edit Single Foreign 
const EditSingleForeign = (ifield:IField, dao:DataAccessObject):EditFunc => { 
  const field = new Field(ifield); 
  return (value:any, setValue:any):any => { 
    const options:IOption[] = dao.GetForeignOptions(ifield.modeltype); 
    return <InputSelect value={[value]} options={options} onSendValue={setValue} />; 
  } 
} 

// Edit Single Foreign 
const EditMultiForeign = (ifield:IField, dao:DataAccessObject):EditFunc => { 
  const field = new Field(ifield); 
  return (value:any, setValue:any):any => { 
    const options:IOption[] = dao.GetForeignOptions(ifield.modeltype); 
    return <InputSelect value={value} options={options} onSendValue={setValue} isMulti/>; 
  } 
} 

// Read Array 
const ReadArray = (ifield:IField):ReadFunc => { 
  return (value:any):any => { 
    const values = value as any[]; 
    return <span>READ COMPONENT as {ifield.type}x{values.length} ...</span>; 
    // return <span>{ifield.type}x{values.length}</span>; 
  } 
} 

// Edit Array Data 
const EditArrayData = (ifield:IField):EditFunc => { 
  return (value:any, setValue:any):any => { 
    return <InputArray type={ifield.type} value={value} onSendValue={setValue} /> 
  } 
} 



// TO MOVE in Table component ... 
type ReadFunc = (value:any) => any; 
type EditFunc = (value:any,setValue:any) => any; 
interface IFieldDisplayFunc { 
  ifield:IField; 
  readFunc: ReadFunc; 
  editFunc: EditFunc; 
} 
export default class CellModeMapper{ 
  public dao:DataAccessObject = {} as DataAccessObject; 
  public activeCollection:Collection = {} as Collection; 

  public constructor(dao:DataAccessObject, selected:string) { 
    this.dao = dao; 
    const activeCollection = this.dao.GetCollection(selected); 
    if(activeCollection) 
      this.activeCollection = activeCollection; 
  } 

  public GetFieldsModeMap(collection:Collection):IFieldDisplayFunc[] { 
    return collection.icollection.fields.map( f => { 
      return this.GetIFieldModeMap(f); 
    }); 
  } 

  private GetIFieldModeMap(ifield:IField):IFieldDisplayFunc { 
    const field = new Field(ifield); 
    const ifielddisplay = {} as IFieldDisplayFunc; 

    // read/edit single primitive 
    if(!field.IsArray() && field.IsPrimitive()) { 
      ifielddisplay.readFunc = ReadSinglePrimitive(ifield); 
      ifielddisplay.editFunc = EditSinglePrimitive(ifield); 
    } 
    // read/edit single enum
    if(!field.IsArray() && field.IsEnum()) { 
      ifielddisplay.readFunc = ReadSingleEnum(ifield); 
      ifielddisplay.editFunc = EditSingleEnum(ifield); 
    } 
    // edit array enum
    if(field.IsArray() && field.IsEnum()) { 
      ifielddisplay.editFunc = EditMultiEnum(ifield); 
    } 
    // read/edit single foreign object
    if(!field.IsArray() && field.IsObjectID()) {
      ifielddisplay.readFunc = ReadSingleForeign(ifield, this.dao); 
      ifielddisplay.editFunc = EditSingleForeign(ifield, this.dao); 
    } 
    // edit multi foreign object
    if(field.IsArray() && field.IsObjectID()) { 
      ifielddisplay.editFunc = EditMultiForeign(ifield, this.dao); 
    } 
    // read array any
    if(field.IsArray()) 
      ifielddisplay.readFunc = ReadArray(ifield); 
    // edit array primitive
    if(field.IsArray() && field.IsPrimitive()) 
      ifielddisplay.editFunc = EditArrayData(ifield); 
      
    return {} as IFieldDisplayFunc; 
  }
}
