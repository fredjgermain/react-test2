import React, { useContext } from 'react'; 
import {InputTableContext} from '../inputtable'; 
import {InputRowContext} from '../inputrow'; 



type crudFunc = (entry:IEntry) => boolean; 

interface IInputRowBtn { 
  label?: string; 
  onCreate: crudFunc; 
  onUpdate: crudFunc; 
  onDelete: crudFunc; 
} 

export default function InputTableBtn({label, onCreate, onUpdate, onDelete}:IInputRowBtn) { 
  const {tableHook:{activeEntry, GetActiveMode, ActivateHook, ResetActiveHooks}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  const Confirm = (func:crudFunc) => { 
    if(func(activeEntry)) 
      ResetActiveHooks(); 
  }; 

  // RENDER -------------------------------------
  if(row === -1 && GetActiveMode(row) !='create') 
    return <td> 
        <button onClick={() => {ActivateHook('create', row)}}>Create</button> 
      </td>
  
  if(row === -1 && GetActiveMode(row) ==='create') 
    return <td> 
      <button onClick={() => Confirm(onCreate)}>Confirm Create</button> 
      <button onClick={() => ActivateHook()}>Cancel Create</button> 
    </td> 
  
  if(GetActiveMode(row) ==='update') 
    return <td> 
      <button onClick={() => Confirm(onUpdate)}>Confirm Update</button> 
      <button onClick={() => ActivateHook()}>Cancel Update</button> 
    </td> 

  if(GetActiveMode(row) ==='delete') 
    return <td> 
      <button onClick={() => Confirm(onDelete)}>Confirm Delete</button> 
      <button onClick={() => ActivateHook()}>Cancel Delete</button> 
    </td> 
  
  return <td> 
      <button onClick={() => ActivateHook('update', row)}>Update</button> 
      <button onClick={() => ActivateHook('delete', row)}>Delete</button> 
    </td> 
}


