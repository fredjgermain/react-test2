import React from 'react'; 
import {IPropsInput, useInputHook} from '../inputcommon'; 

// InputString ==================================
interface IPropsString extends IPropsInput<string> {} 
export default function InputString(props:IPropsString) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<string>(props); 
  return <input type={'text'} value={value} onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
