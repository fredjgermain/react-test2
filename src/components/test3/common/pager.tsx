import {useState} from 'react'; 

// As a reducer function ??
export type PageBreakPredicate = { 
  (accumulator:Array<any>, value?:any, index?:number):boolean; 
} 

export function usePager(data:any[], pageBreak:PageBreakPredicate|number) { 
  const [pageIndex, setPageIndex] = useState(0); 

  function PageBreak(entries:Array<any>, pageBreakPredicate:PageBreakPredicate|number):number[] { 
    if(typeof pageBreakPredicate === 'number') { 
      const pagesize = pageBreakPredicate > 0 ? pageBreakPredicate: 1; 
      return PageBreak(entries, (accumulator:Array<any>):boolean => accumulator?.length >= pagesize); 
    } 
    const pageIndexes = [0]; 
    const accumulator:any[] = []; 
    for(let i=0; i<entries.length-1; i++) { 
      accumulator.push(entries[i]); 
      if(pageBreakPredicate(accumulator, entries[i], i)) { 
        pageIndexes.push(i+1); // queue starting index of next page. 
        accumulator.splice(0); 
      } 
    } 
    return pageIndexes; // 
  } 

  function GetPage(entries:Array<any>, pageIndexes:number[], pageIndex:number):{page:any[], from:number, to:number} { 
    const pagei = pageIndex < 0 ? 0 : Math.min(pageIndex, pageIndexes.length-1); 
    const from = pageIndexes[pagei]; 
    const to = pageIndexes[pagei+1] ?? entries.length; 
    return {page:entries.slice(from, to), from:from, to:to}; 
  } 

  const pageIndexes = PageBreak(data, pageBreak); 
  return {pageIndex, setPageIndex,  pageIndexes, ...GetPage(data, pageIndexes, pageIndex) }; 
} 

/*
type Props = { 
  data: any[]; 
  pageIndexHook?: { 
    pageIndex: number; 
    setPageIndex: any; 
  } 
  pageBreak?: PageBreakPredicate|number; 
} 
// PAGER ========================================
export default function Pager({data, pageIndexHook, pageBreak=5}:Props) { 
  const {pageIndex, setPageIndex, from, to, page, pageIndexes} = usePager(data, pageBreak); 
  /*const pageIndexes = PageBreak(data, pageBreak); 
  const {pageIndex, setPageIndex} = pageIndexHook; 
  const {page, from, to} = GetPage(data, pageIndexes, pageIndex); 

  // Pager
  return <div> 
      <div>{page}</div>
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
  */