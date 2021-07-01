import React from 'react'
import EmployeesListTable from './EmployeesListTable'
import { EyeIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import TableToolbar from './TableToolbar'

export default function EmployeesTable({employeesData}) {
    const router=useRouter()

    const ActionOnClick = async (rowData) => {
        await router.push(`/employees/overview/${rowData.employee_id}`);
      };
    
      const EditOnClick = async (rowData) => {
        await router.push(`/employees/edit/${rowData.employee_id}`);
      };

    const ActionButton = (rowData) => {
    return (
      <React.Fragment>
        <button onClick={() => ActionOnClick(rowData)}>
          <EyeIcon className="h-5 w-5 mr-4" />
        </button>

        <button onClick={() => EditOnClick(rowData)}>
          <PencilIcon className="h-5 w-5 " />
        </button>
      </React.Fragment>
    );
  };
    return (
        <div className="card px-2 mx-5">
      <h1 className="my-5 text-blue-900 text-2xl flex align-item justify-center">
        Employees
      </h1>
      <TableToolbar/>

      <EmployeesListTable
        actionBody={ActionButton}
        employeesData={employeesData}
      ></EmployeesListTable>
    </div>
    )
}
