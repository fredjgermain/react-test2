import React from 'react'; 
import {IPropsInput, InputBoolean, InputNumber, InputString} from '../inputcommon'; 

// InputData ====================================
export default function InputData(props:IPropsInput<any>) { 
  // input type check box
  if(typeof props.value === 'boolean') 
    return <InputBoolean {...props} /> 
  // input type number 
  if(typeof props.value === 'number') 
    return <InputNumber {...props} /> 
  
  // type Date ???

  // input type text - used as default input type. 
  return <InputString {...props} /> 
}