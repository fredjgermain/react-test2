import React, {useContext} from 'react'; 
/*import {AdminContext} from './adminsection'; 
import TableSetter from '../common/tableSetter'; 
import {fieldFormatMappers} from '../businesslogic/fieldformatList'; 
import CrudTable from '../tablecomponent/crudtable'; 
import CrudRow from '../tablecomponent/crudrow'; 
//import CrudTBody from '../tablecomponent/crudtbody'; 
import CrudHeader from '../tablecomponent/crudheader'; 

/* 
- Pager 
- CrudTable */

export default function AdminTable() { 
  /*const {dao, activeCollection} = useContext(AdminContext); 

  // data
  const datas = activeCollection.entries; 
  // default Table Settings 
  const tableSetter = new TableSetter(dao, activeCollection); 
  // default column Settings 
  const columnSettings = tableSetter.GetColumnSettings(); 
  // field formats 
  const fieldFormats = tableSetter.GetFieldsFormat(columnSettings, fieldFormatMappers); 
  // default crud Settings
  const crudSettings = tableSetter.GetCrudSettings(); 
  const emptyEntry = dao.GetEmptyEntry(activeCollection); 
  //console.log([fieldFormats, columnSettings, crudSettings]); 


  // RENDER -------------------------------------
  return <div> 
    <h4>{activeCollection.label}</h4> 
    <CrudTable {...{datas, fieldFormats, columnSettings, crudSettings}} > 
      <CrudHeader /> 
      <tbody>
        {datas.map( (r,i) => { 
          return <CrudRow key={i} entry={r} /> 
        })} 
      </tbody> 
      <tfoot> 
        <CrudRow entry={emptyEntry} mode={'new'} /> 
      </tfoot> 
      
    </CrudTable> 
  </div>*/
  return <div></div>; 
}

// <CrudTBody {...{entries:datas}} /> */