import React, {useState, useRef} from 'react'; 
import {IInput, IOption, InputData, InputNumber, InputBool, 
  InputString, InputSelect, InputArray, EnumType} from './inputcommon'; 
import InputTable, {IColumnSetting} from './inputtable/inputtable'; 
import InputRows, {InputRow} from './inputtable/inputrow'; 
import InputCells from './inputtable/inputcells'; 
import InputRowBtn from './inputtable/inputbtn/inputrowbtn'; 
import {usePage, IPageHook} from '../customhooks/usePage'; 


export default function TestInputTable() { 

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

  const readfunc = (value:any, onSendValue:any) => {return <span>{value}</span>}; 
  const editfunc = (value:any, onSendValue:any) => {return <InputData {...{value, onSendValue}} />}; 

  const colsettingsRead = [ 
    {field:'_id', defaultValue:'', renderFunc:readfunc}, 
    {field:'v1', defaultValue:0, renderFunc:readfunc}, 
    {field:'v2', defaultValue:0, renderFunc:readfunc}, 
  ] as IColumnSetting[]; 

  const colsettingsEdit = [ 
    {field:'_id', defaultValue:'', renderFunc:editfunc}, 
    {field:'v1', defaultValue:0, renderFunc:editfunc}, 
    {field:'v2', defaultValue:0, renderFunc:editfunc}, 
  ] as IColumnSetting[]; 
  const colsettings = {read:colsettingsRead, edit:colsettingsEdit}; 

  // CRUD functionality
  const onCreate = (entry:any) => { 
    const entries = [...tableEntries]; 
    const index = entries.findIndex(e => e._id === entry._id); 
    if(index >= 0) 
      return false; 
    entries.push(entry); 
    setTableEntries(entries); 
    return true; 
  }; 
  const onUpdate = (entry:any) => { 
    const entries = [...tableEntries]; 
    const index = entries.findIndex(e => e._id === entry._id); 
    console.log('Update '+index); 
    if(index >= 0)  { 
      console.log(entries[index]); 
      entries[index] = entry; 
      console.log(entries[index]); 
      setTableEntries(entries); 
      return true; 
    } 
    return false; 
  }; 
  const onDelete = (entry:any) => { 
    const entries = [...tableEntries]; 
    const index = entries.findIndex(e => e._id === entry._id); 
    if(index >= 0)  { 
      entries.splice(index, 1); 
      setTableEntries(entries); 
      return true; 
    } 
    return false; 
  }; 

  return <div> 
    <h4>Input table:</h4> 
    <InputTable entries={page} columnSettings={colsettings} > 
      <tbody> 
        <InputRows> 
          <InputCells /> 
          <InputRowBtn {...{onCreate, onDelete, onUpdate}}/> 
        </InputRows> 
      </tbody> 
      <tfoot> 
        <InputRow row={-1}> 
          <InputCells /> 
          <InputRowBtn {...{onCreate, onDelete, onUpdate}}/> 
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