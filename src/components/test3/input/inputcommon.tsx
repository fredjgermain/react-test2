import { useRef, useState } from "react"; 

import InputData from './inputdata/inputdata'; 
import InputString from './inputdata/inputstring'; 
import InputNumber from './inputdata/inputnumber'; 
import InputBool from './inputdata/inputbool'; 
import InputSelect from './inputselect/inputselect'; 
import InputArray from './inputarray'; 

export {InputData, InputBool, InputNumber, InputString, InputSelect, InputArray}; 

export function SetSize(value:any) { 
    const w = String(value).length; 
    return w < 5 ? 5 : w; 
} 

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

// Props to be sent from a parent to a Input component 
export interface IInput<T> { 
  value: T; 
  type?: EnumType; 
  //size?: any; 
  useref?: any; 

  formatter?: (value:T) => T; 
  onSendValue: (value:T) => void; 
  onChange?: (event:any) => void;      // called when <input> changes 
  onBlur?: (event:any) => void;        // called when <input> blurs 
  onPressEnter?: (event:any) => void;  // called when <input> press enter 
  validation?: (value:T) => boolean; 
} 

// Props to be return by useInputHook 
export interface IInputHook<T> extends IInput<T> { 
  value: T; 
  setValue: React.Dispatch<React.SetStateAction<T>>; 
  //type?: EnumType; 
  //size?: any; 

  formatter?: (value:T) => T; 
  onSendValue: (value:T) => void; 
  onChange: (event:any) => void;      // called when <input> changes 
  onBlur: (event:any) => void;        // called when <input> blurs 
  onPressEnter: (event:any) => void;  // called when <input> press enter 
  validation?: (value:T) => boolean; 

  target: any; 
} 

// Use Input Hook 
export function useInputHook<T>(props:IInput<T>):IInputHook<T> { 
  const [value, setValue] = useState<T>(props.value as T); 
  const target = useRef<HTMLInputElement>(); // target to <input .../> 
  
  // onSendValue ................................
  const onSendValue = props.onSendValue;  //? props.onSendValue: (value:T) => console.log(value); 

  // onChange ...................................
  const onChange = props.onChange? props.onChange :
    (event:any) => { 
      if(!target.current) 
        return; 
      const input = target.current; 
      let value:any; 
      if(input.type === 'number') 
        setValue(input.valueAsNumber as any as T); 
      else if(input.type === 'checkbox') { 
        value = input.checked; 
        setValue(value as T); 
        onSendValue(value as T); 
      } 
      else if(input.type === 'text') 
        setValue(input.value as any as T); 
      // type date ?? 
    }; 

  // onPressEnter ...............................
  const IsPressEnter = (event:any) => event['code'] === 'Enter' || event['code'] === 'NumpadEnter'; 

  const onPressEnter = props.onPressEnter ? 
    (event:any) => { 
      if(props.onPressEnter && IsPressEnter(event)) {
        console.log('create costum enter');
        props.onPressEnter(event); 
      } 
    }: 
    (event:any) => { 
      if(IsPressEnter(event)) { 
        console.log('create default enter');
        onSendValue(value as T); 
      } 
    }; 

  // onBlur .....................................
  const onBlur = props.onBlur ? props.onBlur : 
    () => {
      console.log('create blur'); 
      onSendValue(value as T);
    }; 

  const inputHook = {value, setValue, onSendValue, onChange, onBlur, onPressEnter, target}; 
  if(props.useref) 
    props.useref.current = inputHook; 
  
  return inputHook as IInputHook<T>; 
} 
  




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
