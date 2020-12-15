import React, {useState, useContext} from 'react'; 
import InputData from '../input/inputdata/inputdata'; 
import {FieldRenderer, FieldContext, FieldLabel, Fields} from '../inputobject/components/fields'; 
import {IColumnSetting, IFieldRendering} from '../inputobject/components/common'; 
import Table from '../inputobject/components/table'; 
import {Rows, Row, Cells, Cell, CellContext} from '../inputobject/components/rows'; 


// IFieldRendering ==============================
function PredicateNumber() { 
  //const {obj, fieldRenderers, setObj} = useContext(InputObjectContext); 
  const {ifield} = useContext(CellContext); 
  return ifield.type==='number'; 
} 

function PredicateString() { 
  //const {obj, fieldRenderers, setObj} = useContext(InputObjectContext); 
  const {ifield} = useContext(CellContext); 
  return ifield.type==='string'; 
} 

function PredicateDefault() { 
  //const {obj, fieldRenderers, setObj} = useContext(InputObjectContext); 
  const {ifield} = useContext(CellContext); 
  return true; 
} 
const rendererNumber = (ifield:IField) => (value:any, onSendValue:any) => { return <span>{value} number ... </span> } 
const rendererString = (ifield:IField) => (value:any, onSendValue:any) => { return <span>{value} string ... </span> } 
const rendererDefault = (ifield:IField) => (value:any, onSendValue:any) => { return <span>{value} default ... </span> } 

const fieldRenderings:IFieldRendering[] = [ 
  {predicate:PredicateNumber, renderer:rendererNumber}, 
  {predicate:PredicateString, renderer:rendererString}, 
  {predicate:PredicateDefault, renderer:rendererDefault} 
]; 


const ifield = {accessor:'a', label:'A', type:'string', subtype:'', modeltype:'', format:'', defaultValue:'', options:{}}; 
const columnSettings:IColumnSetting[] = [ 
  { ifield:{...ifield}, order:-1}, 
  { ifield:{...ifield, accessor:'b', label:'B', type:'number'}, order:2}, 
  { ifield:{...ifield, accessor:'c', label:'C'}, order:1} 
]


interface TestEntry { 
  a:string, 
  b:number, 
  c:string, 
} 

export default function TestTable() { 
  const entries:TestEntry[] = [ 
    {a:"a1", b:12, c:'c1'}, 
    {a:"a2", b:13, c:'c2'}, 
    {a:"a3", b:14, c:'c3'}, 
  ] 

  return <Table {...{entries, columnSettings}} >
    <tbody>
      <Rows>
        <Cells>
          <Cell {...{fieldRenderings}}/>
        </Cells>
      </Rows>
    </tbody>
  </Table>
}