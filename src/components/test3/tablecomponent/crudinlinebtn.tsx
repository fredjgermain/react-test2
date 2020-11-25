import React, {useContext} from 'react'; 
import {CrudTableContext} from './crudtable'; 
import {CrudRowContext} from './crudrow'; 


// CRUDROWBTN ===================================
export default function CrudInlineBtn() { 
  const crudTableContext = useContext(CrudTableContext); 
  const {crudTable:{crudSettings:{Create, Delete, Update}}} = crudTableContext
  const {activeEntry:{entryHook, setEntryHook}} = crudTableContext; 

  const {entry, activeModeHook:{activeMode, setActiveMode}} = useContext(CrudRowContext); 
  
  async function Confirm(crudMethod:any) { 
    await crudMethod(entryHook); 
    if(activeMode === 'create') 
      ModeChange({} as IEntry, 'new'); 
    else 
      ModeChange({} as IEntry, 'read'); 
  } 

  function ModeChange(entry:IEntry, newMode:string) { 
    setEntryHook(entry); 
    setActiveMode(newMode); 
  } 

  // BTN ======================================== 
  function Btn() { 
    // confirm create 
    if(entryHook._id === entry._id && activeMode === 'create') 
      return <span>
        <button onClick={ () => Confirm(Create) }>Confirm Create</button> 
        <button onClick={ () => ModeChange({} as IEntry, 'new') }>Cancel create</button> 
      </span>; 
    
    // confirm update
    if(entryHook._id === entry._id && activeMode === 'update') 
      return <span> 
        <button onClick={ () => Confirm(Update) }>Confirm update</button> 
        <button onClick={ () => ModeChange({} as IEntry, 'read') }>Cancel update</button> 
      </span>; 

    // confirm delete
    if(entryHook._id === entry._id && activeMode === 'delete') 
      return <span> 
        <button onClick={ () => Confirm(Delete) }>Confirm delete</button> 
        <button onClick={ () => ModeChange({} as IEntry, 'read') }>Cancel delete</button> 
      </span>; 
    
    if(activeMode === 'new') 
      return <span> 
        <button onClick={ () => ModeChange(entry, 'create') }>Create</button> 
      </span>; 

    return <span> 
      <button onClick={ () => ModeChange(entry, 'update') }>Update</button> 
      <button onClick={ () => ModeChange(entry, 'delete') }>Delete</button> 
    </span>; 
  } 

  return <div> 
    {Btn()}
  </div> 
} 
