import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function IssuesData({projectsData}) {

    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_issues[0] == null || projectsData[0].project_issues[0] === undefined) {

        return <div>No Data Found</div>
    }else{
    const issuesData =projectsData[0].project_issues
    const columns = [
        {field:"issue_number" , header:"Issue Number"},
        {field:"issue_priority" , header:"Issue Priority"},
        {field:"state" , header:"State"},
        {field:"description"  , header:"Description"},
        {field:"notes"  , header:"Notes"},
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
<<<<<<< HEAD
            <DataTable value={issuesData} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
=======
            <DataTable value={issuesData}  className="p-datatable-sm" resizableColumns columnResizeMode="expand">
>>>>>>> 1171a90035ef814333b47163da73247195e1fa84
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}
}