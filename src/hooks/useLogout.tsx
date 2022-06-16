import {projectAuth} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";
import {useEffect, useState} from "react";

export const useLogout = () =>{
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // @ts-ignore
    const {dispatch} = useAuthContext();

    useEffect(() =>{
        setIsCancelled(false)
        return ()=> setIsCancelled(true)
    },[])

    const logout = async() =>{
        setError(null)
        setIsLoading(true)
    // Logout
        try{
            await projectAuth.signOut()

    // dispatch Logout
            dispatch({type: 'LOGOUT'})

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
    return {error, isLoading, logout}
}
