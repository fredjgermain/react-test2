import React from 'react'; 

interface Props{ 
  data:any[], 
  from:number, 
  to:number, 
  pageIndex:number, 
  setPageIndex:any, 
  pageIndexes:number[] 
}
export default function AdminPager({data, from, to, pageIndex=0, setPageIndex, pageIndexes}:Props) { 
  return <div> 
    <div> 
      Page {pageIndex+1} of {pageIndexes.length} 
    </div> 
    <div> 
      Items {from} to {to} of {data.length} 
    </div>
    <div> 
      {pageIndexes.map( (p,i) => 
        <button key={i} disabled={pageIndex===i} onClick={() => setPageIndex(i)} >{i+1}</button> 
      )} 
    </div>
  </div>; 
}