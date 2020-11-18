import React from 'react'; 
import {IPropsInput, useInputHook} from '../inputcommon'; 

// InputNumber ==================================
interface IPropsNumber extends IPropsInput<number> {} 
export default function InputNumber(props:IPropsNumber) { 
  const {value, onChange, onBlur, onPressEnter} = useInputHook<number>(props); 
  return <input type={'number'} value={value} onBlur={onBlur} onKeyUp={onPressEnter} onChange={onChange} /> 
} 
