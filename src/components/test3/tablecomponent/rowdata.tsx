import React, { useContext } from 'react'; 
import {TableDataContext} from './tabledata'; 



function GetDefaultEntry(columnSettings:Array<IField>, row?:any) {
  if(row) 
    return row; 
  let entry:any = {}; 
  columnSettings.forEach( c => {
    entry[c.accessor] = '' 
  }) 
  return entry; 
}

interface IRowData { 
  row?: any, 
  mode?: string, 
} 
// ROWDATA ======================================
export default function RowData({row, mode}:IRowData ) { 
  console.log('Row'); 
  const {columnSettings, activeModeHook:{activeMode}, activeRowHook:{activeRow, setActiveRow}} = useContext(TableDataContext); 

  const data = GetDefaultEntry(columnSettings, row); 

  function OnEdit(field:IField, newValue:any) { 
    const copy = {...activeRow}; 
    copy[field.accessor] = newValue; 
    setActiveRow({...copy}); 
  } 

  function DisplayMode (field:IField) { 
    //console.log(activeRow._id === row._id && editableMode.includes(activeMode)); 
    if(mode === 'new' && activeMode != 'create') 
      return <span></span> 

    if(activeRow._id === data._id && (activeMode === 'update' || activeMode === 'create') ) 
      return <span>{ field.cellMode.edit( 
        activeRow[field.accessor], 
        (newValue:any) => OnEdit(field, newValue) 
      )} 
      </span>; 
    return <span>{field.cellMode.read(data[field.accessor])} </span>; 
  } 
  
  return <tr> 
      {columnSettings.map( (c,i) => { 
        return <td key={i}> 
          {DisplayMode(c)} 
        </td>; 
      })} 
      <RowBtn row={data} mode={mode} /> 
    </tr> 
} 

// ROW BTN ======================================
export function RowBtn({row, mode}:IRowData) { 
  const {
    activeRowHook:{activeRow, setActiveRow}, 
    activeModeHook:{activeMode, setActiveMode}, 
    crud:{Create, Delete, Update} 
  } = useContext(TableDataContext); 

  function Confirm(crudMethod:any) { 
    crudMethod(activeRow); 
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


interface ICellData { 
  columnSetting: IField, 
  value: any, 
} 
export function CellData({columnSetting, value}:ICellData) { 
  return <td> 
      {columnSetting.cellMode.read(value)} 
    </td>; 
} 


