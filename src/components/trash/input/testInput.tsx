import React, {useState, useRef} from 'react'; 
import {IInput, IOption, InputData, InputNumber, InputBool, 
  InputString, InputSelect, InputArray, EnumType} from '../input2/inputcommon'; 

/*
Testing
!! inputnumber
!! inputstring
!! inputboolean
!! inputdata
!! InputArray-Number


!! InputSelect-Number
!! InputSelect-Numbers


*/


export default function TestInput() { 
  const userefNum = useRef<any>(null); 

  const [num, setNum] = useState(0.5); 
  const [str, setStr] = useState(''); 
  const [bool, setBool] = useState(false); 

  // Selection
  const [numSelect, setSelect] = useState([0]); 
  const [numSelects, setSelects] = useState([0]); 

  // Array
  const [numArray, setNumArray] = useState<Array<number>>([]); 
  const [strArray, setStrArray] = useState<Array<string>>([]); 
  const [boolArray, setBoolArray] = useState<Array<boolean>>([]); 

  const testValue = [1,2,3]; 
  //console.log([testValue, typeof testValue]); 

  const options:IOption[] = [
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
    {value:3, label:'option 3'}, 
    {value:4, label:'option 4'}, 
  ]
  
  const ref = useRef<any>(null); 

  // RENDER -------------------------------------
  return <div> 
    Test input; 
    <div>Num:|{num}|</div> 
    <div>Bool:|{JSON.stringify(bool)}|</div> 
    <div>NumArray:{JSON.stringify(numArray)}</div> 
    <div>Str:|{str}|</div> 
    <div>Select |{numSelect}|</div>
    <div>Selects |{numSelects}|</div>
  
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
  
} 

       
        
/*
<InputData value={0} type={'number'} onBlur={OnBlurNumber} validation={ValidateNum} checkDisplay /> 
<InputData value={''} type={'string'} onBlur={OnBlurString} validation={ValidateStr} checkDisplay formatter={FormatterStr}/> 

<InputSelect value={numSelect} onBlur={(selection) => {setSelect(selection)}} options={options} /> 
<InputSelect value={numSelects} isMulti onBlur={(selection) => {setSelects(selection)}} options={options} /> 

<InputArray values={[0,2,3]} defaultValue={0} type={'number'} onBlur={(newValues) => {console.log(newValues)}} /> 
*/