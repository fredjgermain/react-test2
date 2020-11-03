import React, { useState, useEffect, useContext } from 'react'; 
import {IEntry, EnumMode, IRow} from '../proxy/interfaces'; 
import {ActiveDataContext} from '../collections/collections'; 
import EntryBtn from './entrybtn'; 
import FieldCell from './fieldcell'; 


type EntryRowContextType = { 
  editableEntry:IEntry; 
  modeHook:{ 
    mode:any; 
    setMode:any; 
  }; 
} 

export const EntryRowContext = React.createContext({} as EntryRowContextType); 

type Props = { 
  row?:IRow; 
  modearg?:EnumMode; 
} 
// ENTRY ROW ====================================
export default function EntryRow({row, modearg=EnumMode.Read}:Props) { 
  console.log('entryrow'); 
  const activeData = useContext(ActiveDataContext); 
  const {activeCollection, modeHook:{mode, setMode}} = useContext(ActiveDataContext); 
  const entry = row ? row.entry : activeCollection.GetDefaultEntry(); 
  const entryRowContext = {editableEntry:{...entry}, modeHook:{mode, setMode}} as EntryRowContextType; 

  console.log(activeData.modeHook);

  // Render -------------------------------------
  const entrycols = () => {
    if(mode === EnumMode.New) {
      return activeCollection.columns.map( (c,i) => { 
        return <td key={i} ></td>;
      }); 
    }
    return activeCollection.columns.map( (c,i) => { 
      return <FieldCell key={i} column={c} /> 
    }); 
  } 

  return <EntryRowContext.Provider value={entryRowContext}><tr> 
      <td>{row ? row.id: '+'}</td> 
      {entrycols()} 
      <td><EntryBtn/></td>
    </tr></EntryRowContext.Provider>
} 