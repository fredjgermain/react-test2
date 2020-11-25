import React, { useContext } from 'react'; 
import {InputTableContext} from './inputtable'; 
import {InputRowContext} from './inputrow'; 


interface IInputRowBtn { 
  label?: string, 
  func?: (args:any) => void; 
} 

export default function InputTableBtn({label, func}:IInputRowBtn) { 
  const {entriesHook:{Entries, setEntries}, columnSettings, 
    activeEntryHook:{activeEntry,setActiveEntry}, 
    activeRowHook:{activeRow, setActiveRow},
    activeModeHook:{activeMode, setActiveMode}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  const RowIsActive = () => {return row != undefined && row === activeRow}; 

  const ActivateRow = (mode:string = 'read', row:number = -1) => { 
    const entry = Entries[row] ?? {}; 
    setActiveMode(mode); 
    setActiveRow(row); 
    setActiveEntry(entry); 
  } 

  const Delete = () => { 
    const newEntries = [...Entries]; 
    if(row != undefined) { 
      newEntries.splice(row,1); 
      console.log(newEntries); 
      setEntries(newEntries); 
    } 
  } 

  const Update = () => { 
    const newEntries = [...Entries]; 
    if(row != undefined) { 
      newEntries[row] = activeEntry; 
      setEntries(newEntries); 
    } 
  } 

  const Create = () => { 
    const newEntries = [...Entries]; 
    newEntries.push(activeEntry); 
    setEntries(newEntries); 
  } 

  if(row === -1 && activeMode !='create') 
    return <td> 
        <button onClick={() => {ActivateRow('create')}}>Create</button> 
      </td>
  
  if(row === -1 && activeMode==='create') 
    return <td> 
      <button onClick={() => {Create(); ActivateRow('read')}}>Confirm Create</button> 
      <button onClick={() => ActivateRow()}>Cancel Create</button> 
    </td> 

  /*if(RowIsActive() && activeMode==='create') 
    return <td> 
      <button onClick={() => {Create(); ActivateRow('read')}}>Confirm Create</button> 
      <button onClick={() => ActivateRow()}>Cancel Create</button> 
    </td> */
  
  if(RowIsActive() && activeMode==='update') 
    return <td> 
      <button onClick={() => {Update(); ActivateRow('read')}}>Confirm Update</button> 
      <button onClick={() => ActivateRow('read')}>Cancel Update</button> 
    </td> 

  if(RowIsActive() && activeMode==='delete') 
    return <td> 
      <button onClick={() => {Delete(); ActivateRow('read')}}>Confirm Delete</button> 
      <button onClick={() => ActivateRow('read')}>Cancel Delete</button> 
    </td> 
  
  return <td> 
      <button onClick={() => ActivateRow('update', row)}>Update</button> 
      <button onClick={() => ActivateRow('delete', row)}>Delete</button> 
    </td> 
}


