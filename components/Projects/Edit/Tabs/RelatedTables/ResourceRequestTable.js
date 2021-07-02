import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableHeader from '../TableHeader'

export default function ResourceRequestTable({projectsData}) {
    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_resource_requests[0] == null || projectsData[0].project_resource_requests[0] === undefined) {
        return (
        <div>
         <TableHeader/>
        <div>No Data Found</div>
        </div>
        )
    }
    else{
const resourceRequestData =projectsData[0].project_resource_requests
    
    const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
    const columns = [
        {field:"title" , header:"Title"},
        {field:"resource_role" , header:"Role"},
        {field:"number_of_resources" , header:"Number of Resources"},
        {field:"request_priority"  , header:"Request Priority"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
               <div>
                <TableHeader/>
            </div>
              <DataTable value={resourceRequestData} className="p-datatable-sm"  resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}
}