import React, { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'; 
import {Collection } from '../proxy/collection'; 
import {IEntry, IFeedbackHook, EnumMode} from '../proxy/interfaces'; 

// return an array of entries with index added to them for ease of sorting etc. 
const pageSize = 10; 

export function GetPage(entries:Array<any>, pageIndex:number) {
  const from = PageIndexes(entries)[pageIndex]; 
  return entries.slice(from, from+pageSize); 
} 

export function ItemsRange(entries:Array<any>, pageIndex:number) { 
  const from = PageIndexes(entries)[pageIndex]; 
  const to = Math.min(from+pageSize, entries.length); 
  return [from, to]; 
}

function PageIndexes(entries:Array<any>):Array<number> { 
  const pageIndexes = []; 
  for(let i = 0; i < entries.length; i += pageSize) 
    pageIndexes.push(i); 
  return pageIndexes; 
} 

type Props = { 
  data: any; 
  pageIndexHook: { 
    pageIndex: number; 
    setPageIndex: any; 
  } 
  pageSize?: number; 
}
// PAGER ========================================
export default function Pager({data, pageIndexHook, pageSize=10}:Props) { 
  const pageIndexes = PageIndexes(data); 
  const {pageIndex, setPageIndex} = pageIndexHook; 
  const [from, to] = ItemsRange(data, pageIndex); 

  // Pager
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
  