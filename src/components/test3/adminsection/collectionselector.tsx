import React, { useState, useContext } from 'react'; 
import {AdminContext} from './admincontexter'; 
//import Selector, { IOption } from '../input/selector'; 
import AdminTable from './admintable'; 
import { IOption, InputSelect } from '../input/inputcommon'; 

import '../common/table.css'; 

// COLLECTION SELECTOR ==========================
export default function CollectionSelector() { 
  const adminContext = useContext(AdminContext); 
  const {dao} = adminContext; 
  
  // Selector 
  const [selected, setSelected] = useState<Array<string>>(adminContext.selectedCollection ? [adminContext.selectedCollection]: []); 
  const options:IOption[] = dao.collections.map( c => { 
    return {value:c.icollection.accessor, label:c.icollection.label} as IOption; 
  }) 
  //console.log(selected); 
  if(selected[0]) 
    adminContext.selectedCollection = selected[0]; 

  // RENDER -------------------------------------
  return <div> 
    <h1>Admin section</h1> 
    <p>Choose a collection</p> 
    <span> 
      Collection: <InputSelect value={selected} options={options} onSendValue={setSelected} /> 
    </span> 
    <hr/> 
    <AdminTable /> 
  </div>; 
} 