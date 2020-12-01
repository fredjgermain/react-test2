
const ifields: IField[] = [
  {
    accessor:'_id', 
    label:'ID', 
    defaultValue: '', 
    type:'string', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'v1', 
    label:'Var1', 
    defaultValue: 0, 
    type:'number', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'v2', 
    label:'Var2', 
    defaultValue: 0, 
    type:'number', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{}, 
  },
  {
    accessor:'enum', 
    label:'Enum', 
    defaultValue: '', 
    type:'string', 
    format:'', 
    subtype:'', 
    modeltype:'', 
    options:{ 
      enum: ['t1','t2','t3','t4'] 
    }, 
  }
]

const data:IEntry[] = [
  {_id:'1', v1:1, v2:2},
  {_id:'2', v1:5, v2:9},
  {_id:'3', v1:4, v2:8},
  {_id:'4', v1:6, v2:10},
  {_id:'5', v1:3, v2:12},
  {_id:'6', v1:6, v2:10},
  {_id:'7', v1:4, v2:12},
  {_id:'8', v1:6, v2:6},
  {_id:'9', v1:3, v2:8},
  {_id:'10', v1:6, v2:1},
  {_id:'11', v1:3, v2:4},
]; 

export {ifields, data};