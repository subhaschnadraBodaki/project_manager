const AccountsData =async()=>{
    const response =await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL_ACCOUNTS ,{
        method:'get',
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
}

export default AccountsData