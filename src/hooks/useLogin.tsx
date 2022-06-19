import {projectAuth, projectFirestore} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";
import {useEffect, useState} from "react";

export const useLogin = () =>{
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // @ts-ignore
    const {dispatch} = useAuthContext();

    useEffect(() =>{
        setIsCancelled(false)
        return ()=> setIsCancelled(true)
    },[])

    const login = async(email:string, password:string) =>{
        setError(null)
        setIsLoading(true)
        // Login
        try{
            const res = await projectAuth
                .signInWithEmailAndPassword(email, password)

            // dispatch Logout
            dispatch({type: 'LOGIN', payload: res.user})

            // update the online status
            await projectFirestore
                .collection('users')
                .doc(res.user?.uid)
                .update({online:true})

            // State Update
            if(!isCancelled){
                setIsLoading(false)
                setError(null)
            }
        }catch(e:any){
            if(!isCancelled) {
                console.log(e.message);
                setError(e.message)
                setIsLoading(false)
            }
        }
    }
    return {error, isLoading, login}
}
