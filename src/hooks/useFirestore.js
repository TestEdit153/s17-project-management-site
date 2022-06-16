import {useEffect, useReducer, useState} from "react";
import {projectFirestore, timestamp} from "../firebase/config";

const initializeState = {
    document: null, isPending: false,
    error: null, success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type){
        case "IS_PENDING":
            return { document: null, isPending: true, success: false, error: null}
        case "ADDED_DOCUMENT":
            return { document: action.payload,
                isPending:false, success:true,     error: null }
        case "DELETED_DOCUMENT":
            return { document: null, isPending:false, success:true, error: null }
        case "ERROR":
            return { document: null,
                isPending: false, success: false,  error:action.payload }
        default:
            return state
    }
}

export const useFirestore = (collection) =>{
    const [response, dispatch] = useReducer(firestoreReducer, initializeState)
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = projectFirestore.collection(collection)

    // dispatch state update, only if NOT isCancelled
    const dispatchIf_NotCancelled = (action) =>{
        if(!isCancelled){
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (doc) =>{
        dispatch({type: 'IS_PENDING'})
        try{
            const createdAt = timestamp.fromDate(new Date())
            const addedDoc = await ref.add({...doc, createdAt})
            dispatchIf_NotCancelled(
                    {type: 'ADDED_DOCUMENT', payload: addedDoc})
        }catch(e){
            dispatchIf_NotCancelled({type: 'ERROR', payload: e.message})
        }
    }

    // delete document
    const deleteDocument = async (id) =>{
        dispatch({type: 'IS_PENDING'})
        try{
            ref.doc(id).delete()
            dispatchIf_NotCancelled({type: "DELETED_DOCUMENT"})
        }catch(e){
            dispatchIf_NotCancelled({type: 'ERROR', payload: e.message})
        }

    }

    // update document
    const updateDocument = async (doc) =>{

    }

    useEffect(()=>{
        setIsCancelled(false)
        return ()=> setIsCancelled(true)
    },[])

    return {response, addDocument, deleteDocument, updateDocument}
}