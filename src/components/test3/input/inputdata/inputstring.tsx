import React from 'react'; 
import {IInput, useInputHook, SetSize} from '../inputcommon'; 


// InputString ================================== 
export default function InputString(props:IInput<string>) { 
  const {value, target, onChange, onBlur, onPressEnter} = useInputHook<string>(props); 
  const style = {width:`${SetSize(value)}ch`}; 
  return <input ref={target} type={'text'} value={value} style={style} 
    onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
