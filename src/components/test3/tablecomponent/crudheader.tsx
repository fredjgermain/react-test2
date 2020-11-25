import React, {useContext} from 'react'; 
import {CrudTableContext} from './crudtable'; 

// CRUDHEADER ===================================
export default function CrudHeader() { 
  const {columnSettings} = useContext(CrudTableContext).crudTable; 

  return <thead><tr> 
    {columnSettings.map( (c,i) => { 
      return <th key={i} >{c.label}</th> 
    })} 
    </tr></thead>
}

