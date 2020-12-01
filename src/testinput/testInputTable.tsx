import React, {useState} from 'react'; 

// INPUT TABLE
import InputTable from './inputtable/inputtable'; 
import {InputHeader, InputHeaderRow} from './inputtable/inputtableheader'; 
import {CreateBtn, UpdateDeleteBtn} from './inputtable/inputrowbtn'; 
import {InputRows, InputRow} from './inputtable/inputrows'; 
import {InputCells, InputCell} from './inputtable/inputcells'; 
import './inputtable/table.css'; 

// PAGE 
import {usePage, IPageHook} from '../customhooks/customhooks'; 

// MOCK DATA 
import {data, columnSettings} from './testinputtable_businesslogic'; 



export default function TestInputTable() { 
  const [tableEntries, setTableEntries] = useState(data); 
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(tableEntries, 5); 
  const page = Array.from({length: to-from}, (v, k) => k+from); 

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
    <InputTable entries={tableEntries} columnSettings={columnSettings} > 
      <thead>
        <InputHeaderRow>
          <InputHeader /><th>BTN</th>
        </InputHeaderRow>
      </thead>
      <tbody> 
        <InputRows rows={page}> 
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
      return <button key={i} onClick={() => setPageIndex(i)} disabled={pageIndex===i} >
          {i+1}
        </button> 
    })} 
  </div>
}