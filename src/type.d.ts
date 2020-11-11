
/*interface ICrudContext { 
  collections: Array<Collection>; // local store of all data. 
  selectedCollection?: ICollection; // selected collection. 
  result?: IResult; 

  Create: (entry:IEntry) => Boolean; 
  Update: (entry:IEntry) => Boolean; 
  Delete: (entry:IEntry) => Boolean; 
} */

interface ITableDataAction { 
  Create: (entry:IEntry) => Promise<Boolean>; 
  Update: (entry:IEntry) => Promise<Boolean>; 
  Delete: (entry:IEntry) => Promise<Boolean>; 
  //Sort?: 
} 


interface IRow { 
  id:number; 
  entry:IEntry; 
} 

interface IColumn {} 


interface ICollection {
  accessor:string; 
  label: string; 
  fields: Array<IField>; 
  entries: Array<IEntry>; 
}

interface IEntry { 
  _id: string; 
  [key:string]:any; 
} 

interface IField { 
  accessor: string; 
  label: string; 
  type: string; 
  subtype: string; 
  modeltype: string; 
  options: any; 
  defaultValue: any; 
  format: any; 
  sort?: any; 

  cellMode:{ 
    read:(value:any) => any, 
    edit:(value:any, setValue:any) => any, 
    //hover: defaultDisplay, 
  } 
} 


interface IResponse { 
  success: boolean; 
  data?: any[]; 
  err?: any[]; 
} 
