import React from 'react'; 
import {IPropsInput, InputBoolean, InputNumber, InputString} from '../inputcommon'; 

// InputData ====================================
export default function InputData(props:IPropsInput<any>) { 
  if(typeof props.value === 'boolean') 
    return <InputBoolean {...props} /> 
  if(typeof props.value === 'number') 
    return <InputNumber {...props} /> 

  // type Date ???
  return <InputString {...props} /> 
}