import React from 'react'; 
import {IPropsInput, useInputHook} from './inputcommon'; 

export interface IRefBoolean extends IPropsBoolean { 
  setValue?: (value:Boolean) => void; 
} 

// InputString ==================================
interface IPropsBoolean extends IPropsInput<boolean> {} 
export default function InputBoolean(props:IPropsBoolean) { 
  const {value, setValue, onSendValue, onBlur, onChange, onPressEnter} = useInputHook<boolean>(props); 
  return <input type={'checkbox'} checked={value} onBlur={onBlur} onKeyUp={onPressEnter} 
            onChange={(event:{target:{checked:boolean}}) => { 
              setValue(event.target.checked); 
              onSendValue(event.target.checked); 
            }} /> 
} 