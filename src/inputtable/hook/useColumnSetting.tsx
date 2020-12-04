import {useState, useEffect} from 'react'; 
import {IColumnSetting} from '../colsetting/columnsetting'; 
import {ITableHook} from './usetable'; 



// useColumnSetting ===========================
export function useColumnSetting(defaultColumnSetting:IColumnSetting[]) { 
  const [columnSettings, setColumnSettings] = useState(defaultColumnSetting); 

  useEffect(() => { 
    setColumnSettings(defaultColumnSetting); 
  },[JSON.stringify(defaultColumnSetting)]); 

  function GetColumnSettings(table?:ITableHook, row?:number):IColumnSetting[] { 
    const ifields = GetFields(); 
    return ifields.map( f => { 
      return GetIColumnSetting(f, table, row); 
    }); 
  } 

  function GetIColumnSetting(ifield:IField, table?:ITableHook, row?:number):IColumnSetting { 
    const defaultCol = columnSettings.find( c => c.ifield.accessor === ifield.accessor && !c.predicate); 
    if(table === undefined || row === undefined) 
      return defaultCol ?? {} as IColumnSetting; 
    const activeCol = columnSettings.find( c => c.ifield.accessor === ifield.accessor && c.predicate && c.predicate(table, row)); 
    return activeCol ?? defaultCol ?? {} as IColumnSetting; 
  } 

  function GetFields():IField[] { 
    const ifields:IField[] = []; 
    columnSettings.forEach( c => { 
      if(ifields.every(f => f.accessor != c.ifield.accessor)) 
        ifields.push(c.ifield); 
    }); 
    return ifields; 
  } 

  // FilterColumnSetting
  function FilterColumns(columns:string[]) { 
    const filtered:(IColumnSetting|undefined)[] = columns.map( (c,i) => { 
      const found = defaultColumnSetting.find( cs => cs.ifield.accessor === c); 
      if(found) 
        found.order = i; 
      return found; 
    }); 
    if(filtered === undefined || filtered.length ===0) 
      return; 
    setColumnSettings(filtered as IColumnSetting[]); 
  } 

  return {GetColumnSettings, FilterColumns}; 
}
