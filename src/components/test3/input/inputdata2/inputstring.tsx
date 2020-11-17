import React from 'react'; 
import {IPropsInput, useInputHook} from './inputcommon'; 

export interface IRefString extends IPropsString { 
  setValue?: (value:String) => void; 
} 

// InputString ==================================
interface IPropsString extends IPropsInput<string> {} 
export default function InputString(props:IPropsString) { 
  const {value, setValue, onSendValue, onBlur, onChange, onPressEnter} = useInputHook<string>(props); 
  return <input type={'text'} value={value} onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
