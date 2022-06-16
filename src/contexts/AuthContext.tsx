import {createContext, useEffect, useReducer} from "react";
import {projectAuth} from "../firebase/config";

// @ts-ignore
export const AuthContext = createContext()

export const authReducer = (state:any, action:any) => {
    switch (action.type){
        case "SIGNUP":
            return {...state, user:action.payload};
        case "LOGOUT":
            return {...state, user:null}
        case "LOGIN":
            return {...state, user:action.payload}
        case "AUTH_IS_READY":
            return {...state, user:action.payload, authIsReady:true}
        default:
            return state;
    }
};

export const AuthContextProvider = (props:any) =>{
    const [state, dispatch] = useReducer(authReducer, {
        user:null,
        authIsReady:false
    })

    useEffect(()=>{
        const unsub = projectAuth
            .onAuthStateChanged((user) =>{
                dispatch({type:"AUTH_IS_READY", payload: user})
                unsub()
            })
    },[])

    // Inspect the state for dispatch LOGIN
    console.log('AuthContext state = ', state);

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}