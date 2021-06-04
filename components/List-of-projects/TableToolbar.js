import React from 'react'
import { Button } from 'primereact/button';
// import {PlusIcon , DownloadIcon } from '@heroicons/react/solid'
import { Toolbar } from 'primereact/toolbar';
import {useRouter} from 'next/router'

export default function TableToolbar() {
    const router = useRouter()
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Add Project" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={()=> router.push('/projectOverview')}  />
               
            </React.Fragment>
        )
    }
    
    const leftToolbarTemplate = () => {
      return (
          <React.Fragment>
              
              <Button label="Export" icon="pi pi-upload" className="p-button-help" />
              
          </React.Fragment>
      )
    }
    
    return (
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    )
}
