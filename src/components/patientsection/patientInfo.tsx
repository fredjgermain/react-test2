import React, {useState, useContext} from 'react'; 
import {PatientContext} from './patientid'; 
import {InputString} from '../custompackages'; 


// This page is meant to allow a patient to update his personal infos. 
export default function PatientInfo() { 
  const {date, patient} = useContext(PatientContext); 
  const [patientHook, setPatient] = useState(patient); 
  


  
  return <div>
    
  </div>; 
}