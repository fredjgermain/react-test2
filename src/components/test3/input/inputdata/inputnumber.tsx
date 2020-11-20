import React from 'react'; 
import {IInput, useInputHook, SetSize} from '../inputcommon'; 


// InputNumber ================================== 
export default function InputNumber(props:IInput<number>) { 
  const {value, target, onChange, onBlur, onPressEnter} = useInputHook<number>(props); 
  const style = {width:`${SetSize(value)+2}ch`}; 
  return <input ref={target} type={'number'} value={value} style={style} 
    onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
