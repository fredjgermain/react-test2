import React, {useState, useRef, Component} from 'react';

import {InputArray, 
  InputData} from './input'; 

import {IOption} from './inputdata2/inputcommon'; 
import InputNumber from './inputdata2/inputnumber'; 
import InputString from './inputdata2/inputstring'; 
import InputBoolean from './inputdata2/inputboolean'; 
import InputSelect from './inputdata2/inputselect/inputselect'; 


import {useKey, KeyEventType} from '../customhooks/customhooks'; 

export default function TestInput() { 
  console.log('Input test'); 
  const [num, setNum] = useState(0.5); 
  const userefNum = useRef<any>(null); 
  const [str, setStr] = useState(''); 
  const [bool, setBool] = useState(false); 

  const [numSelect, setSelect] = useState([0]); 
  const [numSelects, setSelects] = useState([0]); 

  function OnBlurNumber(newValue:number) { 
    setNum(newValue); 
  } 

  function OnBlurString(newValue:string) { 
    setStr(newValue); 
  }

  function ValidateNum(newValue:number):boolean { 
    return newValue > 5; 
  } 

  function ValidateStr(newValue:string):boolean { 
    return newValue.length > 5; 
  } 

  function FormatterStr(value:string):string { 
    return `${value}$`; 
  } 

  const options:IOption[] = [
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
    {value:3, label:'option 3'}, 
    {value:4, label:'option 4'}, 
  ]

  // RENDER -------------------------------------
  return <div> 
    Test input; 
    <div> 
      <div>|{num}|</div> 
      <div>|{str}|</div> 
      <div>|{JSON.stringify(bool)}|</div> 
      <div>|{numSelect}|</div> 
      <div>|{numSelects}|</div> 
    </div> 
    <div> 

      <div> 
        <InputNumber value={0} onSendValue={(value) => setNum(value)} useref={userefNum} /> 
        {num > 10 && <button onClick={() => console.log(userefNum)} > + </button>} 
      </div> 

      <div> 
        <InputBoolean value={false} onSendValue={(value) => {console.log(value); setBool(value)}} /> 
      </div> 

      <div> 
        <InputString value={''} onSendValue={(value) => setStr(value)} /> 
      </div> 

      <div> 
        <InputSelect value={numSelect} options={options} onSendValue={(value) => console.log(value)} isMulti /> 
      </div> 


    </div> 
  </div> 
} 


/*
<InputData value={0} type={'number'} onBlur={OnBlurNumber} validation={ValidateNum} checkDisplay /> 
<InputData value={''} type={'string'} onBlur={OnBlurString} validation={ValidateStr} checkDisplay formatter={FormatterStr}/> 

<InputSelect value={numSelect} onBlur={(selection) => {setSelect(selection)}} options={options} /> 
<InputSelect value={numSelects} isMulti onBlur={(selection) => {setSelects(selection)}} options={options} /> 

<InputArray values={[0,2,3]} defaultValue={0} type={'number'} onBlur={(newValues) => {console.log(newValues)}} /> 
*/