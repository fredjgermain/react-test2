import React, {useState} from 'react'; 

// INPUT TABLE
import {IOption} from './input/inputcommon'; 
import InputTable, {IForeignDao, ColumnSetter} from './inputtable/inputtable'; 
import {InputHeader, InputHeaderRow} from './inputtable/inputtableheader'; 
import {CreateBtn, UpdateDeleteBtn} from './inputtable/inputrowbtn'; 
import {InputRows, InputRow} from './inputtable/inputrows'; 
import {InputCells, InputCell} from './inputtable/inputcells'; 

import './inputtable/table.css'; 

// PAGE 
import {usePage, IPageHook} from '../customhooks/customhooks'; 

// MOCK DATA 
import {dao} from './testinputtable_data'; 
import {ColumnSettingRules} from './testinputtable_businesslogic'; 



// TEST INPUT TABLE
export default function TestInputTable() { 
  const activeCollection = dao.GetICollection('collection1') as ICollection; 
  const [tableEntries, setTableEntries] = useState(activeCollection?.entries ?? []); 
  const {pageIndex, setPageIndex, from, to, pageIndexes} = usePage(tableEntries, 5); 
  const page = Array.from({length: to-from}, (v, k) => k+from); 

  // ============================================
  const Dao:IForeignDao = { 
    Create: async (entry:any):Promise<boolean> => { 
      const entries = [...tableEntries]; 
      const index = entries.findIndex(e => e._id === entry._id); 
      if(index >= 0) 
        return false; 
      entries.push(entry); 
      setTableEntries(entries); 
      return true; 
    }, 
    
    Update: async (entry:any):Promise<boolean> => { 
      const entries = [...tableEntries]; 
      const index = entries.findIndex(e => e._id === entry._id); 
      if(index >= 0)  { 
        entries[index] = entry; 
        setTableEntries(entries); 
        return true; 
      } 
      return false; 
    }, 

    Delete: async (entry:any):Promise<boolean> => { 
      const entries = [...tableEntries]; 
      const index = entries.findIndex(e => e._id === entry._id); 
      if(index >= 0)  { 
        entries.splice(index, 1); 
        setTableEntries(entries); 
        return true; 
      } 
      return false; 
    }, 

    GetForeignOptions: (ifield:IField):IOption[] => { 
      return dao.GetForeignOptions(ifield); 
    }, 

    GetForeignValue: (ifield:IField, id:string) => { 
      return dao.GetForeignValue(ifield, id); 
    }, 
  }; 

  const colSetter = new ColumnSetter(); 
  const columnSettings = colSetter.BuildColumnSettings(Dao, activeCollection.ifields, ColumnSettingRules); 

  // CRUD functionality
  const createLabel = {action:'Create', confirm:'Confirm create', cancel:'Cancel create'}; 
  const onCreate = Dao.Create; 
  const updateLabel = {action:'Update', confirm:'Confirm update', cancel:'Cancel update'}; 
  const onUpdate = Dao.Update; 
  const deleteLabel = {action:'Delete', confirm:'Confirm delete', cancel:'Cancel delete'}; 
  const onDelete = Dao.Delete; 

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
          <CreateBtn {...{createLabel, onCreate}} /> 
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
