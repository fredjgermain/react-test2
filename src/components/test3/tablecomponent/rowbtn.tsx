import React, { useContext } from 'react'; 
import {TableDataContext} from './tabledata'; 
import {IRowData} from './rowdata'; 

// ROW BTN ======================================
export default function RowBtn({row, mode}:IRowData) { 
  const {
    activeRowHook:{activeRow, setActiveRow}, 
    activeModeHook:{activeMode, setActiveMode}, 
    crud:{Create, Delete, Update} 
  } = useContext(TableDataContext); 

  async function Confirm(crudMethod:any) { 
    await crudMethod(activeRow); 
    if(activeMode === 'create') 
      ModeChange({}, 'new'); 
    else 
      ModeChange({}, 'read'); 
  } 

  function ModeChange(row:any, newMode:string) { 
    setActiveRow(row); 
    setActiveMode(newMode); 
  } 

  // BTN ======================================== 
  function Btn() { 
    // confirm create 
    if(activeRow._id === row._id && activeMode === 'create') 
      return <span>
        <button onClick={ () => Confirm(Create) }>Confirm Create</button> 
        <button onClick={ () => ModeChange({}, 'read') }>Cancel create</button> 
      </span>; 
    
    // confirm update
    if(activeRow._id === row._id && activeMode === 'update') 
      return <span>
        <button onClick={ () => Confirm(Update) }>Confirm update</button> 
        <button onClick={ () => ModeChange({}, 'read') }>Cancel update</button> 
      </span>; 

    // confirm delete
    if(activeRow._id === row._id && activeMode === 'delete') 
      return <span> 
        <button onClick={ () => Confirm(Delete) }>Confirm delete</button> 
        <button onClick={ () => ModeChange({}, 'read') }>Cancel delete</button> 
      </span>; 
    
    if(mode === 'new') 
      return <span> 
        <button onClick={ () => ModeChange(row, 'create') }>Create</button> 
      </span>; 

    return <span> 
      <button onClick={ () => ModeChange(row, 'update') }>Update</button> 
      <button onClick={ () => ModeChange(row, 'delete') }>Delete</button> 
    </span>; 
  } 

  // RENDER -------------------------------------
  return <td>{Btn()}</td>; 
} 