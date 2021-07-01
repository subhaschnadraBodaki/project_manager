import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default function DeliverablesData({projectsData}) {
    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_deliverables[0] == null || projectsData[0].project_deliverables[0] === undefined) {

        return <div>No Data Found</div>
    }else{
    
    const deliverablesData =projectsData[0].project_deliverables
    const columns = [
        {field:"name" , header:"Name"},
        {field:"parent_deliverables" , header:"Parent Deliverables"},
        {field:"predecessor_deliverables" , header:"Predecessor Deliverables"},
        {field:"sucecssor_deliverables"  , header:"Sucecssor Deliverables"},
        {field:"estimated_effort_in_hours"  , header:"Est. Effort (Hr)"},
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
              <DataTable value={deliverablesData} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}
}