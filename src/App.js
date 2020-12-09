import React from 'react'; 
//import TestInputTable from './testtable/testInputTable'; 
/*import TestInput from './components/testinput/input/testInput'; 
import TestInput2 from './components/testinput/input/testInput2'; */
import AdminSection from './components/adminsection/adminsection'; 
import {crud} from './mongoosedao/crudaxios';


export default function App() { 
  //return <TestInput /> 
  //return <TestInput2 /> 
  //return <TestInputTable /> 
  async function Access() { 
    return await crud.Access(); 
  } 
  return Access(); 
  //return <AdminSection />; 
} 