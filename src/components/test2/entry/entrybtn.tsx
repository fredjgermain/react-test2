import React, { useState, useEffect, useContext } from 'react'; 
import {TableContext} from '../collections/collectiontable'; 


interface Props{ 
  row: any; 
} 
export default function EntryBtn({row}:Props) { 
  const {entryHook, modeHook} = useContext(TableContext); 


  /* When content of a row changes, either because of collection selected changed, data changed, or page changed, */
  useEffect(() => { 
    console.log('row changed'); 
  }, [row]) 

  const CreateMode = () => { 
    entryHook.setActiveEntry(row); 
    modeHook.setActiveMode('delete'); 
  }
  const ReadMode = () => { 
    entryHook.setActiveEntry({}); 
    modeHook.setActiveMode('read'); 
  }
  const NewMode = () => { 
    entryHook.setActiveEntry({}); 
    modeHook.setActiveMode('new'); 
  }
  const UpdateMode = () => { 
    entryHook.setActiveEntry(row); 
    modeHook.setActiveMode('update'); 
  }
  const DeleteMode = () => { 
    entryHook.setActiveEntry(row); 
    modeHook.setActiveMode('delete'); 
  }
  

  // RENDER -------------------------------------
  return <td> 
    <button onClick={CreateMode}>Create</button> 
    <button onClick={ReadMode}>Read</button> 
    <button onClick={NewMode}>New</button> 
    <button onClick={UpdateMode}>Update</button> 
    <button onClick={DeleteMode}>Delete</button> 
  </td> 
}