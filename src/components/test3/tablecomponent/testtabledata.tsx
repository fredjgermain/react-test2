import React from 'react'; 
/*import TableData from './tabledata'; 
//import {IField, ICrudTable, IEntry, IRow} from './tableinterfaces'; 
import {collection1, collection3} from '../../test2/common/data'; 
import Selector, {IOption} from '../../test2/input/selector'; 

import '../../test2/common/table.css'; 

const data = [...collection3]; 


function GetMainField(item:any):string { 
  return Object.keys(item).find( k => !(k.includes('_') ) ) ?? ''; 
} 

function GetForeignCollection(foreignCollection:string):Array<any> { 
  const collection = collection1;                   // replace dummy with real search results 
  return collection; 
}

function GetForeignOptions(foreignCollection:string):Array<IOption> { 
  const collection = GetForeignCollection(foreignCollection); 
  const mainField:string = GetMainField(collection[0]);    // find main field using columns rather than Object.keys ... 
  if(!mainField || !collection) 
    return []; 
  return collection1.map( (c:any) => { 
    return {value:c._id, label:c[mainField]}; 
  } ); 
} 

function GetForeignValue(foreignCollection:string, foreignId:string) { 
  const collection = GetForeignCollection(foreignCollection); 
  const mainField:string = GetMainField(collection[0]);    // find main field using columns rather than Object.keys ... 
  const defaultValue = '';      // replace with real defaultValue 
  if(!mainField || !collection) 
    return defaultValue; 
  const foreignItem = collection.find( c => c._id === foreignId ); 
  return foreignItem? foreignItem[mainField] : defaultValue; 
} 

const selectForeign = (foreignCollection:string, foreignId:string, setForeign:any) => { 
  const options = GetForeignOptions(foreignCollection); 
  console.log(options); 
  return <Selector selected={foreignId} setSelected={setForeign} options={options} /> 
} 

//const InputField ...


// Manage error message 
const crud:ITableDataAction = { 
  Create: (item:any) => { 
    console.log(['update', item]); 
    data.push(item); 
  }, 
  Update: (item:any) => {
    const index = data.findIndex( c => c._id === item._id); 
    console.log(['update', data, item, index]); 
    console.log(item); 
    console.log(data[index]); 
    data[index] = {...item}; 
    console.log(data[index]); 
  }, 
  Delete: (item:any) => { 
    const index = data.findIndex( c => c._id === item._id); 
    console.log(['delete', data, item, index]); 
    data.splice(index,1); 
    console.log(data); 
  }, 
}


// TEST TABLE DATA ==============================
export default function TestTableData() { 
  const columnSettings:Array<IField> = [{ 
    cellMode: { 
      read: (value:any) => {return JSON.stringify(value)}, 
      edit: (value:any, setValue:any) => {return JSON.stringify(value)}, 
    }, 
    accessor:'_id', 
  }, 
  { 
    cellMode: { 
      read: (value:any) => {return JSON.stringify(value)}, 
      edit: (value:any, setValue:any) => {return JSON.stringify(value)}, 
    }, 
    accessor:'field1', 
  }, 
  { 
    cellMode:{ 
      read: (value:any) => {return JSON.stringify( collection1.find( c => c._id === value )?.age + " years old" )}, // get foreign value 
      edit: (value:any, setValue:any) => { 
        return selectForeign("collection1", value as string, setValue); 
      }, 
    }, 
    accessor:'collection1', 
  }] 

  return <TableData rows={data} columnSettings={columnSettings} crud={crud} />; 
}*/