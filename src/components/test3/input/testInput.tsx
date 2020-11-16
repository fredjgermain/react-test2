import React, {useState, useRef, Component} from 'react';

import {InputArray, 
  InputSelect, IOption, 
  InputBoolean, 
  InputData} from './input'; 

import InputNumber from './inputdata2/inputnumber'; 
import InputString from './inputdata2/inputstring'; 


import {useKey, KeyEventType} from '../customhooks/customhooks'; 

export default function TestInput() { 
  const [num, setNum] = useState(0.5); 
  const [str, setStr] = useState(''); 

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
      <div>|{numSelect}|</div> 
      <div>|{numSelects}|</div> 
    </div> 
    <div> 

      <div>
        <InputNumber value={0} onSendValue={(value) => console.log(value)} /> 
      </div>

      <div>
        <InputString value={''} onSendValue={(value) => console.log(value)} /> 
      </div>


      <InputData value={0} type={'number'} onBlur={OnBlurNumber} validation={ValidateNum} checkDisplay /> 
      <InputData value={''} type={'string'} onBlur={OnBlurString} validation={ValidateStr} checkDisplay formatter={FormatterStr}/> 

      <InputSelect value={numSelect} onBlur={(selection) => {setSelect(selection)}} options={options} /> 
      <InputSelect value={numSelects} isMulti onBlur={(selection) => {setSelects(selection)}} options={options} /> 

      <InputArray values={[0,2,3]} defaultValue={0} type={'number'} onBlur={(newValues) => {console.log(newValues)}} /> 
    </div> 
  </div> 
} 
