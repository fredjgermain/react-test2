import {useState} from 'react'; 
import {Collection, Column} from './collection'; 
import {MonGooseMetadata, IEntry} from './interfaces'; 
import {crud} from '../../../crud'; 

export const collections: Array<Collection> = []; 




// https://gist.github.com/LachlanArthur/bb87bcd2c8825dd499cb71a1176a4c26
export default function sprintf( strings: TemplateStringsArray, ...indices: number[] ) {
	return ( ...values: string[] ) =>
		strings.reduce( ( total, part, index ) =>
			total + part + ( values[ indices[ index ] ] || '' ), ''
		);
}

/*const test = sprintf`There are ${0} monkeys in the ${1}.`( ''+true, 'tree' ); 
console.log(test); */


// LOADER =======================================
export class Loader { 
  public ready:boolean; 
  public LoadFunc:any; 
  private setReady:any; 
  
  constructor(LoadFunc:any) { 
    const [ready, setReady] = useState(false); 
    this.ready = ready; 
    this.setReady = setReady; 
    this.LoadFunc = LoadFunc; 
  } 
  
  public async Reload() :Promise<void> { 
    await this.LoadFunc(); 
    this.setReady(true); 
    return; 
  } 
} 

// LOAD COLLECTIONS ================================
export const LoadCollections = async() => { 
  const collectionsMeta = (await crud.Read('collections')).data; 
  for(let i = 0; i < collectionsMeta.length; i++) { 
    const col = collectionsMeta[i]; 
    const newCollection = new Collection(); 
    collections.push(newCollection); 
    newCollection.accessor = col.collectionName; 
    newCollection.label = col.collectionLabel; 
    newCollection.columns = await ExtractColumns(col.collectionName); 
    newCollection.data = (await crud.Read(col.collectionName)).data; 
  } 
} 

const ExtractColumns = async (collectionAccessor:string): Promise<Array<Column>> => { 
  return await crud.Models(collectionAccessor) 
    .then(res => {
      if(!res.data || !res.data.paths) 
        return; 
      const cols = Object.keys(res.data.paths).filter(c => c[0] != '_'); 
      return cols.map( (c) => { 
        return ExtractColumn(c, res.data.paths[c] as MonGooseMetadata); 
      }) 
    }) 
    .catch(err => err); 
} 

const ExtractColumn = (accessor:string, col:MonGooseMetadata):Column => { 
  function GetDefaultValue(type:string, options:any):any { 
    if(options['defaultValue']) 
      return options['defaultValue']; 
    if(options['default']) 
      return options['default']; 
    if(type === 'Array') 
      return []; 
    return ''; 
  } 

  return new Column( 
    accessor, 
    col.options.label ?? '',
    col.instance, 
    col.$embeddedSchemaType?.instance ?? '', 
    col.options.ref ?? '', 
    col.options, 
    GetDefaultValue(col.instance, col.options), 
    col.options.format ?? "${value}"
    ); 
}
