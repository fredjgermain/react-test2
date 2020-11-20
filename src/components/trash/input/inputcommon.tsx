import { useRef, useState } from "react"; 
import InputData from './inputdata/inputdata'; 
import InputNumber from './inputdata/inputnumber'; 
import InputString from './inputdata/inputstring'; 
import InputBoolean from './inputdata/inputboolean'; 
import InputSelect from './inputselect/inputselect'; 
import InputArray from './inputarray'; 

export {InputArray, InputData, InputBoolean, InputNumber, InputString, InputSelect}; 

export interface IOption { 
  value: any; 
  label: string; 
} 


export interface IEvent { 
  target:{ 
    type:string, 
    value:string, 
    valueAsDate: Date | null, 
    valueAsNumber: number, 
    checked: boolean | null, 
  }
}

export interface IPropsInput<T> { 
  value?: T; 
  type?: EnumType; 
  size?: any; 
  attributes?: any; 
  useref?: any; 

  formatter?: (value:T) => T; 
  onSendValue?: (value:T) => void; 
  onChange?: (event:any) => void; 
  onBlur?: (event:any) => void; 
  onPressEnter?: (event:any) => void; 
  validation?: (value:T) => boolean; 
} 


export interface IInputHook<T> extends IPropsInput<T> { 
  value: T; 
  setValue: React.Dispatch<React.SetStateAction<T>>; 
  onSendValue: (value:T) => void; 
  onChange: (event:any) => void; 
  onBlur: (event:any) => void; 
  onPressEnter: (event:any) => void; 
} 

export function useInputHook<T>(props:IPropsInput<T>):IInputHook<T> { 
  const KeyIsEnter = (event:any) => event['code'] === 'Enter' || event['code'] === 'NumpadEnter'; 
  const [value, setValue] = useState<T>(props.value as T); 
  const target = useRef<HTMLInputElement>(null); 

  // onSendValue ................................
  const onSendValue = props.onSendValue ? props.onSendValue: (value:T) => {return}; 
  
  // onChange ...................................
  const defaultOnChange = (event:IEvent) => { 
    let value:any = event.target.value; 
    if(event.target.type === 'number') {
      value = event.target.valueAsNumber; 
      setValue(value as T); 
    }
    // Default for check box
    else if(event.target.type === 'checkbox') {
      value = event.target.checked; 
      onSendValue(value); 
    } 
    setValue(value as T); 
  } 

  // ON CHANGE 
  const onChange = props.onChange ? props.onChange : defaultOnChange; 
  
  // onBlur ......................................
  const onBlur = props.onBlur ? props.onBlur : (event:IEvent) => onSendValue(value as T); 
  
  // onPressEnter ................................
  const definedOnPressEnter = (event:any) => { 
    if(props.onPressEnter && KeyIsEnter(event)) 
      props.onPressEnter(event); 
  } 
  const defaultOnPressEnter = (event:any) => { 
    if(KeyIsEnter(event)) 
      onSendValue(value as T); 
  } 

  // ON PRESS ENTER 
  const onPressEnter = props.onPressEnter ? definedOnPressEnter: defaultOnPressEnter; 
  
  const returnHook = {value, setValue, onSendValue, onChange, onBlur, onPressEnter}; 
  if(props.useref) 
      props.useref.current = {...props, ...returnHook}; 
  return {...props,...returnHook}; 
} 

/*
export function GetDefaultOnChange<T>(value:T, event:IEvent, setValue:React.Dispatch<React.SetStateAction<T>>, onSendValue:(value:T) => void) {
  // Input type Number
  if(event.target.type === 'number') 
    return (event:IEvent) => { 
      const v:any = event.target.valueAsNumber; 
      setValue(v as T); 
    }; 
  // Input type checkbox
  if(event.target.type === 'checkbox') 
    return (event:IEvent) => { 
      const v:any = event.target.checked; 
      onSendValue(v as T); 
      setValue(v as T); 
    }; 
 // Input type text
  return (event:IEvent) => { 
    const v:any = event.target.value; 
    setValue(v as T); 
  }; 
}
*/


export enum EnumType { 
  STRING = 'string', 
  NUMBER = 'number', 
  BOOLEAN = 'boolean', 
  FUNCTION = "function", 
  DATE = 'date', 
  OBJECT = 'object', 
  ARRAY = 'array', 
  UNDEFINED = 'undefined', 
  NULL = 'null', 
} 

export function InferValueType(value:any):EnumType { 
  if(Array.isArray(value)) 
    return EnumType.ARRAY; 
  
  switch(typeof value) { 
    case EnumType.STRING: 
      return EnumType.STRING; 
    case EnumType.NUMBER: 
      return EnumType.NUMBER; 
    case EnumType.BOOLEAN:
      return EnumType.BOOLEAN;
    case EnumType.OBJECT: 
      return EnumType.OBJECT; 
  } 
  return EnumType.NULL; 
} 

export function InferDefaultValue(value:any, type?:EnumType) { 
  let foundType = type ?? InferValueType(value); 
  switch(foundType) { 
    case EnumType.STRING: 
      return ''; 
    case EnumType.NUMBER: 
      return 0; 
      case EnumType.BOOLEAN: 
      return false; 
    case EnumType.OBJECT: 
      return {}; 
    case EnumType.ARRAY: 
      return []; 
    default: 
      return null; 
  }
} 