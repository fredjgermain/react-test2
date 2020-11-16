import React, {useRef, useState} from 'react'; 
import {InputData, IInputNumber} from './input'; 

interface IRef { 
  value: any; 
} 

interface Props { 
  values: any[]; 
  type: string; 
  formatter?: (value:any) => any; 
  onChange?: (newValue:any) => void; 
  onBlur?: (newValue:any) => void; 
  size?:number; 
  useref?:any; 
  attributes?: any; 
  checkDisplay?: boolean; 
  validation?: (value:any[]) => boolean; 
  defaultValue?: any; 
} 
// Input Array ==================================
export default function InputArray({values=[], ...props}:Props) { 
  const {defaultValue, onChange, onBlur, validation, ...rest} = props; 

  // define default value if not given in attributes ... 
  const [valuesHook, setValuesHook] = useState([...values]); 
  const refCreate = useRef<IInputNumber>(null); 
  
  function Delete(indexToRemove:number) { 
    const newValues = [...valuesHook]; 
    newValues.splice(indexToRemove, 1); 
    setValuesHook(newValues); 
  } 

  // pass onBLur in InputData for new item
  function Create(valueToAdd:any) { 
    const newValues = [...valuesHook]; 
    newValues.push(valueToAdd); 
    setValuesHook(newValues); 
  } 

  // to as onBlur in InputData
  function Update(i:number, valueToModify:any) { 
    const newValues = [...valuesHook];
    newValues[i] = valueToModify; 
    setValuesHook(newValues); 
  } 

  function OnBlur() { 

  } 

  return <div> 
    {JSON.stringify(valuesHook)} 
    {valuesHook.map((value, i) => { 
      // editable elements
      return <div key={i}> 
        <InputData {...{value, ...rest}} onBlur={(newValue:any) => Update(i, newValue)} /> 
        <button onClick={() => {Delete(i)}}>X</button> 
      </div> 
    })} 
    <InputData value={defaultValue} {...rest} useref={refCreate} /> 
    <button onClick={() => { 
      if(refCreate) { 
        Create(refCreate.current?.value); 
        if(refCreate.current?.setValue) 
          (refCreate.current.setValue(defaultValue)); 
      }}} > + </button> 
  </div> 
} 