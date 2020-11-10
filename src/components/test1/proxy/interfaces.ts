

export interface IRow { 
  id:number; 
  entry:IEntry; 
} 

export interface IEntry { 
  _id: string; 
  [key:string]:any; 
} 

export interface IResult { 
  data: any; 
  err: any; 
} 

export interface IFeedback {
  oks: Array<string>; 
  errs: Array<string>; 
}

export interface IFeedbackHook {
  feedback: IFeedback, 
  setFeedBack: any, 
}

export enum EnumMode { 
  Read, New, Create, Update, Delete 
} 

export interface MonGooseMetadata { 
  instance:string; 
  options: { 
    ref?: string; 
    label?: string; 
    sortType?: string; 
    defaultValue?: any; 
    [key:string]:any; 
  }; 
  $embeddedSchemaType?:{
    instance:string; 
  }; 
  [key:string]:any; 
} 

