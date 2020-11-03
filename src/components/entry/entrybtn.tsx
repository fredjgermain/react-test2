import React, { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IFeedbackHook, IEntry, IResult, EnumMode, IFeedback} from '../proxy/interfaces'; 

import {ActiveCollectionContext} from '../collections/collections'; 
import {CollectionTableContext} from '../collections/collectiontable'; 
import {EntryRowContext} from './entryrow'; 


export default function EntryBtn() {
  const {editableEntry, modeHook:{mode, setMode}} = useContext(EntryRowContext); 
  const activeCollection = useContext(ActiveCollectionContext); 
  const tableContext = useContext(CollectionTableContext); 
  const {feedbackHook} = tableContext; 

  useEffect(() => {
    if(mode === EnumMode.Update && tableContext.idModified != editableEntry._id) 
      setMode(EnumMode.Read); 
  }, [editableEntry._id]); 

  //&& tableContext.idModified === editableEntry._id
  //console.log([mode, tableContext.idModified, editableEntry._id, tableContext.idModified === editableEntry._id] ); 
  /*useEffect(() => {
    if(mode === EnumMode.Update && idModified != editableEntry._id)
  }, [mode]); */
  
  // SetFeedback ................................
  function SetFeedback(feedback:any, oks:Array<string>) { 
    // create empty feedback object
    const feedbackcopy = {oks:[], errs:[]} as IFeedback; 
    if(feedback.err.length > 0) 
      feedbackcopy.errs = feedback.err; 
    else 
      feedbackcopy.oks = oks; 
    feedbackHook.setFeedBack({...feedbackcopy}); 
  }

  const ConfirmCreate = async () => { 
    const feedBack = (await activeCollection.Create(editableEntry)) as IResult; 
    SetFeedback(feedBack, ['An element has been created!']); 
    setMode(EnumMode.New); 
    //refreshHook.setRefresh(); 
  } 
  const ConfirmUpdate = async () => { 
    const feedBack = (await activeCollection.Update(editableEntry)) as IResult; 
    SetFeedback(feedBack, ['An element has been updated!']); 
    setMode(EnumMode.Read); 
    //refreshHook.setRefresh(); 
  } 
  const ConfirmDelete = async () => { 
    const feedBack = (await activeCollection.Delete(editableEntry._id)) as IResult; 
    SetFeedback(feedBack, ['An element has been deleted!']); 
    setMode(EnumMode.Read); 
    //refreshHook.setRefresh(); 
  } 
  

  if(mode===EnumMode.New) 
    return <div> 
      <button onClick={() => setMode(EnumMode.Create)}>Create new entry</button> 
    </div>; 
  if(mode===EnumMode.Create) 
    return <div> 
      <button onClick={ConfirmCreate}>Confirm create</button> 
      <button onClick={() => setMode(EnumMode.New)}>Cancel create</button> 
    </div>; 
  if(mode===EnumMode.Read) 
    return <div> 
      <button onClick={() => { 
        tableContext.idModified = editableEntry._id; 
        setMode(EnumMode.Update); 
      }}>Update</button> 
      <button onClick={() => setMode(EnumMode.Delete)}>Delete</button> 
    </div>; 
  if(mode===EnumMode.Update) 
    return <div> 
      <button onClick={ConfirmUpdate}>Confirm update</button> 
      <button onClick={() => setMode(EnumMode.Read)}>Cancel update</button> 
    </div>; 
  if(mode===EnumMode.Delete) 
    return <div> 
      <button onClick={ConfirmDelete}>Confirm delete</button> 
      <button onClick={() => setMode(EnumMode.Read)}>Cancel delete</button> 
    </div>; 
  return <div>BTN</div>; 
} 