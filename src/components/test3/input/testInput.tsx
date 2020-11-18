import React, {useState, useRef} from 'react'; 
import {IOption, InputData, InputBoolean, InputString, InputSelect, InputNumber, InputArray, EnumType} from './inputcommon'; 

export default function TestInput() { 
  console.log('Input test'); 
  const [num, setNum] = useState(0.5); 
  const userefNum = useRef<any>(null); 
  const [str, setStr] = useState(''); 
  const [bool, setBool] = useState(false); 

  const [numSelect, setSelect] = useState([0]); 
  const [numSelects, setSelects] = useState([0]); 

  const [numArray, setNumArray] = useState<Array<number>>([]); 


  /*
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
  } */


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
    <div>Num:|{num}|</div> 
    <div>Bool:|{JSON.stringify(bool)}|</div> 
    <div>NumArray:{JSON.stringify(numArray)}</div> 
    <div>Str:|{str}|</div> 

    <div> 
      InputData: 
      <InputData value={bool} onSendValue={(value) => { 
          console.log(value); 
          setBool(value); 
        }} /> 
    </div> 

    <div>
      InputString:
      <InputData value={str} onSendValue={(value:string) => { 
        console.log(value); 
        setStr(value); 
      }} /> 
    </div>

    <div>
      InputNumber:
      <InputData value={num} onSendValue={(value) => { 
        console.log(value); 
        setNum(value); 
      }} /> 
    </div>

    <div> 
      <div>{JSON.stringify(numArray)}</div> 
      InputArray: 
      <InputArray value={numArray} type={EnumType.NUMBER} onSendValue={ 
        (value:number[]) => { 
          console.log(value); 
          setNumArray([...value])
        }} />
    </div>
  </div> 
} 


/*
      /*<div>|{str}|</div> 
      <div>|{JSON.stringify(bool)}|</div> 
      <div>|{numSelect}|</div> 
      <div>|{numSelects}|</div> 

    <div> 
        InputData: 
        <InputData value={str} onSendValue={(value) => setStr(value)} /> 
      </div> 

      <div> 
        InputData: 
        <InputData value={bool} onSendValue={(value) => setBool(value)} /> 
      </div> 

      <div> 
        <InputSelect value={numSelect} options={options} onSendValue={(value) => setSelect(value)} /> 
        <InputSelect value={numSelects} options={options} onSendValue={(value) => setSelects(value)} isMulti /> 
      </div> 
<div>
        <div>{JSON.stringify(numArray)}</div>
        InputArray:
        <InputArray value={numArray} type={EnumType.NUMBER} onSendValue={
          (value:number[]) => {
            console.log(value); 
            setNumArray([...value] as number[])
          }} />
      </div>
*/

/*
<InputData value={0} type={'number'} onBlur={OnBlurNumber} validation={ValidateNum} checkDisplay /> 
<InputData value={''} type={'string'} onBlur={OnBlurString} validation={ValidateStr} checkDisplay formatter={FormatterStr}/> 

<InputSelect value={numSelect} onBlur={(selection) => {setSelect(selection)}} options={options} /> 
<InputSelect value={numSelects} isMulti onBlur={(selection) => {setSelects(selection)}} options={options} /> 

<InputArray values={[0,2,3]} defaultValue={0} type={'number'} onBlur={(newValues) => {console.log(newValues)}} /> 
*/