import React from 'react'
import { PlusIcon, DownloadIcon } from '@heroicons/react/solid'
import { Toolbar } from 'primereact/toolbar';
import { useRouter } from 'next/router'
import Button from '../../utils/Button';

export default function TableToolbar() {
    const router = useRouter()
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                
                <div className="mx-4 ">

                    <Button buttonName='Export' buttonIcon={<DownloadIcon className="h-5 w-5" />} onClickHandler={() => console.log('export')} />
                </div>
                <div >
                    <Button buttonName='Add Contact' buttonIcon={<PlusIcon className="h-5  w-5" />} onClickHandler={() => { router.push('/contacts/add') }} />

                </div >

            </React.Fragment>
        )
    }

    return (
        <Toolbar className="p-mb-4"  right={rightToolbarTemplate}></Toolbar>
    )
}





    // const leftToolbarTemplate = () => {
    //   return (
    //       <React.Fragment>

    //           <button className="bg-gray-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-white rounded-2xl hover:shadow-lg hover:bg-gray-600 flex"><DownloadIcon className="h-5 w-5"/> Export</button>

    //       </React.Fragment>
    //   )
    // }