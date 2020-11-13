import React, { useContext } from 'react';
import {AdminContext} from './admincontexter'; 

export default function AdminError() { 
  const {dao} = useContext(AdminContext); 
  const {response} = dao; 

  console.log(response); 
  if(!response) 
    return <div>|error?|</div>; 
    
  if(response.success) 
    return <div className='feedback_green'>|error?|{response.actionType}</div>; 
  else 
    return <div className='feedback_red'>|error?|{response.actionType} : {JSON.stringify(response.actionType)}</div>; 
}