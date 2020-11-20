import React, {useRef} from 'react'; 
import { EnumType } from './inputcommon';



/*
set useref 


*/
export interface IInput<T> { 
  value?:T; 
  type?:EnumType; 
  useref?: any;             // ref Input. contains values to be accessible by the parent

  SetValue?:(value:T) => void;                  // received from Hook 

  OnSendValue?:() => void;    // to be defined from the parent. 
  OnBlur?:() => void;         // use target.value or target.valueAsNumber ...
  OnPressEnter?:() => void;   // use target
  OnChange?:() => void;       // use target
  

  //attribute?:HTMLInputElement;                // allows to pass attribute to the child element??
  target?:React.RefObject<HTMLInputElement>;    // ref sub element input 
} 

interface IInputHook<T> { 

}


export default function Input<T>({
    target=React.createRef<HTMLInputElement>(), 
    ...props}:IInput<T>) { 
  
  const v:any = 0; 
  const it = {
    value:v as T,
    SetValue:(value:T) => {console.log(value)}
    
  } as IInput<T>; 


  if(props.useref) 
    props.useref.current = it; 
  
   //= React.createRef<HTMLInputElement>(); 

  const onClick = () => { 
    console.log(target); 
  } 

  return <input type={'text'} ref={target} onClick={onClick}/>; 
}