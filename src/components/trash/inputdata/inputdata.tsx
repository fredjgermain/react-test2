import React from 'react'; 
import InputString from './inputstring'; 
import InputNumber from './inputnumber'; 
import InputBoolean from './inputboolean'; 


interface Props { 
  value: any; 
  type: string; 
  formatter?: (value:any) => any; 
  onChange?: (newValue:any) => void; 
  onBlur?: (newValue:any) => void; 
  size?:number; 
  useref?: any; 
  attributes?: any; 
  checkDisplay?: boolean; 
  validation?: (value:any) => boolean; 
} 
// Input Data ===================================
export default function InputData<T>(props:Props) { 
  const {value, type, size, ...rest} = props; 

  let adjustSize = Math.max(size ?? 0, value?.toString().length ?? 0); 
  adjustSize = Math.max(adjustSize, 4); 
  const sizeNumber = {style:{width:`${adjustSize+3}ch`}}; 
  const sizeString = {size:adjustSize-3}; 

  // Input boolean
  if(type === 'boolean' || type === 'Boolean') 
    return <InputBoolean {...{value, ...rest}} /> 

  if(type === 'string' || type === 'String') 
    return <InputString {...{value, size:sizeString, ...rest}} /> 

  if(type === 'number' || type === 'Number') 
    return <InputNumber {...{value, size:sizeNumber, ...rest}} /> 
  return <div></div>; 
} 