import React, {useState, useContext} from 'react'; 
import {IColumnSetting, IColumnSettingRule} from '../colsetting/columnsetting'; 
import { useColumnSetting } from '../hook/useColumnSetting';

// INPUT OBJECT =================================
interface IInputObjectContext { 
  Entry: any; 
  setEntry: any; 
  colsetting: IColumnSetting[]; 
}
export const InputObjectContext = React.createContext({} as IInputObjectContext); 

interface IInputObject{ 
  entry: any; 
  colsetting: IColumnSetting[]; 
} 
export default function InputObject({entry, colsetting, children}: React.PropsWithChildren<IInputObject>) { 
  const [Entry, setEntry] = useState(entry); 
  const columnSettings = useColumnSetting(colsetting); 
  
  const context = {Entry, setEntry, colsetting}; 
  // RENDER -------------------------------------
  return <InputObjectContext.Provider value={context}> 
    <div>{JSON.stringify(Entry)}</div> 
    <div>{children}</div> 
  </InputObjectContext.Provider> 
} 
