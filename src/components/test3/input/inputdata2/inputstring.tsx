import React from 'react'; 
import {IPropsInput, useInputHook} from './inputcommon'; 

export interface IRefString extends IPropsString { 
  setValue?: (value:String) => void; 
} 

interface IPropsString extends IPropsInput<string> {} 
// InputNumber ==================================
export default function InputString(props:IPropsString) { 
  const {value, onSendValue, onBlur, onChange, onPressEnter} = useInputHook<string>(props); 

  return <div onBlur={onBlur} onKeyUp={onPressEnter} > 
    <input type={'text'} value={value} onChange={onChange} />
  </div> 
}
