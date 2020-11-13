import React, { useState, useContext } from 'react'; 
import {AdminContext} from './admincontexter'; 
import Selector, { IOption } from '../input/selector'; 
import AdminTable from './admintable'; 

import '../common/table.css'; 

// select a collection accessor 
// COLLECTION SELECTOR ==========================
export default function CollectionSelector() { 
  const adminContext = useContext(AdminContext); 
  const {dao} = adminContext; 
  // Selector 
  const [selected, setSelected] = useState(adminContext.selectedCollection); 
  const options = dao.collections.map( c => { 
    return {value:c.icollection.accessor, label:c.icollection.label} as IOption; 
  }) 
  const selector = <Selector selected={selected} setSelected={setSelected} options={options} /> 
  adminContext.selectedCollection = selected; 

  // RENDER -------------------------------------
  return <div> 
    <h1>Admin section</h1> 
    <p>Choose a collection</p> 
    <span>Collection: {selector}</span> 
    <hr/> 
    <AdminTable /> 
  </div>; 
} 