import React from 'react'
import AccountForm from '../../components/Accounts/AccountForm'
import axios from "axios";

const add = ({countries}) => {
    return (
        <AccountForm countries = {countries} />
    )
}

export async function getStaticProps() {
    const countriesData =await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/countries?select=code,name`,
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });

    const countries = countriesData.data
    
    return {
        props: {
          countries
        },
        revalidate: 60,
      };
}  

export default add

