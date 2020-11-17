import { useRef, useState } from "react";

export interface IOption { 
  value: any; 
  label: string; 
} 

export interface IPropsInput<T> { 
  value: T; 
  formatter?: (value:T) => T; 
  onSendValue: (value:T) => void; 
  onChange?: (event:any) => void; 
  onBlur?: (event:any) => void; 
  onPressEnter?: (event:any) => void; 
  size?: any; 
  attributes?: any; 
  useref?: any; 
  validation?: (value:T) => boolean; 
} 

export interface IInputHook<T> extends IPropsInput<T> { 
  setValue: React.Dispatch<React.SetStateAction<T>>; 
} 

export function useInputHook<T>(props:IPropsInput<T>):IInputHook<T> { 
  const KeyIsEnter = (event:any) => event['code'] === 'Enter' || event['code'] === 'NumpadEnter'; 
  const [value, setValue] = useState<T>(props.value as T); 
  
  // onSendValue 
  const onSendValue = props.onSendValue; 
  // onChange 
  const onChange = props.onChange ? props.onChange : 
    (event:{target:{value:T}}) => setValue(event.target.value); 
  // onBlur 
  const onBlur = props.onBlur ? props.onBlur : 
    (event:any) => onSendValue(value); 
  // onPressEnter 
  const onPressEnter = props.onPressEnter ? 
    (event:any) => { 
      if(props.onPressEnter && KeyIsEnter(event)) 
        props.onPressEnter(event);}: 
    (event:any) => { 
      if(KeyIsEnter(event)) 
        onSendValue(value);}; 
    
  const returnHook = {value, setValue, onSendValue, onChange, onBlur, onPressEnter}; 
  if(props.useref) 
      props.useref.current = {...props, ...returnHook}; 
  return {...props, ...returnHook}; 
} 
