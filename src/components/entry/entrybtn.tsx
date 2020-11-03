import React, { useState, useEffect, useContext} from 'react'; 
import {Collection} from '../proxy/collection'; 
import {IEntry, IResult, EnumMode, IFeedback} from '../proxy/interfaces'; 

import {ActiveDataContext} from '../collections/collections'; 
//import {CollectionTableContext} from '../collections/collectiontable'; 
import {EntryRowContext} from './entryrow'; 


export default function EntryBtn() { 
  const {editableEntry} = useContext(EntryRowContext); 
  const {activeCollection, activeEntryHook:{activeEntry, setActiveEntry}, modeHook, feedbackHook} = useContext(ActiveDataContext); 
  const {mode} = modeHook; 

  /*useEffect(() => { 
    if(mode === EnumMode.Update || mode === EnumMode.Create) 
      setActiveEntry(editableEntry) 
    else 
      setActiveEntry({} as IEntry) 
  }, [mode, editableEntry._id]); */

  //&& tableContext.idModified === editableEntry._id
  //console.log([mode, tableContext.idModified, editableEntry._id, tableContext.idModified === editableEntry._id] ); 
  /*useEffect(() => {
    if(mode === EnumMode.Update && idModified != editableEntry._id)
  }, [mode]); */
  
  // SetFeedback ................................
  function SetFeedback(feedback:any, oks:Array<string>) { 
    // create empty feedback object
    const feedbackcopy = {oks:[], errs:[]} as IFeedback; 
    if(feedback.errs.length > 0) 
      feedbackcopy.errs = feedback.err; 
    else 
      feedbackcopy.oks = oks; 
    feedbackHook.setFeedback({...feedbackcopy}); 
  } 

  const ConfirmCreate = async () => { 
    const feedBack = (await activeCollection.Create(editableEntry)) as IResult; 
    SetFeedback(feedBack, ['An element has been created!']); 
    modeHook.setMode(EnumMode.New); 
    //refreshHook.setRefresh(); 
  } 
  const ConfirmUpdate = async () => { 
    const feedBack = (await activeCollection.Update(editableEntry)) as IResult; 
    SetFeedback(feedBack, ['An element has been updated!']); 
    modeHook.setMode(EnumMode.Read); 
    //refreshHook.setRefresh(); 
  } 
  const ConfirmDelete = async () => { 
    const feedBack = (await activeCollection.Delete(editableEntry._id)) as IResult; 
    SetFeedback(feedBack, ['An element has been deleted!']); 
    modeHook.setMode(EnumMode.Read); 
    //refreshHook.setRefresh(); 
  } 
  

  if(mode===EnumMode.New) 
    return <div> 
      <button onClick={() => modeHook.setMode(EnumMode.Create)}>Create new entry</button> 
    </div>; 
  if(mode===EnumMode.Create) 
    return <div> 
      <button onClick={ConfirmCreate}>Confirm create</button> 
      <button onClick={() => modeHook.setMode(EnumMode.New)}>Cancel create</button> 
    </div>; 
  if(mode===EnumMode.Read) 
    return <div> 
      <button onClick={() => { 
        setActiveEntry(editableEntry); 
        modeHook.setMode(EnumMode.Update); 
      }}>Update</button> 
      <button onClick={() => modeHook.setMode(EnumMode.Delete)}>Delete</button> 
    </div>; 
  if(mode===EnumMode.Update) 
    return <div> 
      <button onClick={ConfirmUpdate}>Confirm update</button> 
      <button onClick={() => modeHook.setMode(EnumMode.Read)}>Cancel update</button> 
    </div>; 
  if(mode===EnumMode.Delete) 
    return <div> 
      <button onClick={ConfirmDelete}>Confirm delete</button> 
      <button onClick={() => modeHook.setMode(EnumMode.Read)}>Cancel delete</button> 
    </div>; 
  return <div>BTN</div>; 
} 