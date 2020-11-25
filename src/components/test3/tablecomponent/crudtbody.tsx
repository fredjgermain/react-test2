import React, {useContext} from 'react'; 
import {CrudTableContext} from './crudtable'; 
import CrudRow from './crudrow'; 

interface ICrudTBody { 
  entries:IEntry[] 
} 
// CRUDTBODY ====================================
export default function CrudTBody({entries}:ICrudTBody) { 
  const crudTableContext = useContext(CrudTableContext); 
  //const {columnSettings} = crudTableContext.crudTable; 

  return <tbody> 
    {entries.map( (r,i) => { 
      return <CrudRow key={i} entry={r} /> 
    })} 
  </tbody>; 
} 



/*

*/

/* 
activeEntry: 
activemode: 
funcs: Func[] 
  [ 
    { 
      btnLabel: => <button>{label}</button> ... or ... <a href=...>{label}</a> 
      action: ... change mode and or Crud 
    } 
  ] 
*/



