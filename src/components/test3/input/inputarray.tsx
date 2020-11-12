import React from 'react'; 
import InputData from './inputdata'; 


type Props = { 
  values: Array<any>; 
  setValues: any; 
  defaultValue?: any; 
  type: string; 
  useref?: any; 
  checkDisplay?: boolean; 
  attributes?: any; 
  validation?: any; 
} 

export default function InputArray({values=[], setValues, defaultValue='', type, useref, 
  checkDisplay=false, attributes={}, validation=(num:number) => true}:Props) { 
  
  const editableValues = [...values, defaultValue]; 

  function DeleteValue(indexToRemove:number) { 
    editableValues.splice(indexToRemove, 1); 
    editableValues.pop(); 
    setValues(editableValues); 
  } 

  function CreateValue(valueToAdd:any) { 
    editableValues[editableValues.length-1] = valueToAdd; 
    setValues(editableValues); 
  } 

  function UpdateValue(i:number, valueToModify:any) { 
    editableValues[i] = valueToModify; 
    editableValues.pop(); 
    setValues(editableValues); 
  } 

  return <span> 
    {editableValues.map( (value:any, i:number) => { 
      if(i < editableValues.length-1) 
        return <div key={i} > 
          <InputData value={value} setValue={(newValue:any) => {UpdateValue(i, newValue)}} 
            type={type} useref={useref} attributes={attributes} 
            validation={validation} checkDisplay={checkDisplay} /> 
          <button onClick={() => {DeleteValue(i)}}>X</button> 
        </div> 
      else
        return <div key={i} > 
        <InputData value={value} setValue={(newValue:any) => {CreateValue(newValue)}} 
            type={type} attributes={attributes} useref={useref} 
            validation={validation} checkDisplay={checkDisplay} /> 
      </div> 
    })} 
  </span> 
}
