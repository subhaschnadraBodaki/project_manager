import React from "react";

export default function StatusTemplate ({status}) {
    if (status == null) {

        return <span key={100} className={"text-black rounded-lg   bg-cover  p-1"} >{status}</span>;

    } else 
    {
        return <span key={100} className={`text-sm text-${status.toLowerCase()}-500 bg-${status.toLowerCase()}-100 rounded-sm bg-cover p-1`} >{status}</span>;
    }
    
}