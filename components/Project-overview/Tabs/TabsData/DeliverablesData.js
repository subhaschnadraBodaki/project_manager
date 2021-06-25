import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default function DeliverablesData({projectsData}) {
    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_deliverables[0] == null || projectsData[0].project_deliverables[0] === undefined) {

        return <div>No Data Found</div>
    }else{
    // const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
    const deliverablesData =projectsData[0].project_deliverables[0]
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
              <DataTable value={deliverablesData} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}
}