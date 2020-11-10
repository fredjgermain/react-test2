import React, {useState} from 'react'; 
import Check from './check'; 


type Props = { 
  value: number; 
  setValue: any; 
  useref?: any; 
  attributes?: any; 
  checkDisplay?: boolean; 
  validation?: any; 
} 
// Input String =================================
export default function InputNumber({value, setValue, useref, 
    attributes, checkDisplay=false, 
    validation=(num:number) => true}:Props) { 

  const [ok, setOk] = useState(validation(value)); 

  function Onchange(newValue:number) { 
    setValue(newValue); 
    setOk(validation(newValue)); 
  } 

  //style={{width:"3em"}} 

  return <span> 
    <input type={'number'} value={value} ref={useref} 
      onChange={(event) => {Onchange(Number(event.target.value))}} 
      {...attributes} 
      /> 
    {checkDisplay && <Check ok={ok} />}
  </span>; 
} 