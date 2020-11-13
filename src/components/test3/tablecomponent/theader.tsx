import React, { useContext } from 'react'; 
import {TableDataContext} from './tabledata'; 


export default function THeader() { 
  //console.log('THeader'); 
  const {cols: columnSettings, activeModeHook, activeRowHook} = useContext(TableDataContext); 

  return <thead> 
    <tr> 
      {columnSettings.map( (c,i) => { 
        return <th key={i}> 
          {c.accessor} 
        </th>; 
      })} 
      <th> 
        BTN 
      </th> 
    </tr> 
  </thead>; 
} 