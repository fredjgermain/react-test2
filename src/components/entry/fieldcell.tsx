import React, { useState, useEffect, useContext } from 'react'; 
import {Collection, Column} from '../proxy/collection'; 
import {IEntry, EnumMode} from '../proxy/interfaces'; 
import {collections} from '../proxy/proxy'; 

import {ActiveCollectionContext} from '../collections/collections'; 
import {EntryRowContext} from './entryrow'; 

import Selector, {IOption} from '../input/selector'; 
import InputData from '../input/inputdata'; 
import InputArray from '../input/inputarray'; 
import Check from '../input/check'; 
import FieldRead from './fieldread'; 
import FieldEdit from './fieldedit'; 


//https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
function StringInterpolate(pattern:String, args:any) { 
  const keys = Object.keys(args); 
  const values = Object.values(args); 
  console.log([pattern, keys, values]); 
  return new Function(...keys, `console.log("${pattern}"); 
  return \`${pattern}\`;`)(...values); 
} 


  /*const result = StringInterpolate(format, {value:'cacaca'}); 
  //const result = StringInterpolate(format, {value:'cacaca'); 
  console.log(result); */

// https://gist.github.com/LachlanArthur/bb87bcd2c8825dd499cb71a1176a4c26
export function sprintf( strings: TemplateStringsArray, ...indices: number[] ) {
	return ( ...values: string[] ) =>
		strings.reduce( ( total, part, index ) =>
			total + part + ( values[ indices[ index ] ] || '' ), ''
		);
}
/*
const test = sprintf`There are ${0} monkeys in the ${1}.`( ''+true, 'tree' ); 
console.log(test); */

// Get options from enum 
export function GetOptionFromEnum(options:any):Array<IOption> { 
  console.log(options);
  const enums = options['enum'] as Array<any>; 
  return enums.map( (v, i) => { 
    return {value: v, label: v} as IOption; 
  }); 
} 

// Get options from foreign collection
export function GetOptionsFromForeign(modeltype:string):Array<IOption> { 
  // Get options from foreign collections 
  const foreignCollection = collections.find(c => c.accessor === modeltype); 
  // Pick first col or main col ?? 
  const firstcol = foreignCollection?.columns[0].accessor ?? ''; 
  return foreignCollection? foreignCollection.data.map( e => { 
    return {value: e._id, label: e[firstcol]}; 
  }): []; 
  //const selectorOptions
}

export function GetAbbreviate(modeltype:string, id:String):{value:any,column:any} { 
  const foreignCollection = collections.find(c => c.accessor === modeltype); 
  if(!foreignCollection) 
    return {value:'', column:''}; 
  /*const foreignColumn = foreignCollection.GetAbbreviateColumn(); 
  const foreignValue = foreignCollection.GetAbbreviateValue(id); */
  return {value:foreignCollection.GetAbbreviateValue(id), column:foreignCollection.GetAbbreviateColumn()}; 
}


type Props = { 
  column:Column; 
} 
// FIELD ========================================
export default function FieldCell({column}:Props) { 
  const collection = useContext(ActiveCollectionContext); 
  const {editableEntry, modeHook:{mode}} = useContext(EntryRowContext); 
  
  const {accessor, type, subtype, modeltype, options} = column; 


  const elemType = subtype === 'ObjectID' ? modeltype: subtype; 

  //let toRender = <span>{editableEntry[accessor]}</span>; 
  if(mode === EnumMode.Read || mode === EnumMode.Delete) 
    return <FieldRead column={column} /> 

  if(mode === EnumMode.Create || mode === EnumMode.Update) 
    return <FieldEdit column={column} /> 

  return <td></td>; 
  // Render Read mode -------------------------------------
  /*
  ObjectID
    <FieldRead>
  Array<ObjectID>
    <FieldRead value=foreignValue, column=foreignColumn>  //
  Array<Data>
    map( ... <FieldRead value=v, column=column>  ) //
  Data
    <FieldRead value=value, column=
  */
  /*if(mode === EnumMode.Read || mode === EnumMode.Delete) { 
    if(column.IsObjectID() && !column.IsArray()) { 
      const abbreviate = GetAbbreviate(modeltype, editableEntry[accessor]); 
      toRender = <span>{JSON.stringify(abbreviate.value)}</span>; 
    } 
    else if(column.IsArray()) 
      toRender = <span>{elemType}x{editableEntry[accessor] ? editableEntry[accessor].length: 0}</span>; 
    else if(column.IsBoolean()) 
      toRender = <Check ok={editableEntry[accessor]} />; 
    else if(column.IsMixed()) 
      toRender = <span>{JSON.stringify(editableEntry[accessor])}</span>; 
    return <td>{toRender}</td>; 
  } 

  // Render edit mode .................................. 
  //if(mode === EnumMode.New) 
  return <span></span>; */

  //const inputDataAttribute = {style:{width:"5ch"}}; 
/*
  toRender = <InputData type={type} 
    value={editableEntry[accessor]} 
    setValue={OnChange} /> 
  // ObjectId, single or array 
  if(column.IsObjectID()) { 
    toRender = <Selector selected={editableEntry[accessor]} 
      setSelected={OnChange} 
      options={GetOptionsFromForeign(modeltype)} 
      isMulti={column.IsArray()} />; 
  } 
  // Enum, single or array 
  else if(column.IsEnum() ) { 
    toRender = <Selector selected={editableEntry[accessor]} 
      setSelected={OnChange} 
      options={GetOptionFromEnum(options)} 
      isMulti={column.IsArray()} />; 
  } 
  // Array 
  else if(column.IsArray()) { 
    toRender = <InputArray type={subtype} 
      values={editableEntry[accessor]} 
      setValues={OnChange} 
      defaultValue={column.defaultValue} /> 
  } 
  return <td>{toRender}</td>;   */
}