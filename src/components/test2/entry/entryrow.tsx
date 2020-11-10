import React, { useState, useEffect, useContext } from 'react'; 
import {TableContext} from '../collections/collectiontable'; 
import EntryBtn from './entrybtn'; 


interface Props{ 
  row?: any; 
} 
export default function EntryRow({row}:Props) { 
  console.log('row'); 
  const {entryHook, modeHook} = useContext(TableContext); 

  //""+(row === entryHook.activeEntry); 

  // data .......................................
  let mode = <span>NEW ... </span>; 
  if(row && row === entryHook.activeEntry) 
    mode = <span>{modeHook.activeMode}</span>; 

  // data .......................................
  let data = <span>NEW ... </span>; 
  if(row)
    data = <span>{JSON.stringify(row)} </span>; 

  // RENDER -------------------------------------
  return <tr> 
    <td>{mode}</td> 
    <td>{data}</td> 
    <EntryBtn row={row} /> 
  </tr> 
}
