import React, {useState, useContext, useEffect} from 'react'; 
import {CrudTableContext} from './crudtable'; 
import CrudCell from './crudcell'; 
import CrudInlineBtn from './crudinlinebtn'; 


interface ICrudRowContext { 
  entry: IEntry; 
  activeModeHook: {activeMode:string, setActiveMode:any}; 
} 
export const CrudRowContext = React.createContext({} as ICrudRowContext); 

interface ICrudRow { 
  entry: IEntry; 
  mode?: string; 
  rowSpecificColumnSetting?: IField;   // use either the row rowSpecificColumnSetting of default to table columnSettings 
} 
// CRUDROW ======================================
export default function CrudRow({entry, mode='read'}:ICrudRow) { 
  const crudTableContext = useContext(CrudTableContext); 
  const {datas, columnSettings, fieldFormats} = crudTableContext.crudTable; 
  const [activeMode, setActiveMode] = useState(mode); 

  // RENDER -------------------------------------
  return <CrudRowContext.Provider value={{entry, activeModeHook:{activeMode, setActiveMode}}}>
  <tr> 
    {columnSettings.map( (ifield,i) => { 
      // const value = entry[ifield.accessor]; 
      const value = entry[ifield.accessor] ?? ifield.defaultValue; 
      const setValue = (newValue:any) => {console.log(newValue)}; 

      /*
      const setValue = (newValue:any) => { 
        const modEntry = {...entry}; 
        modEntry[ifield.accessor] = newValue; 
        setEntryHook(modEntry); 
      } */
      return <CrudCell key={i} {...{ifield, value, mode}} /> 
    })} 
    <td> 
      <CrudInlineBtn /> 
    </td> 
  </tr> 
  </CrudRowContext.Provider>
} 
