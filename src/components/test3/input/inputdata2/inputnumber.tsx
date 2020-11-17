import React from 'react'; 
import {IPropsInput, useInputHook} from './inputcommon'; 

export interface IRefNumber extends IPropsNumber { 
  setValue?: (value:number) => void; 
} 

// InputNumber ==================================
interface IPropsNumber extends IPropsInput<number> {} 
export default function InputNumber(props:IPropsNumber) { 
  const {value, setValue, onSendValue, onBlur, onChange, onPressEnter} = useInputHook<number>(props); 
  return <input type={'number'} value={value} onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
