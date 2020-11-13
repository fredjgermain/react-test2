import React from 'react';
import ComponentA from './componenta'; 

interface ITestContexter { 
  valueTest?: any[]; 
} 
export const TestContext = React.createContext<ITestContexter>({}); 

export default function Contexter() { 
  console.log('Contexter'); 

  return <TestContext.Provider value={{valueTest:['test']}}> 
    <ComponentA /> 
  </TestContext.Provider> 
}



