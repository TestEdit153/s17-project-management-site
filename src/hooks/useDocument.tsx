import {useEffect, useState} from "react";
import {projectFirestore} from "../firebase/config";

const useDocument = (collection: string, id: string) => {
    const [error, setError] = useState<string | null>(null);
    const [document, setDocument] = useState(null);

    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe =
            ref.onSnapshot((snapshot) => {
                if(snapshot.data()){
                    // @ts-ignore
                    setDocument({...snapshot.data(), id: snapshot.id})
                    setError(null)
                }else{
                    setError("No such document exists")
                }},
                err => {
                    console.log(err.message);
                    setError("Failed to get document")
                })
        return () => unsubscribe()
    }, [collection, id])

    return {error, document}
}

export default useDocument;