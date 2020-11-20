import React from 'react'; 
import {IPropsInput, useInputHook} from '../inputcommon'; 

function InputWidth(value:number):number { 
  let w = String(value).length + 2; 
  w = w < 5 ? 5: w; 
  return w; 
} 

// InputNumber ==================================
interface IPropsNumber extends IPropsInput<number> {} 
export default function InputNumber(props:IPropsNumber) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<number>(props); 
  const width = InputWidth(value); 
  return <input style={{width:`${width}ch`}} type={'number'} value={value} onBlur={onBlur} onKeyUp={onPressEnter} onChange={onChange} /> 
} 
