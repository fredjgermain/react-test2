import React, { useState, useEffect, useContext } from 'react'; 
import {ActiveCollectionContext} from './collectionselector'; 
import Pager, {GetPage} from './pager'; 
import {data} from '../common/data'; 
import EntryRow from '../entry/entryrow'; 


export const TableContext = React.createContext({} as any); 
// COLLECTION TABLE =============================
export default function CollectionTable() { 
  console.log('Collection table'); 
  const activeCollection = useContext(ActiveCollectionContext); 
  const {label, data} = activeCollection; 
  const [pageIndex, setPageIndex] = useState(0); 
  const [feedback, setFeedback] = useState(0); 

  const [activeEntry, setActiveEntry] = useState({} as any); 
  const [activeMode, setActiveMode] = useState({} as any); // EnumMode ... 

  // On first render and on activeCollection changes 
  useEffect(() => { 
    console.log(activeCollection); 
  }, [activeCollection]); 

  // On first render and on pageIndex changes 
  useEffect(() => { 
    console.log(pageIndex); 
  }, [pageIndex]); 

  // Pager 
  const page = GetPage(data, pageIndex); 
  const pager = <Pager data={data} pageIndexHook={{pageIndex, setPageIndex}} />; 

  const tableContext = { 
    entryHook:{activeEntry, setActiveEntry}, 
    modeHook:{activeMode, setActiveMode} 
  };

  // RENDER -------------------------------------
  return <div> 
    <div>{JSON.stringify(activeEntry)}</div> 
    <div>{JSON.stringify(activeMode)}</div> 
    <h3>{label}</h3> 
    {pager} 
    <TableContext.Provider value={tableContext}> 
    <table> 
      <tbody> 
        {page.map( (row:any,i) => { 
          return <EntryRow key={i} row={row} /> 
        })} 
      </tbody> 
    </table> 
    </TableContext.Provider>
  </div>; 
} 