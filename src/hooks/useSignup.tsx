import {useEffect, useState} from "react";
import {projectAuth, projectFirestore, projectStorage} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

type FireBaseSignupProps = {
    email:string, password:string,
    displayName:string, thumbnail:any
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
    // 3. Create a User
            const res  = await projectAuth
                     .createUserWithEmailAndPassword(email, password)
    // 4. If Firebase does not respond
            if(!res){ throw new Error("Could not complete signup") }

    // 5. Set Current User on AuthContext
        dispatch({type: "SIGNUP", payload: res.user})

    // 6. Upload Thumbnail to Firebase Storage
        const uploadPath = `thumbnails/${res.user?.uid}/${thumbnail.name}`
        const img = await projectStorage.ref(uploadPath).put(thumbnail);
        const imgURL = await img.ref.getDownloadURL();

    // 7. update user Profile with display name & Image
            await res.user?.updateProfile({displayName, photoURL:imgURL})

    // ---> Create Firestore Record for User - status, photoURL, Bio
        await projectFirestore.collection("users")
            .doc(res.user?.uid)
            .set({
                online:true, displayName, photoURL:imgURL
            })

    // 8. If signup successful, reset state variables
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
