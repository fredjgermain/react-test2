import React, { useContext } from 'react'; 
import {InputTableContext, IColumnSetting, IColumnSettings} from './inputtable'; 


// INPUT HEADER ROW =============================
interface IInputHeaderRowContext {} 
export const InputHeaderRowContext = React.createContext({} as IInputHeaderRowContext); 
interface IInputHeaderRow { 
  children?: React.ReactNode; 
} 
export function InputHeaderRow({children}:React.PropsWithChildren<IInputHeaderRow>) { 

  return <InputHeaderRowContext.Provider value={{}}> 
      <tr>{children}</tr> 
    </InputHeaderRowContext.Provider> 
}

// INPUT CELLS ==================================
interface IInputHeaderContext {} 
export const InputHeaderContext = React.createContext({} as IInputHeaderRowContext); 
interface IInputHeader {   
  columnSetting?:IColumnSetting;
} 

export function InputHeader() { 
  const {columnSettings} = useContext(InputTableContext); 
  const ColumnSettings = columnSettings[0].columnSettings; 

  return <InputHeaderContext.Provider value={{}}> 
    {ColumnSettings.map( (column, i) => { 
      return <th key={i} >{column.ifield.label}</th> 
    })} 
  </InputHeaderContext.Provider> 
} 

/*
    
*/