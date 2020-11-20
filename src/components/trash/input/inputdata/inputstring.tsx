import React from 'react'; 
import {IPropsInput, useInputHook} from '../inputcommon'; 


function InputWidth(value:string):number { 
  let w = value.length; 
  w = w < 5 ? 5: w; 
  return w; 
} 

// InputString ==================================
interface IPropsString extends IPropsInput<string> {} 
export default function InputString(props:IPropsString) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<string>(props); 
  const width = InputWidth(value); 
  return <input style={{width:`${width}ch`}} type={'text'} value={value} onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
