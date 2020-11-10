import React, {useEffect, useState} from 'react'; 

type Props = { 
  value: Boolean; 
  setValue: any; 
  useref?: any; 
  attributes?: any; 
} 

// Input Boolean ================================
export default function InputBoolean({value, setValue, useref, attributes}:Props) { 
  
  function Onchange(newValue:any) { 
    setValue(newValue); 
  } 

  return <span>
    <input type="checkbox" checked={value} ref={useref} 
      onChange={(event) => {Onchange(event.target.checked)}} 
      {...attributes} /> 
  </span>; 
} 