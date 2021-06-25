import React from 'react'
import {PlusIcon , SaveIcon } from '@heroicons/react/solid'
import { Toolbar } from 'primereact/toolbar';
import {useRouter} from 'next/router'

export default function TableToolbar(props) {
    const router = useRouter()
    

    const leftToolbarTemplate = (props) => {
        return (
            <React.Fragment>
                <button className="bg-blue-900 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-white rounded-2xl hover:shadow-lg hover:bg-blue-600 flex" ><PlusIcon className="h-5  w-5"/> Add Task</button>
            </React.Fragment>
        )
      }
    
     
    
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                     <button className="bg-blue-900 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-white rounded-2xl hover:shadow-lg hover:bg-blue-600 flex "><SaveIcon className="h-5 w-5 mr-2"  /> Save</button>
               
            </React.Fragment>
        )
    }
    

    
    return (
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    )
}
