import React from 'react'; 


export interface IOption { 
  value: any; 
  label: string; 
}; 

type Props = { 
  selected?: any; 
  options: Array<IOption>; 
  setSelected: any; 
  attributes?: any; // regex ?? 
}; 

export default function InputDataList({selected, options, setSelected, attributes}:Props) { 
  function OnChange(selection:any) { 
    console.log(selection); 
  } 

  //return <div>{JSON.stringify(options)}</div>; 
  return <div>
    <input list="it" onChange={(event) => {console.log('option')}}/> 
    <datalist id="it"> 
    {options.map( (o:IOption, i:number) => { 
      return <option key={i} value={o.value} > 
        {o.label} 
      </option> 
    })} 
  </datalist>
  dataList
  </div>
}