import React, {useContext} from 'react'; 
import {InputObjectContext} from './inputobject'; 
import { IColumnSetting } from './inputtable';


// INPUT FIELDS =================================
interface IInputFields {}
export function InputFields({children}: React.PropsWithChildren<IInputFields>) { 
  const {Entry, setEntry, colsetting} = useContext(InputObjectContext); 

  return <div> 
    {colsetting.map( (column,i) => { 
      return <div>
        <InputField key={i} {...{column, children}} /> 
      </div>
    })}
  </div> 
} 

// INPUT FIELD ==================================
interface IInputField { 
  column:IColumnSetting 
} 
export function InputField({column, children}: React.PropsWithChildren<IInputField>) { 
  const {Entry, setEntry} = useContext(InputObjectContext); 
  const {ifield, renderer} = column; 

  const value = Entry[ifield.accessor]; 
  const onSendValue = (newValue:any) => setEntry(newValue); // setEntry(newValue, ifield) 
  // RENDER --------------------------------------
  return <div>
    <span>{ifield.label}:</span>
    <span>{renderer(value, onSendValue)}</span>
  </div>; 
}

export function InputFieldLabel() { 
  return <div></div> 
} 

export function InputFieldRenderer() { 
  return <div></div> 
} 