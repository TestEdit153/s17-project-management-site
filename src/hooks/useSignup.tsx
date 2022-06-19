import {useEffect, useState} from "react";
import {projectAuth, projectStorage} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

type FireBaseSignupProps = {
    email:string, password:string, displayName:string, thumbnail:any
}

export const useSignup = () =>{
    const [isCancelled, setIsCancelled] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // @ts-ignore
    const {dispatch} = useAuthContext();

    useEffect(()=>{
        setIsCancelled(false)
        return ()=> setIsCancelled(true)
    },[])

    const signup = async (
        {email, password, displayName, thumbnail}:FireBaseSignupProps) =>{
    // 1. reset error to null
        setError(null)
        setIsLoading(true)
    // 2. Firebase may raise signup Error
        try{
    // 3. use Firebase Service to create a User
            const res  = await projectAuth
                     .createUserWithEmailAndPassword(email, password)

    // 4. If Firebase does not respond
            if(!res){ throw new Error("Could not complete signup") }

    // 6. DISPATCH LOGIN to set the authorized user on AuthContext
        dispatch({type: "SIGNUP", payload: res.user})

    // ---> Upload Thumbnail
        const uploadPath = `thumbnails/${res.user?.uid}/${thumbnail.name}`
        const img = await projectStorage.ref(uploadPath).put(thumbnail);
        const imgURL = await img.ref.getDownloadURL();

    // 5. update user Profile with display name & Image
            await res.user?.updateProfile({displayName, photoURL:imgURL})

    // 7. If signup successful, reset state variables
            if(!isCancelled) {
                console.log("useSignup Not cancelled, updating State");
                setError(null)
                setIsLoading(false)
            }
        }catch(e:any){
            if(!isCancelled){
                console.log(e.message);
                // 7. If signup Error, update state variables
                setIsLoading(false)
                setError(e.message)
            }
        }
    }

    // 7. Return properties from this Hook
    return {error, isLoading, signup}
}
