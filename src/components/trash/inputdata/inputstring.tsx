import React, {useState} from 'react'; 
import Check from '../check'; 


type Props = { 
  value: string; 
  formatter?: (newValue:string) => string; 
  onChange?: (newValue:string) => void; 
  onBlur?: (newValue:string) => void; 
  size?: any;
  attributes?: any; 
  useref?: any; 
  checkDisplay?: boolean; 
  validation?: (num:string) => boolean; 
} 
// Input String =================================
export default function InputNumber({
    value, 
    formatter, onChange, onBlur, 
    attributes, 
    useref, 
    checkDisplay=false, 
    validation=(str:string) => true}:Props) { 

  const [valueHook, setValueHook] = useState(value);
  const [ok, setOk] = useState(validation(value));  // useCallBack ??

  function OnChange(newValue:string) { 
    setValueHook(newValue); 
    setOk(validation(newValue)); 
    if(onChange) 
      onChange(newValue); 
  } 

  function OnBlur() { 
    if(onBlur && ok) 
      onBlur(valueHook); 
  } 

  function OnPressEnter(event:any) { 
    if(onBlur && event['code'] === 'Enter') 
      OnBlur(); 
  } 

  function DisplayValue():string { 
    return formatter? formatter(valueHook): valueHook; 
  }

  return <span onBlur={OnBlur} onKeyUp={OnPressEnter} > 
    <input type={'text'} 
      value={valueHook} 
      onChange={(event) => {OnChange(String(event.target.value))}} 
      {...attributes} ref={useref} 
    /> 
    {checkDisplay && <Check ok={ok} />}
  </span>; 
} 