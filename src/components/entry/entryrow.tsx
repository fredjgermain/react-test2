import React, { useState, useEffect, useContext } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IEntry, EnumMode, IRow} from '../proxy/interfaces'; 
import {ActiveCollectionContext} from '../collections/collections'; 
import {CollectionTableContext} from '../collections/collectiontable'; 
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
  const activeCollection = useContext(ActiveCollectionContext); 
  const [mode, setMode] = useState(modearg); 

  /*useEffect(() => { 
    setMode()
  },[row]) */
  
  //const [id, setId] = useState(row?.id); 
  
  /*if(id != row?.id) 
    console.log([id, row?.entry._id]); */

  const entry = row ? row.entry : activeCollection.GetDefaultEntry(); 
  const entryRowContext:EntryRowContextType = {editableEntry:{...entry}, modeHook:{mode, setMode}}; 
  
  //entryRowContext.editableEntry._id

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

  // Render -------------------------------------
  return <EntryRowContext.Provider value={entryRowContext}><tr> 
      <td>{row ? row.id: '+'}</td> 
      {entrycols()} 
      <td><EntryBtn/></td>
    </tr></EntryRowContext.Provider>
} 