import React, { useState, useEffect } from 'react'; 
import RowData from './rowdata'; 
import THeader from './theader'; 
//import {IField, ICrudTable, IEntry, IRow} from './tableinterfaces'; 


interface ITableDataContext { 
  columnSettings: Array<IField>, 
  activeRowHook: { 
    activeRow: any, 
    setActiveRow: any, 
  } 
  activeModeHook: { 
    activeMode: string, 
    setActiveMode: any, 
  } 
  crud: ITableDataAction; 
} 
export const TableDataContext = React.createContext({} as ITableDataContext); 


// PROPS
interface Props { 
  columnSettings: IField[], 
  rows: any[], 
  crud: ITableDataAction; 
} 
// TableData ====================================
export default function TableData({columnSettings, rows, crud}:Props) { 
  console.log('Table'); 

  const [activeRow, setActiveRow] = useState({}); 
  const [activeMode, setActiveMode] = useState('read'); 

  const tableDataContext:ITableDataContext = { 
    columnSettings, 
    activeRowHook: {activeRow, setActiveRow}, 
    activeModeHook: {activeMode, setActiveMode}, 
    crud, 
  }; 

  return <TableDataContext.Provider value={tableDataContext} > 
    <div> 
      |{JSON.stringify(activeRow)}| 
    </div> 
    <div> 
      |{JSON.stringify(activeMode)}| 
    </div> 

    <table> 
      <THeader /> 
      <tbody> 
        {rows.map( (r,i) => { 
          return <RowData key={i} row={r} /> 
        })} 
      </tbody> 
      <tfoot> 
        <RowData mode={'new'} /> 
      </tfoot> 
    </table> 
  </TableDataContext.Provider> 
}

