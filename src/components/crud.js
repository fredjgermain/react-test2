//import React from 'react'; 
import axios from 'axios'; 
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';

class Crud {
  constructor(baseUrl) { 
    this.baseUrl = baseUrl; 
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 2000
    });
  } 

  async Models(modelName) { 
    return await axios.get(this.baseUrl+'models/'+modelName); 
  } 

  async Validate(modelName, toValidate) { 
    return await axios.put(this.baseUrl+modelName+'/validate', toValidate); 
  } 

  async Create(modelName, toCreate) { 
    return await axios.post(this.baseUrl+modelName+'/create', toCreate);
  } 

  async Read(modelName, ids) { 
    return await axios.put(this.baseUrl+modelName+'/read', ids? [ids].flat(): []); 
  } 

  async Ids(modelName) { 
    return await axios.get(this.baseUrl+modelName+'/ids'); 
  } 

  async Update(modelName, toUpdate) { 
    return await axios.put(this.baseUrl+modelName+'/update', toUpdate); 
  } 

  async Delete(modelName, ids) { 
    return await axios.put(this.baseUrl+modelName+'/delete', ids? [ids].flat(): []); 
  } 
} 

const baseUrl = `http://localhost:8080/api/`; 
//const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 
const crud = new Crud(baseUrl); 

//const dummy = {number:12}; 
//crud.Read('modeldummy').then( res => console.log(res) ); 
//crud.Validate('modeldummy', dummy).then( res => console.log(res)); 

export default Crud; 
export { 
  crud, 
} 