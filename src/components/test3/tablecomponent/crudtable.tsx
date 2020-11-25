import React, {useState} from 'react'; 
//import { TableContext } from '../../test2/collections/collectiontable'; 


interface ICrudTableContext { 
  activeEntry:{entryHook:IEntry, setEntryHook:any}; 
  activeMode: string; 
  crudTable: ICrudTable; 
} 
export const CrudTableContext = React.createContext({} as ICrudTableContext); 

interface ICrudTable { 
  datas: IEntry[]; 
  columnSettings:IField[]; 
  fieldFormats: IFieldFormat[]; 
  crudSettings: ICrudSettings; 
} 
export default function CrudTable(props: React.PropsWithChildren<ICrudTable>) { 
  const children = props.children; 
  const {datas, columnSettings, fieldFormats, crudSettings} = props; 
  const [entryHook, setEntryHook] = useState<IEntry>({} as IEntry);

  // DISPLAY EVERY CHILDREN ...

  // RENDER -------------------------------------
  const crudTableContext = { 
    activeEntry:{entryHook, setEntryHook}, 
    activeMode:'read', 
    crudTable:{datas, columnSettings, fieldFormats, crudSettings}} as ICrudTableContext; 

  const feedBackTest = Object.keys(entryHook).map( (k,i) => {
    return <div key={i}>{k}:{JSON.stringify(entryHook[k])}</div>; 
  });
  //{JSON.stringify(entryHook)}
  return <CrudTableContext.Provider value={crudTableContext} > 
    <div style={{fontSize:'1.5ch'}}> {feedBackTest}</div>
    <table>
      {children}
    </table>
  </CrudTableContext.Provider>
}



