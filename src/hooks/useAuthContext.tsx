import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

export const useAuthContext = () =>{
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("useContext() must be inside an AuthContextProvider")
    }
    return( context )
}
