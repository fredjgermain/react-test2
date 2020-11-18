import React, {useState} from 'react'; 


type Props = { 
  value: Boolean; 
  onBlur?: (newValue:Boolean) => void; 
  onChange?: (newValue:Boolean) => void; 
  size?: any; 
  attributes?: any; 
  useref?: any; 
} 
// Input Boolean ================================
export default function InputBoolean({
  value, 
  onChange, onBlur, 
  attributes, 
  useref}:Props) { 
  
  const [valueHook, setValueHook] = useState(value); 

  function OnChange(newValue:Boolean) { 
    setValueHook(newValue); 
    if(onChange) 
      onChange(newValue); 
  } 

  function OnBlur() { 
    if(onBlur) 
      onBlur(valueHook); 
  } 

  function OnPressEnter(event:any) { 
    if(onBlur && event['code'] === 'Enter') 
      OnBlur(); 
  }
  
  return <input type="checkbox" checked={valueHook}
      onBlur={OnBlur} onKeyUp={OnPressEnter}
      onChange={(event) => OnChange(event.target.checked)} 
      {...attributes} ref={useref} />; 
} 