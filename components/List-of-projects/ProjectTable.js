import React from 'react';
import ProjectListTable from './ProjectListTable'
import TableToolbar from './TableToolbar'
import { EyeIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function ProjectTable() {
    const router = useRouter()

    const ActionButton = () => {
        return (
            <React.Fragment>
                <button onClick={() => router.push('/projectOverview')}>
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

            <h1 className='text-black text-center text-2xl'>List Of Projects</h1>
            <TableToolbar />

            <ProjectListTable actionBody={ActionButton} />

        </div>
    )
}
