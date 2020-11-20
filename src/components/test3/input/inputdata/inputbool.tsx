import React from 'react'; 
import {IInput, useInputHook, EnumType} from '../inputcommon'; 


// InputBool ================================== 
export default function InputBool(props:IInput<boolean>) { 
  const {value, target, onChange, onBlur, onPressEnter} = useInputHook<boolean>({...props, type:EnumType.BOOLEAN}); 
  return <input ref={target} type={'checkbox'} checked={value} 
    onChange={onChange} onBlur={onBlur} onKeyUp={onPressEnter} /> 
} 
