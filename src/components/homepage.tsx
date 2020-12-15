import React, {useState} from 'react';


/* 
Display 2 links 
  - 1 link for admins. 
  - 1 link for patients. 

On click, load corresponding data. 
Once loaded, display corresponding section. 

*/

export default function HomePage() { 
  const [section, setSection] = useState(''); 
  
  if(!section) 
    return <div> 
      <a onClick={() => setSection('patient')} >Patient section</a> 
      <a onClick={() => setSection('admin')} >Admin section</a> 
    </div>; 

  if(section === 'patient') 
    return <div> 
      <a>Patient section</a> 
      <a onClick={() => setSection('admin')} >Admin section</a> 
    </div>; 

  if(section === 'admin') 
    return <div> 
      <a onClick={() => setSection('patient')} >Patient section</a> 
      <a>Admin section</a> 
    </div>; 
}