import React from 'react'
import {signIn  , signOut , useSession} from 'next-auth/client'

export default function  Home() {
 
const [session , loading] =useSession()
  
return (
    <>
      {!session && <>
        Not signed in <br/>
        <button onClick ={()=> signIn()}>Sign In</button>
        </>}
        {session && <>
        Signed in as {session.user.name} <br/>
        <button onClick ={()=>signOut()}>Sign out</button>
        </>}
    
      <h1>Welcome to home page </h1>
    </>
  )
}
