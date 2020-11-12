import React, { useContext } from 'react'; 
import {TableDataContext} from './tabledata'; 
import RowBtn from './rowbtn'; 


function GetDefaultEntry(ifields:Array<IField>, row?:any) {
  if(row) 
    return row; 
  let entry:any = {}; 
  ifields.forEach( f => { 
    entry[f.accessor] = f.defaultValue; 
  }) 
  return entry; 
}

export interface IRowData { 
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



/*
interface ICellData { 
  columnSetting: IField, 
  value: any, 
} 
export function CellData({columnSetting, value}:ICellData) { 
  return <td> 
      {columnSetting.cellMode.read(value)} 
    </td>; 
} 
*/

