import React, {useState} from 'react'; 
import './inputselect.css'; 

export interface IOption { 
  value: any; 
  label: string; 
} 

interface Props { 
  value?: any[]; 
  options:IOption[], 
  isMulti?:boolean, 
  formatter?: (value:any) => any; 
  onChange?: (newSelection:any) => void; 
  onBlur?: (newSelection:any) => void; 
  size?: number, 
  attributes?: any; 
  useref?: any; 
  checkDisplay?: boolean; 
  validation?: (num:any[]) => boolean; 
}
// INPUT SELECT =================================
export default function InputSelect({
    value=[], options, isMulti=false, 
    formatter, onChange, onBlur, 
    attributes, useref, checkDisplay=false, 
    validation=(selection:any[]) => true}:Props) { 

  const [selection, setSelection] = useState(value ?? []); 
  const [ok, setOk] = useState(validation(selection));  // useCallBack ?? 
  const [fold, setFold] = useState(true); 

  function OnChangeSingle(newSelection:any[]) { 
    const lastElem = newSelection[newSelection.length-1]; 
    const newValue = lastElem!=undefined? [lastElem] : []; 
    setSelection(newValue); 
    setOk(validation(newValue)); 
    if(onChange) 
      onChange(newValue); 
    setFold(true); 
    console.log(newValue); 
    if(onBlur && ok) 
      onBlur(newValue); 
  } 

  function OnChangeMulti(newSelection:any[]) { 
    setSelection(newSelection); 
    setOk(validation(newSelection)); 
    if(onChange) 
      onChange(newSelection); 
  } 

  function OnChange(newValue:any) { 
    const newSelection = [...[selection]].flat(); 
    const index = newSelection.findIndex( v => v === newValue); 
    if(index >= 0) 
      newSelection.splice(index, 1); 
    else 
      newSelection.push(newValue); 
    if(!isMulti) 
      OnChangeSingle(newSelection); 
    else 
      OnChangeMulti(newSelection); 
  } 

  function OnBlur() { 
    setFold(true); 
    if(onBlur && ok) 
      onBlur(selection); 
  } 

  function OnPressEnter(event:any) { 
    if(onBlur && event['code'] === 'Enter') 
      OnBlur(); 
  }

  // display-selection ..........................
  const selectedOptions = options.filter( o => selection.includes(o.value) ) 
  const selectionDisplay = <div className={'selectheader'} onClick={() => {setFold(() => !fold)}} > 
    <span className={'selected'}> 
      {selectedOptions.map( (o,i) => { 
        return <span className={'element'} key={i}>{o.label} </span>; 
      })} 
    </span> 
    <span className={'btn'}>&#x25BC;</span> 
  </div>; 

  // Options Display ............................
  const optionToDisplay = options.map( o => {return {...o, selected:selection.includes(o.value)}}) 
  const folder = <OptionDisplay options={optionToDisplay} onChange={OnChange} /> 
  
  // RENDER -------------------------------------
  return <div className={"inputselect"} tabIndex={0} 
            onBlur={OnBlur} onKeyUp={OnPressEnter} 
            {...attributes} > 
    {selectionDisplay} 
    {!fold && folder} 
  </div> 
} 



// ==============================================
interface OptionDisplayProps { 
  options: { 
    value:any, 
    label:string, 
    selected:boolean, 
  } [] 
  onChange: any;
}
// OPTION DISPLAY ===============================
function OptionDisplay({options, onChange}:OptionDisplayProps) { 
  const selectedOptions = options.filter( o => o.selected ); 
  const notSelectedOptions = options.filter( o => !o.selected ); 

  return <div className={'selectfold'}> 
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