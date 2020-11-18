import { useRef, useState } from "react"; 
/*import InputData from './inputdata/inputdata'; 
import InputNumber from './inputdata/inputnumber'; 
import InputString from './inputdata/inputstring'; 
import InputBoolean from './inputdata/inputboolean'; 
import InputSelect from './inputselect/inputselect'; 
import InputArray from './inputarray'; */

//export {InputArray, InputData, InputBoolean, InputNumber, InputString, InputSelect}; 

export interface IOption { 
  value: any; 
  label: string; 
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
} 

export function useInputHook<T>(props:IPropsInput<T>):IInputHook<T> { 
  const KeyIsEnter = (event:any) => event['code'] === 'Enter' || event['code'] === 'NumpadEnter'; 
  const [value, setValue] = useState<T>(props.value as T); 

  // onSendValue 
  const onSendValue = props.onSendValue ? props.onSendValue: (value:T) => {return}; 
  // onChange 
  const onChange = props.onChange ? props.onChange : (event:{target:{value:T}}) => { 
    setValue(event.target.value); 
  } 
  // onBlur 
  const onBlur = props.onBlur ? props.onBlur : (event:any) => onSendValue(value as T); 
  // onPressEnter 
  const onPressEnter = props.onPressEnter ? 
    (event:any) => { 
      if(props.onPressEnter && KeyIsEnter(event)) 
        props.onPressEnter(event); 
    }: 
    (event:any) => { 
      if(KeyIsEnter(event)) 
        onSendValue(value as T); 
    }; 
  
  const returnHook = {value, setValue, onSendValue, onChange, onBlur, onPressEnter}; 
  if(props.useref) 
      props.useref.current = {...props, ...returnHook}; 
  return {...props,...returnHook}; 
} 


export enum EnumType { 
  STRING = 'string', 
  NUMBER = 'number', 
  OBJECT = 'object', 
  ARRAY = 'array', 
  NULL = 'null', 
} 


export function Convert(toConvert:any, type:EnumType) { 
  switch(type) { 
    case EnumType.STRING: 
      return String(toConvert); 
    case EnumType.NUMBER: 
      return Number(toConvert); 
    default: 
      return toConvert; 
  }
}

export function InferValueType(value:any):EnumType { 
  if(Array.isArray(value)) 
    return EnumType.ARRAY; 
  
  switch(typeof value) { 
    case EnumType.STRING: 
      return EnumType.STRING; 
    case EnumType.NUMBER: 
      return EnumType.NUMBER; 
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
    case EnumType.OBJECT: 
      return {}; 
    case EnumType.ARRAY: 
      return []; 
    default: 
      return null; 
  }
} 
