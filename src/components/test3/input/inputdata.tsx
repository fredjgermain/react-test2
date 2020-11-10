import React from 'react'; 
import InputString from './inputstring'; 
import InputNumber from './inputnumber'; 
import InputBoolean from './inputboolean'; 

type Props = { 
  value: any; 
  setValue: any; 
  type: string; 
  size?: number; 
  useref?: any; 
  attributes?: any; 
  checkDisplay?: boolean; 
  validation?: any; 
} 
// Input Data ===================================
export default function InputData({value, setValue, type, size=5, useref, 
  attributes, checkDisplay=false, 
  validation=(num:number) => true}:Props) { 
  
  let adjustSize = Math.max(size, value.toString().length); 
  adjustSize = Math.max(adjustSize, 4); 
  const sizeNumber = {style:{width:`${adjustSize+3}ch`}}; 
  const sizeString = {size:adjustSize-3}; 

  if(type === 'boolean' || type === 'Boolean') 
    return <InputBoolean useref={useref} value={Boolean(value)} setValue={setValue} 
      attributes={attributes} /> 
  if(type === 'string' || type === 'String') 
    return <InputString useref={useref} value={String(value)} setValue={setValue} 
      attributes={{...attributes, ...sizeString}} 
      validation={validation} 
      checkDisplay={checkDisplay} /> 
  if(type === 'number' || type === 'Number') 
    return <InputNumber useref={useref} value={Number(value)} setValue={setValue} 
      attributes={{...attributes, ...sizeNumber}} 
      validation={validation} 
      checkDisplay={checkDisplay} /> 
  return <div></div>; 
} 