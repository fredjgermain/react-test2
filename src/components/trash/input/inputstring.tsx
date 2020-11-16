import React, {useEffect, useState} from 'react'; 
import Check from './check'; 


type Props = { 
  value: string; 
  setValue: any; 
  useref?: any; 
  attributes?: any; 
  checkDisplay?: boolean; 
  validation?: any; 
} 
// Input String =================================
export default function InputString({value, setValue, useref, 
    attributes, checkDisplay=false, 
    validation=(str:string) => true}:Props) { 

  const [ok, setOk] = useState(validation(value)); 

  function Onchange(newValue:string) { 
    console.log(newValue); 
    setValue(newValue); 
    setOk(validation(newValue)); 
  } 

  return <span>
    <input type={'text'} value={value} ref={useref} 
      onChange={(event) => {Onchange(event.target.value)}} 
      {...attributes} /> 
    {checkDisplay && <Check ok={ok} />}
  </span>; 
} 