import React from 'react'
import OppurtunityForm from '../../components/Oppurtunities/OppurtunityForm'
import axios from "axios";

const add = ({accountdata}) => {
    return (
        <OppurtunityForm accountdata = {accountdata} />
    )
}

export async function getStaticProps() {
    const response =await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=id,account_name`,
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });

    const accountdata = response.data
    
    return {
        props: {
         accountdata
        },
        revalidate: 60,
      };
}  

export default add
