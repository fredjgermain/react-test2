import React from 'react'; 
import Select from 'react-select'; 



export interface IOption { 
  value: any; 
  label: string; 
} 

type Props = { 
  selected?: any; 
  options: Array<IOption>; 
  setSelected: any; 
  isMulti?: boolean; 
  attributes?:any; 
} 
// SELECTOR =====================================
export default function Selector({selected, options, setSelected, isMulti=false, attributes}:Props) { 
  const selectedOption = options.filter( (o:IOption) => [selected??[]].flat().includes(o.value) ) ?? {value:'', label:'Default value'}; 

  function OnChange(selection:any) { 
    selection = [selection].flat(); 
    if(!selection || selection.length == 0 || !selection[0]) 
      setSelected(isMulti? []: '') // or default value ?? 
    else 
      setSelected(isMulti? selection.map( (o:IOption) => o.value): selection[0].value); 
  } 
  const size = 10; 
  return <Select isMulti={isMulti} value={selectedOption??[]} options={options}
    onChange={(selection) => OnChange(selection)} 
    {...attributes} />; 
}