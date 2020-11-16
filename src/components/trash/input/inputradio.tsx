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
// INPUT RADIO ==================================
export default function InputRadio({selected, options, setSelected, attributes}:Props) { 
  function OnChange(selection:any) { 
    setSelected(selection) 
  } 

  return <div> 
    {options.map( (o:IOption, i:number) => { 
      return <div key={i} > 
          <input type={'radio'} value={o.value} checked={selected === o.value} 
            onChange={(event) => OnChange(event.target.value)} 
            {...attributes} /> 
          <label>{o.label}</label> 
        </div> 
      })} 
  </div> 
} 