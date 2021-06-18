import React from "react";

export default function StatusTemplate ({status}) {
    if (status == null) {

        return <span className={"text-black" + " rounded-lg" + " bg-cover" + " p-1"} >{status}</span>;

    } else {
        return <span className={"text-" +status.toLowerCase() + "-500" + " bg-" + status.toLowerCase() + "-100" + " rounded-lg" + " bg-cover" + " p-1"} >{status}</span>;
    }
    
}