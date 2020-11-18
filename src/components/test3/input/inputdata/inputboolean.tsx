import React from 'react'; 
import {IPropsInput, useInputHook} from '../inputcommon'; 

// InputString ==================================
interface IPropsBoolean extends IPropsInput<boolean> {} 
export default function InputBoolean(props:IPropsBoolean) { 
  const {value, onChange} = useInputHook<boolean>(props); 
  return <input type={'checkbox'} checked={value} onChange={onChange} /> 
} 