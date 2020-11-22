import React, {useContext} from 'react'; 
import {AdminContext} from './adminsection'; 
import CellFormatter from '../formatter/cellformatter'; 
import ColumnSetter from '../formatter/columnsetter'; 
import CrudSetter from '../formatter/crudsetter';

/* 
- Pager 
- CrudTable 
*/
export default function AdminTable() { 
  const {dao, activeCollection} = useContext(AdminContext); 
  
  // default CellFormatter 
  const cellFormatter = new CellFormatter(dao, activeCollection); 
  const cellFormats = cellFormatter.GetFieldsFormat(); 
  
  // default Column Settings
  const ifieldSetting = ColumnSetter.GetColumnSettings(activeCollection.fields); 

  // default CrudSetter 
  const crudSetter = new CrudSetter(dao, activeCollection); 
  const crudSettings = crudSetter.GetCrudSettings(); 


  // RENDER -------------------------------------
  return <div> 
    <h4>{activeCollection.label}</h4> 

  </div>
}