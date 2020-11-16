import { useRef, useState } from "react";

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
  checkDisplay?: boolean; 
  validation?: (num:T) => boolean; 
} 


export interface IInputHook<T> { 
  value?: T; 
  useref?:any; 
  onSendValue: (value:T) => void; 
  onChange?: (event:any) => void; 
  onBlur?: (event:any) => void; 
  onPressEnter?: (event:any) => void; 
} 

export function useInputHook<T>(props:IPropsInput<T>):IInputHook<T> { 
  const KeyIsEnter = (event:any) => event['code'] === 'Enter' || event['code'] === 'NumpadEnter';   
  const [value, setValue] = useState<T>(props.value as T); 
  //onReset = () => {setValue(props.value)}, 
  const onSendValue = props.onSendValue; 
  const onChange = props.onChange ? props.onChange : (event:{target:{value:T}}) => setValue(event.target.value); 
  const onBlur = props.onBlur ? props.onBlur : (event:any) => onSendValue(value); 
  const onPressEnter = props.onPressEnter ? 
  (event:any) => { 
    if(props.onPressEnter && KeyIsEnter(event)) 
      props.onPressEnter(event); } 
  :
  (event:any) => { 
    if(KeyIsEnter(event)) 
      onSendValue(value); 
  } 

  //const returnHook = {value, onSendValue, onChange, onBlur, onPressEnter, }; 

  const useref = () => { 
    if(props.useref) 
      props.useref.current = {value, 
        formatter:props.formatter, 
        onSendValue, 
        onChange, 
        onBlur, 
        onPressEnter, 
        size:props.size, 
        checkDisplay:props.checkDisplay, 
        validation:props.validation}; 
  } 
  useref(); 

  return {value, onSendValue, onChange, onBlur, onPressEnter}; 
}