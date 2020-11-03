import React, { useState, useEffect, useContext } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IEntry, EnumMode} from '../proxy/interfaces'; 
import {collections} from '../proxy/proxy'; 


//import {ActiveCollectionContext} from '../collections/collections'; 
import {EntryRowContext} from './entryrow'; 

import Selector, {IOption} from '../input/selector'; 
/*import { IColumn } from '../../typescriptversion/proxy/ccollection'; 

type Props = { 
  column:IColumn; 
  onChange: any; 
} 
// FIELD ========================================
export default function EditObjectID({column, onChange}:Props) { 
  //const {columns} = useContext(ActiveCollectionContext); 
  const {editableEntry, modeHook:{mode}} = useContext(EntryRowContext); 
  const {type, subtype, modeltype, options} = column; 

  // Get options from foreign collections 
  const foreignCollection = collections.find(c => c.accessor === modeltype); 
  // Pick first col or main col ?? 
  const firstcol = foreignCollection?.columns[0].accessor ?? ''; 
  const selectorOptions:Array<IOption> = foreignCollection? foreignCollection.data.map( e => { 
    return {value: e._id, label: e[firstcol]}; 
  }): []; 

  // render -------------------------------------
  return <Selector selected={editableEntry[column.accessor]} options={selectorOptions} setSelected={onChange} /> 
}*/