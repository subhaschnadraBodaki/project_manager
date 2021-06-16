import React from 'react';
import ProjectListTable from './ProjectListTable'
import TableToolbar from './TableToolbar'
import { EyeIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'



export default function ProjectTable({data}) {
    const router = useRouter()
    
    const ActionOnClick = async (rowData) => {
        await router.push('/projectdetails/'+ rowData.id)
        // console.log(rowData)

    }
    const ActionButton = (rowData) => {
        return (
            <React.Fragment>
                <button onClick={() => ActionOnClick(rowData)}>
                    <EyeIcon className="h-5 w-5 mr-4" />
                </button>

                <button>
                    <PencilIcon className="h-5 w-5 " />
                </button>
            </React.Fragment>
        );
    }
    

    return (
        <div className="card">

            <h1 className='my-5 text-black text-2xl flex align-item justify-center'>List Of Projects</h1>
            <TableToolbar />

            <ProjectListTable actionBody={ActionButton} data={data}/>

        </div>
    )
}
