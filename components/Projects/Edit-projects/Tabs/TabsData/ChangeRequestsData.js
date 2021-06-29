import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableToolbar from '../TableToolbar'
export default function ChangeRequestsData() {
    
    const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
    const columns = [
        {field:"projectId" , header:"T1"},
        {field:"Name" , header:"T2"},
        {field:"Status" , header:"T3"},
        {field:"projectManager"  , header:"T4"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
               <div>
                <TableToolbar/>
            </div>
        <DataTable value={data} className="p-datatable-sm"  resizableColumns columnResizeMode="expand">
                     {dynamicColumns}
                 </DataTable> 
     </div>
    )
}
