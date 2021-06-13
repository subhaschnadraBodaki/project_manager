import React from 'react'
import EmployeesTable from './EmployeesTable'
import { EyeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
export default function Employees() {
    const router=useRouter()
    const ActionButton = () => {
        return (
            <React.Fragment>
                <button onClick={() => router.push('/employeeDetails')}>
                       <EyeIcon className="h-5 w-5 mr-4" />
                </button>
            </React.Fragment>
        );
    }
    return (
        <div className='card'>
            <h1 className="my-5 text-black text-2xl flex align-item justify-center">Employees List</h1>
            <EmployeesTable actionBody={ActionButton}></EmployeesTable>
        </div>
    )
}
