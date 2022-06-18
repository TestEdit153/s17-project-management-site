import React from "react";

export const alert_LoadingData = (isPending:boolean) => {
    return( isPending
            ? (<div className="alert loading"> Loading Recipes... </div>)
            : ""
    )
}

export const alert_Error = (error:string|null) => {
    return( error
            ? (<div className="alert error">Error: {error} </div>)
            : ""
    )
}