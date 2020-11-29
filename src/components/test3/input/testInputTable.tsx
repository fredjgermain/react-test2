import React, {useState, useRef} from 'react'; 
import {IInput, IOption, InputData, InputNumber, InputBool, 
  InputString, InputSelect, InputArray, EnumType} from './inputcommon'; 
import InputTable, {IColumnSetting, IColumnSettings, ITableHook} from './inputtable/inputtable'; 
import {InputHeaderRow, InputHeader} from './inputtable/inputtableheader'; 
import InputRows, {InputRow} from './inputtable/inputrow'; 
import InputCells from './inputtable/inputcells'; 
import InputRowBtn, {CreateBtn, UpdateDeleteBtn} from './inputtable/inputbtn/inputrowbtn'; 
import {usePage, IPageHook} from '../customhooks/usePage'; 


export default function TestInputTable() { 

  const ifields: IField[] = [
    {
      accessor:'_id', 
      label:'ID', 
      defaultValue: '', 
      type:'string', 
      format:'', 
      subtype:'', 
      modeltype:'', 
      options:{}, 
    },
    {
      accessor:'v1', 
      label:'Var1', 
      defaultValue: 0, 
      type:'number', 
      format:'', 
      subtype:'', 
      modeltype:'', 
      options:{}, 
    },
    {
      accessor:'v2', 
      label:'Var2', 
      defaultValue: 0, 
      type:'number', 
      format:'', 
      subtype:'', 
      modeltype:'', 
      options:{}, 
    }
  ]
  const tableData:IEntry[] = [
    {_id:'1', v1:1, v2:2},
    {_id:'2', v1:5, v2:9},
    {_id:'3', v1:4, v2:8},
    {_id:'4', v1:6, v2:10},
    {_id:'5', v1:3, v2:12},
    {_id:'6', v1:6, v2:10},
    {_id:'7', v1:4, v2:12},
    {_id:'8', v1:6, v2:6},
    {_id:'9', v1:3, v2:8},
    {_id:'10', v1:6, v2:1},
    {_id:'11', v1:3, v2:4},
  ]; 
  const [tableEntries, setTableEntries] = useState(tableData); 
  
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(tableEntries, 5); 
  const page = tableEntries.slice(from, to); 

  const emptyfunc = (ifield:IField, value:any, onSendValue:any) => {return <span></span>}; 
  const readfunc = (ifield:IField, value:any, onSendValue:any) => {return <span>{value}</span>}; 
  const editfunc = (ifield:IField, value:any, onSendValue:any) => {return <InputData {...{value, onSendValue}} />}; 


  // Colsettings Empty ----------------------------------
  const colsettingsEmpty:IColumnSettings = {columnSettings:
    [ 
      {ifield:ifields[0], renderFunc:emptyfunc}, 
      {ifield:ifields[1], renderFunc:emptyfunc}, 
      {ifield:ifields[2], renderFunc:emptyfunc}, 
    ] as IColumnSetting[] 
  } 

  // Colsettings Read ---------------------------
  /*const predicateReadable = (tableHook:ITableHook, row?:number) => { 
    return tableHook.GetActiveHook(row) === 'read'; 
  }; */

  const colsettingsRead:IColumnSettings = {
    //predicate: predicateReadable, 
    columnSettings: 
    [ 
      {ifield:ifields[0], renderFunc:readfunc}, 
      {ifield:ifields[1], renderFunc:readfunc}, 
      {ifield:ifields[2], renderFunc:readfunc}, 
    ] as IColumnSetting[] 
  } 

  // Colsettings Edit ---------------------------
  const predicateEditable = (tableHook:ITableHook, row?:number) => { 
    return tableHook.GetActiveHook(row) === 'update' || tableHook.GetActiveHook(row) === 'create'; 
  }; 

  const colsettingsEdit:IColumnSettings = { 
    predicate: predicateEditable, 
    columnSettings: [ 
      {ifield:ifields[0], renderFunc:editfunc}, 
      {ifield:ifields[1], renderFunc:editfunc}, 
      {ifield:ifields[2], renderFunc:editfunc}, 
    ] as IColumnSetting[] 
  } 
  const colsettings = [colsettingsRead, colsettingsEdit, colsettingsEmpty]; 


  // CRUD functionality
  const createLabel = {action:'Create', confirm:'Confirm create', cancel:'Cancel create'}; 
  const onCreate = async (entry:any) => { 
    const entries = [...tableEntries]; 
    const index = entries.findIndex(e => e._id === entry._id); 
    if(index >= 0) 
      return false; 
    entries.push(entry); 
    setTableEntries(entries); 
    return true; 
  }; 
  const updateLabel = {action:'Update', confirm:'Confirm update', cancel:'Cancel update'}; 
  const onUpdate = async (entry:any) => { 
    const entries = [...tableEntries]; 
    const index = entries.findIndex(e => e._id === entry._id); 
    if(index >= 0)  { 
      entries[index] = entry; 
      setTableEntries(entries); 
      return true; 
    } 
    return false; 
  }; 
  const deleteLabel = {action:'Delete', confirm:'Confirm delete', cancel:'Cancel delete'}; 
  const onDelete = async (entry:any) => { 
    const entries = [...tableEntries]; 
    const index = entries.findIndex(e => e._id === entry._id); 
    if(index >= 0)  { 
      entries.splice(index, 1); 
      setTableEntries(entries); 
      return true; 
    } 
    return false; 
  }; 


  // <InputRowBtn {...{onCreate, onDelete, onUpdate}}/> 
  return <div> 
    <h4>Input table:</h4> 
    <InputTable entries={page} columnSettings={colsettings} > 
      <thead>
        <InputHeaderRow>
          <InputHeader /><th>BTN</th>
        </InputHeaderRow>
      </thead>
      <tbody> 
        <InputRows> 
          <InputCells /> 
          <UpdateDeleteBtn {...{updateLabel, deleteLabel, onUpdate, onDelete}}  />
          
        </InputRows> 
      </tbody> 
      <tfoot> 
        <InputRow row={-1}> 
          <InputCells /> 
          <CreateBtn {...{label:createLabel, onCreate}} /> 
        </InputRow> 
      </tfoot> 
    </InputTable> 
    <Paging {...{pageIndex, setPageIndex, from, to, pageIndexes}} />
  </div> 
}

function Paging({from, to, pageIndex, setPageIndex, pageIndexes}:IPageHook) { 
  return <div>
    {pageIndexes.map( (p, i) => { 
      return <button key={i} onClick={() => setPageIndex(i)}>{i+1}</button> 
    })} 
  </div>
}