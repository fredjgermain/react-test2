import React, { useRef } from 'react'; 
import {IInput, InputData, InferDefaultValue, EnumType, useInputHook} from './inputcommon'; 

// INPUTARRAY =================================== 
interface IPropsArray<T> extends IInput<T[]> { 
  type:string; 
  defaultValue?: T; 
  elementProps?: IInput<T>; 
} 

export default function InputArray<T>({defaultValue, type, ...props}:IPropsArray<T>) { 
  const {value, setValue, onSendValue} = useInputHook<any[]>({...props,...defaultValue}); 

  // element props
  const elementProps = props.elementProps ?? {} as IInput<any>; 
  const elementPropsCreate = {...elementProps}; 
  elementPropsCreate.value = GetDefaultValue(); 
  elementPropsCreate.useref = useRef<HTMLElement>(null); 
  elementPropsCreate.onBlur = (value:T) => {return}; 
  elementPropsCreate.onSendValue = (value:T) => {return}; 
  elementPropsCreate.onPressEnter = (event:any) => { 
    Create(elementPropsCreate.useref.current.value as T) 
    elementPropsCreate.useref.current.setValue(GetDefaultValue()); 
  }; 

  function Update(at:number, newValue:T) { 
    const values = [...value]; 
    values[at] = newValue; 
    setValue(values as T[]); 
    onSendValue(values as T[]); 
  } 

  function Create(newValue:T) { 
    const values = [...value]; 
    values.push(newValue); 
    setValue(values as T[]); 
    onSendValue(values as T[]); 
  } 

  function Delete(at:number) { 
    const values = [...value]; 
    console.log(values); 
    values.splice(at, 1); 
    setValue(values as T[]); 
    onSendValue(values as T[]); 
  } 

  function GetDefaultValue() { 
    if(defaultValue) 
      return defaultValue; 
    if(Array.isArray(value) && value.length > 0) 
      return InferDefaultValue(value[0], type); 
    return InferDefaultValue(value, type); 
  } 


  // RENDER -------------------------------------
  return <div> 
    {value.map( (v, i) => { 
      elementProps.value = v; 
      elementProps.onSendValue = (value:T) => Update(i, value); 
      return <div key={i}> 
        <InputData {...elementProps} /> 
        <button onClick={() => Delete(i)}>X</button> 
      </div> 
    })} 
    <div> 
      <InputData {...elementPropsCreate} /> 
      <button onClick={(event:any) =>
        {
          if(elementPropsCreate.onPressEnter) 
            elementPropsCreate.onPressEnter(event); 
        }}>+</button> 
    </div> 
  </div>; 
}
