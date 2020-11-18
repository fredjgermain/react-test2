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
  const [selected, setSelected] = useState(adminContext.selectedCollection); 
  const options = dao.collections.map( c => { 
    return {value:c.icollection.accessor, label:c.icollection.label} as IOption; 
  }) 
  console.log(selected); 

  const [testSelected, setTestSelected] = useState([0]); 
  const testOptions:IOption[] = [ 
    {value:0, label:'valeur 1'}, 
    {value:1, label:'valeur 2'}, 
    {value:2, label:'valeur 3'}, 
    {value:3, label:'valeur 4'}, 
    {value:4, label:'valeur 5'}, 
    {value:5, label:'valeur 6'}, 
  ]; 

  /*const singleselector = 
    <Selector2 selected={[]} options={testOptions} onChange={ (newValue:any) => console.log(newValue) } /> */
  const multiselector = 
    <InputSelect value={[]} options={testOptions} isMulti onSendValue={ (newValue:any) => console.log(newValue) } />

  const selector = <div> 
      <select name="cars" id="cars" onChange={(event) => {setSelected(event?.target.value); }} multiple={false} > 
        {options.map( (o,i) => { 
          return <option key={i} value={o.value}>{o.label}</option> 
        })} 
      </select> 
    </div> 
  /*<Selector selected={selected} setSelected={setSelected} options={options} /> */
  
  adminContext.selectedCollection = selected; 

  // RENDER -------------------------------------
  return <div> 
    <div>{multiselector}</div> 
    
    
    <h1>Admin section</h1> 
    <p>Choose a collection</p> 
    <span>Collection: {selector}</span> 
    <hr/> 
    <AdminTable /> 
  </div>; 
} 