import React from 'react'; 
import {IPropsInput, useInputHook} from './inputcommon'; 

export interface IRefNumber extends IPropsNumber { 
  setValue?: (value:number) => void; 
} 

interface IPropsNumber extends IPropsInput<number> {} 
// InputNumber ==================================
export default function InputNumber(props:IPropsNumber) { 
  const {value, onSendValue, onBlur, onChange, onPressEnter} = useInputHook<number>(props); 

  return <div onBlur={onBlur} onKeyUp={onPressEnter} > 
    <input type={'number'} value={value} onChange={onChange} /> 
  </div> 
}
