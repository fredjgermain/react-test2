import React, {useContext} from 'react'; 
import {CrudTableContext} from './crudtable'; 
import {CrudRowContext} from './crudrow'; 


interface ICrudCell { 
  ifield: IField; 
  value: any; 
} 
// CRUDCELL ======================================
export default function CrudCell({ifield, value}:ICrudCell) { 
  const {activeEntry:{entryHook,setEntryHook}, crudTable:{fieldFormats}} = useContext(CrudTableContext); 
  const {activeModeHook:{activeMode}} = useContext(CrudRowContext); 
  
  const setValue = (newValue:any) => { 
    const modEntry = {...entryHook}; 
    modEntry[ifield.accessor] = newValue; 
    setEntryHook(modEntry); 
  }

  // setValue is yet to be defined ... 
  const {readFunc, editFunc} = fieldFormats.find( format => format.ifield.accessor === ifield.accessor ) ?? {} as IFieldFormat; 
  /*if(ifield.accessor==='inlinecrud') 
    console.log(readFunc); */ 
  const editable = activeMode === 'create' || activeMode === 'update'; 

  if(!editable  && readFunc) 
    return <td>{readFunc(ifield, value)}</td> 
  if(editable && editFunc) { 
    return <td>{editFunc(ifield, entryHook[ifield.accessor], setValue)}</td> 
  }
    
  return <td>{JSON.stringify(value)}</td> 
}