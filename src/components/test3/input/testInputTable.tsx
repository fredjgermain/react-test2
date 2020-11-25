import React, {useState, useRef} from 'react'; 
import {IInput, IOption, InputData, InputNumber, InputBool, 
  InputString, InputSelect, InputArray, EnumType} from './inputcommon'; 
import InputTable, {IColumnSetting} from './inputtable/inputtable'; 
import InputRows, {InputRow} from './inputtable/inputrow'; 
import InputCells from './inputtable/inputcells'; 
import InputRowBtn from './inputtable/inputrowbtn'; 


export default function TestInputTable() { 

  const tableData = [
    {_id:1, v1:1, v2:2},
    {_id:2, v1:5, v2:9},
    {_id:3, v1:4, v2:8},
    {_id:4, v1:6, v2:10},
    {_id:5, v1:3, v2:12},
    {_id:6, v1:6, v2:10},
    {_id:7, v1:4, v2:12},
    {_id:8, v1:6, v2:6},
    {_id:9, v1:3, v2:8},
    {_id:10, v1:6, v2:1},
    {_id:11, v1:3, v2:4},
  ]; 
  const [tableNum, setTableNum] = useState(tableData); 

  const [activeRow, setActiveRow] = useState(-1); 

  const readfunc = (value:any, onSendValue:any) => {return <span>{value}</span>}; 
  const editfunc = (value:any, onSendValue:any) => {return <InputData {...{value, onSendValue}} />}; 

  const colsettingsRead = [ 
    {field:'_id', defaultValue:0, renderFunc:readfunc}, 
    {field:'v1', defaultValue:0, renderFunc:readfunc}, 
    {field:'v2', defaultValue:0, renderFunc:readfunc}, 
  ] as IColumnSetting[]; 

  const colsettingsEdit = [ 
    {field:'_id', defaultValue:0, renderFunc:editfunc}, 
    {field:'v1', defaultValue:0, renderFunc:editfunc}, 
    {field:'v2', defaultValue:0, renderFunc:editfunc}, 
  ] as IColumnSetting[]; 
  const colsettings = {read:colsettingsRead, edit:colsettingsEdit}; 

  //<InputCells columns={colsettings} /> 
  const indexes = tableNum.map( (v,i) => i); 
  const section = []; 

  if(activeRow>=0 && activeRow < indexes.length) { 
    section.push(indexes.slice(0,activeRow)); 
    section.push(indexes.slice(activeRow,activeRow+1)); 
    section.push(indexes.slice(activeRow+1)) 
  }
  else {
    section.push(indexes.slice(0)); 
    section.push(indexes.slice(0,0)); 
    section.push(indexes.slice(0,0)); 
  }
  console.log(section);

  const create = () => {console.log('create')}; 

  const table = <div> 
    <h4>Input table:</h4> 
    <InputTable entries={tableNum} columnSettings={colsettings} onSendValue={(newEntries:any[]) => {console.log(newEntries)}} > 
      <tbody> 
        <InputRows> 
          <InputCells /> 
          <InputRowBtn /> 
        </InputRows> 
      </tbody> 
      <tfoot> 
        <InputRow row={-1}> 
          <InputCells /> 
          <InputRowBtn /> 
        </InputRow>
      </tfoot>
    </InputTable> 
  </div> 


/*

<InputRows rows={section[0]}> 
          <InputCells columns={colsettingsRead} /> 
          <InputRowBtn /> 
        </InputRows> 

        <InputRows rows={section[1]}> 
          <InputCells columns={colsettingsEdit} /> 
          <InputRowBtn /> 
        </InputRows> 

        <InputRows rows={section[2]}> 
          <InputCells columns={colsettingsRead} /> 
          <InputRowBtn /> 
        </InputRows> 
      <tfoot>
        <InputRow> 
          <InputCells columns={colsettingsCreate} /> 
          <InputRowBtn label={'create'} func={create} /> 
        </InputRow> 
      </tfoot> 
*/

  return <div>{table}</div> 
} 
