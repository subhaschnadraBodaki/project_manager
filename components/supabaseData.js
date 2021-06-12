import React from 'react'
// import {supabase} from '../utils/supabaseClient'


const supabaseData =async() => {
    const response =await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL ,{
        method:'get',
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
}

export default supabaseData


// let {data:projects  , error}= await supabase
// .from('projects')
// .select('*')
// if (error) {
//     console.log(error)
// }
// // console.log(projects)
// return await projects