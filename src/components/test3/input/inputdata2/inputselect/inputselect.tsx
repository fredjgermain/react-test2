import React, {useState} from 'react'; 
import { IOption } from '../../input'; 
import {IPropsInput, useInputHook} from '../inputcommon'; 

import './inputselect.css'; 


// InputSelect ==================================
interface IPropsSelect extends IPropsInput<Array<any>> { 
  isMulti?:boolean; 
  options:IOption[]; 
} 
export default function InputSelect({isMulti=false, options, ...props}:IPropsSelect) { 
  const {value, setValue, onSendValue, onBlur, onPressEnter} = useInputHook<Array<any>>(props); 
  const [fold, setFold] = useState(true); 
  
  const onChange = (newValue:any) => { 
    let selection = [...value]; 
    const index = selection.findIndex( v => v === newValue); 
    if(index >=0) 
      selection.splice(index, 1); 
    else 
      selection = isMulti? [...selection, newValue] : [newValue]; 
    setValue(selection); 
  } 

  function OnBlur(event:any) { 
    setFold(true); 
    if(onBlur) onBlur(event); 
  } 

  function OnPressEnter(event:any) {
    setFold(true); 
    if(onPressEnter) onPressEnter(event); 
  }

  // RENDER -------------------------------------
  if(fold)
    return <div className={'inputSelect'} tabIndex={0} onBlur={OnBlur} onKeyUp={OnPressEnter} > 
      <SelectHeader {...{value, options, fold, setFold}}/> 
    </div> 

  return <div className={'inputSelect'} tabIndex={0} onBlur={OnBlur} onKeyUp={OnPressEnter} > 
    <SelectHeader {...{value, options, fold, setFold}}/> 
    <SelectFolder {...{value, options, onChange}}/> 
  </div> 
} 


// SelectHeader =================================
interface IPropsHeader { 
  value: Array<any>; 
  options: IOption[]; 
  fold: boolean; 
  setFold: React.Dispatch<React.SetStateAction<boolean>>; 
} 
function SelectHeader({value, options, fold, setFold}:IPropsHeader) { 
  const selection = options.filter( o => value.includes(o.value) ) 
  // RENDER -------------------------------------
  return <div className={'selectHeader'} onClick={() => setFold(!fold)}> 
    <span className={'selected'}> 
      {selection.map( (o,i) => { 
        return <span key={i} className={'element'}> {o.label} </span>; 
      })}
    </span> 
    <span className={'btn'}>&#x25BC;</span> 
  </div>; 
}


// SelectFolder ===============================
interface IPropsFolder { 
  value:Array<any>; 
  options:IOption[]; 
  onChange:(event:any) => void; 
} 
function SelectFolder<T>({value, options, onChange}:IPropsFolder) { 
  const selectedOptions = options.filter( o => value.includes(o.value)); 
  const notSelectedOptions = options.filter( o => !value.includes(o.value) ); 

  // RENDER -------------------------------------
  return <div className={'selectFold'}> 
    {selectedOptions.map( (o,i) => { 
      return <div key={i} onClick={()=>onChange(o.value)} 
              className={'selectedOption'} >{o.label}</div> 
    })} 
    {notSelectedOptions.map( (o,i) => { 
      return <div key={i} onClick={()=>onChange(o.value)} 
              className={'notSelectedOption'} >{o.label}</div> 
    })} 
  </div>; 
} 