import React, {useContext} from 'react'; 
import {TestContext} from './contexter'; 

export default function ComponentA () { 
  console.log('Component A'); 
  const valueTest = useContext(TestContext); 

  return <div>{JSON.stringify(valueTest)}</div>; 
}