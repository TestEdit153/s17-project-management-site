import {projectFirestore} from "../firebase/config";
import {useEffect, useRef, useState} from "react";

/**
 * Fetches a collection from Firestore with snapshot events
 *
 * @param {string} collection Name of the collection
 * @param {Array<string>|null} _query An optional WHERE Query as array, default null
 * @param {Array<string>|null} _orderBy An optional ORDER Query as array, default null
 * @returns {{error, documents}} An object {error, documents}
 */
export const useCollection = (collection:string,
                              _query:Array<string>|null = null,
                              _orderBy:Array<string>|null = null ) =>{
    // Set state for fetched documents & any error
    const [documents, setDocuments] = useState<any[]|null>(null)
    const [error, setError] = useState<string|null>(null);

    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(()=>{
        let ref = projectFirestore.collection(collection)

        // @ts-ignore
        if(query){ ref = ref.where(...query) }
        // @ts-ignore
        if(orderBy){ ref = ref.orderBy(...orderBy) }

        // get a realtime event listener
        const unsubscribe = ref.onSnapshot(
            (ss) =>{
                let results:any[] = []
                // iterate through docs in snapshot
                ss.docs.forEach(doc =>{
                    results.push({...doc.data(), id: doc.id})
                })
                // update document state
                setDocuments(results)
                setError(null)
            },
            (err) =>{
                setError(err.message)
            })

        // unsubscribe when unmounts
        return () => unsubscribe();

    }, [collection, query, orderBy])
    return {error, documents}
}