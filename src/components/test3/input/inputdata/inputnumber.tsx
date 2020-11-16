import React, {useState, ElementType, useEffect} from 'react'; 
import Check from '../check'; 


export interface IInputNumber { 
  value: number; 
  setValue?: (value:number) => void; 
  formatter?: (value:number) => number; 
  onChange?: (newValue:number) => void; 
  onBlur?: (newValue:number) => void; 
  size?: any; 
  attributes?: any; 
  useref?: any; 
  checkDisplay?: boolean; 
  validation?: (num:number) => boolean; 
} 
// Input Number =================================
export default function InputNumber({checkDisplay=false, 
  validation=(num:number) => true, 
  ...props}:IInputNumber) { 
  const {value, formatter, onChange, onBlur, attributes, useref, size} = props; 

  const [valueHook, setValueHook] = useState(value); 
  const [ok, setOk] = useState(validation(value));  // useCallBack ??

  useEffect(() => { 
    console.log([value, valueHook]); 
  }, []); 

  // set UseRef
  UseRef(useref, {value:valueHook, setValue:setValueHook, attributes, size} as IInputNumber); 

  function OnChange(newValue:number) { 
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

  function DisplayValue():number { 
    return formatter? formatter(valueHook): valueHook; 
  } 
  //style={{width:"3em"}} 

  return <span onBlur={OnBlur} onKeyUp={OnPressEnter}> 
    <input type={'number'} 
      value={valueHook} 
      onChange={(event) => {OnChange(Number(event.target.value))}} 
      {...attributes} /> 
    {checkDisplay && <Check ok={ok} />} 
  </span>; 
} 

// Make useRef ----------------------------------
function UseRef(useref:any, props:IInputNumber) { 
  if(useref) 
    useref.current = props; 
}