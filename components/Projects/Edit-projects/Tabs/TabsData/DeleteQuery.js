import React from 'react'
import axios from 'axios'

export default function  DeleteQuery  ({tableName,rowData})  { 
    console.log(rowData.id)
    console.log(tableName)
    const url =  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${tableName}?id=eq.${rowData.id}` 
    return   (  axios.delete(
            url,
            {
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        })
    )
    
}