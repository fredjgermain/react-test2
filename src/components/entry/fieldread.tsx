import React, { useState, useEffect, useContext } from 'react'; 
import {Collection, Column} from '../proxy/collection'; 
import {sprintf, GetAbbreviate, GetOptionFromEnum, GetOptionsFromForeign} from './fieldcell';

import {EntryRowContext} from './entryrow'; 
import Check from '../input/check'; 



type Props = { 
  column: Column; 
} 
// FIELD READ =================================== 
export default function FieldRead({column}:Props) { 
  const {editableEntry, modeHook:{mode}} = useContext(EntryRowContext); 
  const {accessor, subtype, modeltype, options, format} = column; 

  const elemType = subtype === 'ObjectID' ? modeltype: subtype; 

  let toRender = <span>{JSON.stringify(editableEntry[accessor])}</span>; 
  if( column.IsObjectID() && !column.IsArray() ) { 
    const abbreviate = GetAbbreviate(modeltype, editableEntry[accessor]); 
    toRender = <span>{JSON.stringify(abbreviate.value)}</span>; 
  } 
  else if( column.IsArray() ) 
    toRender = <span>{elemType}x{editableEntry[accessor] ? editableEntry[accessor].length: 0}</span>; 
  else if( column.IsBoolean() ) 
    toRender = <Check ok={editableEntry[accessor]} />; 
  else if( column.IsBoolean() )
    toRender = <span>{''+ editableEntry[accessor] }</span>; 
  else if(column.IsMixed()) 
    toRender = <span>{JSON.stringify(editableEntry[accessor])}</span>; 
    
  return <td>{toRender}</td>; 
}