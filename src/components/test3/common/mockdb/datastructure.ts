import {IMongooseField, IMongooseCollection} from '../mongoosedata'; 
import { IEntry } from '../../tablecomponent/tableinterfaces'; 

export interface IPlayer extends IEntry { 
  class: String; 
  name:String; 
  age:Number; 
  sex:String; 
}

export interface IClass extends IEntry { 
  classname:String; 
} 

const playersFields:Array<IMongooseField> = [
  {
    accessor:'_id', 
    path: {
      instance: 'String', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        ref: 'classes', 
        label: 'Identifier', 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  },
  {
    accessor:'class', 
    path: {
      instance: 'ObjectID', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        ref: 'classes', 
        label: 'Identifier', 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  },
  {
    accessor:'name', 
    path: {
      instance: 'String', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        //ref: '', 
        label: 'Name', 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  }, 
  {
    accessor:'age', 
    path: {
      instance: 'Number', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        //ref: '', 
        label: 'Age', 
        min: 0, 
        max: 130, 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  }, 
  {
    accessor:'sex', 
    path: {
      instance: 'String', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        //ref: '', 
        label: 'Sex', 
        enum: ['male', 'female'], 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  } 
] 

const classesFields:Array<IMongooseField> = [
  {
    accessor:'_id', 
    path: {
      instance: 'String', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        //ref: '', 
        label: 'Identifier', 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  }, 
  {
    accessor:'classname', 
    path: {
      instance: 'String', 
      /*$embeddedSchemaType: { 
        instance: '', 
      }, */ 
      options: { 
        //ref: '', 
        label: 'Class name', 
        // defaultValue: 
        // default: 
        // format: 
      }, 
    }
  } 
] 

export const mockFields = { 
  players:playersFields, 
  classes:classesFields, 
}; 

export const mockCollections:Array<IMongooseCollection> = [ 
  {
    accessor:'players', 
    label: 'Players', 
  }, 
  { 
    accessor:'classes', 
    label: 'Classes', 
  }, 
]; 