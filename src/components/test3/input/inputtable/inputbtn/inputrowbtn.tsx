import React, { useContext } from 'react'; 
import {InputTableContext} from '../inputtable'; 
import {InputRowContext} from '../inputrow'; 
import {CrudFunc} from '../inputtablehook';


// INPUT ROW BTN ================================
interface IInputRowBtn { 
  label?: string; 
  onCreate: CrudFunc; 
  onUpdate: CrudFunc; 
  onDelete: CrudFunc; 
} 
export default function InputRowBtn({label, onCreate, onUpdate, onDelete}:IInputRowBtn) { 
  const {tableHook:{CrudAction, GetActiveMode, ActivateHook}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  // RENDER -------------------------------------
  if(row === -1 && GetActiveMode(row) !='create') 
    return <td> 
        <button onClick={() => {ActivateHook('create', row)}}>Create</button> 
      </td>
  
  if(row === -1 && GetActiveMode(row) ==='create') 
    return <td> 
      <button onClick={() => CrudAction(onCreate)}>Confirm Create</button> 
      <button onClick={() => ActivateHook()}>Cancel Create</button> 
    </td> 
  
  if(GetActiveMode(row) ==='update') 
    return <td> 
      <button onClick={() => CrudAction(onUpdate)}>Confirm Update</button> 
      <button onClick={() => ActivateHook()}>Cancel Update</button> 
    </td> 

  if(GetActiveMode(row) ==='delete') 
    return <td> 
      <button onClick={() => CrudAction(onDelete)}>Confirm Delete</button> 
      <button onClick={() => ActivateHook()}>Cancel Delete</button> 
    </td> 
  
  return <td> 
      <button onClick={() => ActivateHook('update', row)}>Update</button> 
      <button onClick={() => ActivateHook('delete', row)}>Delete</button> 
    </td> 
}


