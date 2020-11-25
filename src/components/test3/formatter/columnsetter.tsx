import DataAccessObject, {Collection, Field} from '../common/dao/dao';
// default exclude hidden fields ... 

type ColPredicate = (ifield:IField) => boolean; 
export default class ColumnSetter { 
  // ROW SORTING !!?? 

  // SEARCH METHODS ??!! 

  // COLUMN ORDERING !!?? 

  // EXTRA COLUMN (Sorting column at beginning, Btn colum at the end) 

  public static GetColumnSettings(ifs:IField[], predicate?:ColPredicate|string[]):IField[] { 
    // convert to Field, excluding hidden fields. 
    const fields = ifs.map( f => new Field(f) ).filter( f => !f.IsHiddenField) ?? []; 
    if(!fields.length) 
      return []; 
    const ifields = fields.map(f => f.ifield); 
    if(!predicate)
      return ifields; 
    if(Array.isArray(predicate)) 
      return ifields.filter( f => predicate.includes(f.accessor)) ?? []; 
    return ifields.filter( f => predicate(f)) ?? []; 
  } 
} 
