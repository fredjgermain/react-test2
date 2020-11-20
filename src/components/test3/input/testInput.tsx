import React, {useState, useRef} from 'react'; 
import {IInput, IOption, InputData, InputNumber, InputBool, 
  InputString, InputSelect, InputArray, EnumType} from './inputcommon'; 


export default function TestInput() { 
  const userefNum = useRef<any>(null); 

  // single num
  const [num, setNum] = useState(0.5); 

  // single string
  const [str, setStr] = useState(''); 

  // single bool
  const [bool, setBool] = useState(false); 

  // array num
  const [nums, setNums] = useState([]); 

  // array string
  const [strs, setStrs] = useState([]); 

  // array bool
  const [bools, setBools] = useState([]); 

  // Selection
  const options:IOption[] = [
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
    {value:3, label:'option 3'}, 
    {value:4, label:'option 4'}, 
  ]
  const [numSelect, setSelect] = useState([0]); 
  const [numSelects, setSelects] = useState([0]); 
  
  const ref = useRef<any>(null); 

  const inputNum = <div> 
    <h4>Input num:</h4> 
    <div>|{num}|</div>
    <InputData value={num} onSendValue={setNum} /> 
  </div>

  const inputStr = <div> 
    <h4>Input str:</h4> 
    <div>|{str}|</div>
    <InputData value={str} onSendValue={setStr} /> 
  </div>

  const inputBool = <div> 
    <h4>Input bool:</h4> 
    <div>|{JSON.stringify(bool)}|</div> 
    <InputData value={bool} onSendValue={setBool} /> 
  </div>

  const inputNums = <div> 
    <h4>Input nums:</h4> 
    <div>|{JSON.stringify(nums)}|</div> 
    <InputArray value={nums} onSendValue={setNums} type={EnumType.NUMBER} /> 
  </div>

  const inputStrs = <div> 
    <h4>Input strs:</h4> 
    <div>|{JSON.stringify(strs)}|</div> 
    <InputArray value={strs} onSendValue={setStrs} type={EnumType.STRING} /> 
  </div>


  const inputBools = <div> 
    <h4>Input bools:</h4> 
    <div>|{JSON.stringify(bools)}|</div> 
    <InputArray value={bools} onSendValue={setBools} type={EnumType.BOOLEAN} /> 
  </div>

  const select = <div> 
    <h4>Input select:</h4> 
    <div>|{JSON.stringify(numSelect)}|</div> 
    <InputSelect value={numSelect} onSendValue={setSelect} options={options} /> 
  </div>

  const selects = <div> 
    <h4>Input selects:</h4> 
    <div>|{JSON.stringify(numSelects)}|</div> 
    <InputSelect value={numSelects} onSendValue={setSelects} options={options} isMulti/> 
  </div>

  // RENDER -------------------------------------
  return <div>
    {inputNum}
    {inputStr}
    {inputBool}
    {inputNums}
    {inputStrs}
    {inputBools}
    {select}
    {selects}
  </div>
} 

/*
<div> 

    <h4>Input num: </h4>

    <h4>Input num: </h4>

    <h4>Input num: </h4>

    <h4>Input num: </h4>

    <h4>Input num: </h4>

    <h4>Input num: </h4>
  ########################
    <div> 
      <InputNumber value={12} onSendValue={(value:number) => {console.log(value)}} useref={ref} /> 
      <div onClick={() => console.log(ref)} > 
        test 
      </div> 
    </div> 
  ########################

    <div> 
      InputData: 
      <InputData value={bool} onSendValue={(value) => { 
          console.log(value); 
          setBool(value); 
        }} /> 
    </div> 

    <div>
      InputString:
      <InputData value={str} onSendValue={setStr} /> 
    </div>

    <div>
      InputNumber:
      <InputData value={num} onSendValue={setNum} /> 
    </div>

    <div> 
      <div>{JSON.stringify(numArray)}</div> 
      InputArray-Number: 
      <InputArray value={numArray} type={EnumType.NUMBER} onSendValue={setNumArray} /> 
    </div> 

    <div> 
      <div>{JSON.stringify(strArray)}</div> 
      InputArray-String: 
      <InputArray value={strArray} type={EnumType.STRING} onSendValue={setStrArray} /> 
    </div> 

    <div> 
      <div>{JSON.stringify(boolArray)}</div> 
      InputArray-Boolean: 
      <InputArray value={strArray} type={EnumType.BOOLEAN} onSendValue={setStrArray} /> 
    </div> 

    <div> 
      <InputSelect value={numSelect} options={options} onSendValue={setSelect} /> 
      <InputSelect value={numSelects} options={options} onSendValue={setSelects} isMulti /> 
    </div>
  </div> 
  
*/