import React from 'react'
import { Button } from 'primereact/button';
import {PlusIcon , DownloadIcon } from '@heroicons/react/solid'
import { Toolbar } from 'primereact/toolbar';
import {useRouter} from 'next/router'

export default function TableToolbar() {
    const router = useRouter()
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
              <button className="bg-gray-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-white rounded-2xl hover:shadow-lg hover:bg-gray-600 flex" onClick={()=>{router.push('/addProject')}}><PlusIcon className="h-5  w-5"/> Add Project</button>
               
            </React.Fragment>
        )
    }
    
    const leftToolbarTemplate = () => {
      return (
          <React.Fragment>
              
              <button className="bg-gray-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-white rounded-2xl hover:shadow-lg hover:bg-gray-600 flex"><DownloadIcon className="h-5 w-5"/> Export</button>
              
          </React.Fragment>
      )
    }
    
    return (
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    )
}
