import React, { useState, useEffect, useContext } from 'react'; 
import {Collection, Column} from '../proxy/collection'; 
import {IEntry, EnumMode} from '../proxy/interfaces'; 
import {collections} from '../proxy/proxy'; 
import {sprintf, GetAbbreviate, GetOptionFromEnum, GetOptionsFromForeign} from './fieldcell';

import {ActiveCollectionContext} from '../collections/collections'; 
import {EntryRowContext} from './entryrow'; 

import Selector, {IOption} from '../input/selector'; 
import InputData from '../input/inputdata'; 
import InputArray from '../input/inputarray'; 
import Check from '../input/check'; 


type Props = { 
  column: Column; 
} 
// FIELD READ =================================== 
export default function FieldRead({column}:Props) { 
  const {editableEntry, modeHook:{mode}} = useContext(EntryRowContext); 
  const {accessor, type, subtype, modeltype, options, format} = column; 

  const [change, setChange] = useState(false); 

  function OnChange(newValue:any) { 
    editableEntry[accessor] = newValue; 
    setChange(() => !change); 
  } 

  const elemType = subtype === 'ObjectID' ? modeltype: subtype; 

  let toRender = <InputData type={type} 
  value={editableEntry[accessor]} 
  setValue={OnChange} /> 
  if(column.IsObjectID()) { 
    toRender = <Selector selected={editableEntry[accessor]} 
      setSelected={OnChange} 
      options={GetOptionsFromForeign(modeltype)} 
      isMulti={column.IsArray()} />; 
  } 
  else if(column.IsEnum() ) { 
    toRender = <Selector selected={editableEntry[accessor]} 
      setSelected={OnChange} 
      options={GetOptionFromEnum(options)} 
      isMulti={column.IsArray()} />; 
  } 
  else if(column.IsArray()) { 
    toRender = <InputArray type={subtype} 
      values={editableEntry[accessor]} 
      setValues={OnChange} 
      defaultValue={column.defaultValue} /> 
  } 
  else if(column.IsMixed()) 
    toRender = <span>{JSON.stringify(editableEntry[accessor])}</span>; 

  return <td>{toRender}</td>; 
}