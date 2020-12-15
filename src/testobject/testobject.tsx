import React, {useState, useContext} from 'react'; 
import InputData from '../input/inputdata/inputdata'; 
import InputObject, {InputObjectContext} from '../inputobject/components/inputobject'; 
import {FieldRenderer, FieldContext, FieldLabel, Fields} from '../inputobject/components/fields'; 
import {IColumnSetting, IFieldRendering, IForeignValues, BuildFieldRendering} from '../inputobject/components/common'; 


const ifield = {accessor:'a', label:'A', type:'string', subtype:'', modeltype:'', format:'', defaultValue:'', options:{}}; 

const columnSettings:IColumnSetting[] = [ 
  {ifield:{...ifield}, order:1}, 
  {ifield:{...ifield, accessor:'b', label:'B', type:'number'}, order:1}, 
  {ifield:{...ifield, accessor:'c', label:'C'}, order:-1}, 
]; 

const foreignOptions:IOption[] = [ 
  {value:'1', label:'foreign option 1'}, 
  {value:'2', label:'foreign option 2'}, 
  {value:'3', label:'foreign option 3'}, 
]

const foreignValues:IForeignValues = { 
  GetForeignOptions:(ifield:IField) => foreignOptions, 
  GetForeignValue:(ifield:IField, id:string) => foreignOptions.find(i=>i.value === id) 
} 

// TEST OBJECT ==================================
export default function TestObject() { 
  const [obj, setObj] = useState({a:"test", b:12, c:"asdasdsa"}); 
  const fieldRenderings = BuildFieldRendering(foreignValues); 

  // Render -------------------------------------
  return <div> 
    {JSON.stringify(obj)} 
    <div> 
    <InputObject {...{obj, setObj, columnSettings}}> 
      <p>this is an object</p> 
      <Fields> 
        <FieldLabel/> <FieldRenderer {...{fieldRenderings}} /> 
      </Fields> 
    </InputObject> 
    </div> 
  </div> 
} 

