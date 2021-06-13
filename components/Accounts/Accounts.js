import React from 'react'
import AccountsTable from './AccountsTable'
import { EyeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
export default function Employees() {
    const router=useRouter()
    const ActionButton = () => {
        return (
            <React.Fragment>
                <button onClick={() => router.push('/accountDetails')}>
                       <EyeIcon className="h-5 w-5 mr-4" />
                </button>
            </React.Fragment>
        );
    }
    return (
        <div className='card'>
            <h1 className="text-black text-2xl flex align-item justify-center">Accounts</h1>
            <AccountsTable actionBody={ActionButton}></AccountsTable>
        </div>
    )
}
