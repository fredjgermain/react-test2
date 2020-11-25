import React, { useState, useEffect } from 'react'; 
import RowData from './rowdata'; 
import THeader from './theader'; 
//import {IField, ICrudTable, IEntry, IRow} from './tableinterfaces'; 


interface ITableDataContext { 
  cols: Array<IField>, 
  activeRowHook: { 
    activeRow: any, 
    setActiveRow: any, 
  } 
  activeModeHook: { 
    activeMode: string, 
    setActiveMode: any, 
  } 
  crud: ICrudSettings; 
} 
export const TableDataContext = React.createContext({} as ITableDataContext); 


// PROPS
interface Props { 
  cols: IField[], 
  rows: any[], 
  crud: ICrudSettings; 
} 
// TableData ====================================
export default function TableData({cols, rows, crud}:Props) { 
  console.log('render: Table'); 
  console.log(rows[0]._id); 

  const [activeRow, setActiveRow] = useState({}); 
  const [activeMode, setActiveMode] = useState('read'); 

  const tableDataContext:ITableDataContext = { 
    cols: cols, 
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

