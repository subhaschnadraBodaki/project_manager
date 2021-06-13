import React from 'react'
import ContactsTable from './ContactsTable'
import { EyeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
export default function Employees() {
    const router=useRouter()
    const ActionButton = () => {
        return (
            <React.Fragment>
                <button onClick={() => router.push('/contactDetails')}>
                       <EyeIcon className="h-5 w-5 mr-4" />
                </button>
            </React.Fragment>
        );
    }
    return (
        <div className='card'>
            <h1 className=" my-5 text-black text-2xl flex align-item justify-center">Contacts</h1>
            <ContactsTable actionBody={ActionButton}></ContactsTable>
        </div>
    )
}
