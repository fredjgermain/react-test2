import React, {useState, useMemo} from 'react'; 
import {LoadCollections, useLoad, InputString} from '../custompackages'; 

// Identification of patient 

// Ramq number 
// once identified a patient personal info appears. 

// Make a custom hook for find loading and finding particular items. 


interface IPatient extends IEntry { 
  firstName:string, 
  lastName:string, 
  ramq:string, 
} 

interface IPatientContext { 
  date:string;
  patient:IPatient; 
} 
export const PatientContext = React.createContext({} as IPatientContext); 
// PATIENT ID ===================================
export default function PatientId() { 
  const date = 'today ...'; 
  const [ramq, setRamq] = useState(''); 
  const [patient, setPatient] = useState({} as IPatient); 
  
  // Identification test 
  const {status, Reload} = useLoad(async () => { 
    const patients = await LoadCollections(['patients']); 
    // find patient with input ramq. 
    const foundPatient = patients[0].entries.find( p => (p as IPatient).ramq === ramq); 
    if(foundPatient) 
      setPatient(foundPatient as IPatient); 
  }); 

  let identification = <span>Type your ramq number for identification</span>; 
  let personalInfo = <div>Personal info ...</div>; 
  if(status.success && JSON.stringify(patient) === "{}") {  // Unsuccessful identification 
    identification = <span>Incorrect identification</span>; 
  } 
  if(status.success && JSON.stringify(patient) != "{}") {   // Successful identification
    identification = personalInfo = <span></span>; 
  }
  
  // render 
  return <PatientContext.Provider value={{patient, date}}> 
    <p>{identification}</p> 
    <div> 
      <span>RAMQ:</span> 
      <InputString value={ramq} onSendValue={(value) => setRamq(value)} /> 
    </div> 
    <div> 
      {personalInfo} 
    </div> 
  </PatientContext.Provider>; 
} 