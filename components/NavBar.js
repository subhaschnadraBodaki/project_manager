import React from 'react'
import Link from 'next/link'
export default function NavBar(){
    return (
<div>
  <nav className="bg-white ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center">
          <div >
            <img  src="VenerateLogo-1-e1599760571190 (1)" alt="Venerate"/>
            </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 ">
             <Link href="/">
             <a className="navBtns">Dashboard</a>
             </Link>

             <Link href="/projects">
             <a className="navBtns">Project</a>
             </Link>

             <Link href="/employees">
             <a className="navBtns">Employees</a>
             </Link>

             <Link href="/contacts">
             <a className="navBtns">Contacts</a>
             </Link>
             <Link href="/oppurtunities">
             <a className="navBtns">Opportunities</a>
             </Link>

             <Link href="/accounts">
             <a className="navBtns">Accounts</a>
             </Link>
              
            </div>
          </div>
        </div>
        
        </div>
  
 

    
   
</div>
</nav>
</div>

);
}