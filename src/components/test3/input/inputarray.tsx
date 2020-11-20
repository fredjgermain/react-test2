import React, { useRef } from 'react'; 
import {IInput, InputData, InferDefaultValue, EnumType, useInputHook} from './inputcommon'; 

// INPUTARRAY =================================== 
interface IPropsArray<T> extends IInput<T[]> { 
  type?:EnumType; 
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
    console.log(event); 
    
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
          console.log('create button + ' + event['code']); 
          if(elementPropsCreate.onPressEnter) 
            elementPropsCreate.onPressEnter(event); 
        }}>+</button> 
    </div> 
  </div>; 
}

/*import {InputData, IInputNumber} from './input'; 

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
} */