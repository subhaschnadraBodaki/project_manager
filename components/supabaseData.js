import React from 'react'
import {supabase} from '../utils/supabaseClient'


const supabaseData =async() => {
    let {data:projects  , error}= await supabase
    .from('projects')
    .select('*')
    if (error) {
        console.log(error)
    }
    // console.log(projects)
    return await projects

}

export default supabaseData
