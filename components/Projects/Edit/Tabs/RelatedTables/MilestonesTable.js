import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableHeader from '../TableHeader'

export default function MilestonesTable({ projectsData }) {

    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_milestones[0] == null || projectsData[0].project_milestones[0] === undefined) {
        return (
        <div>
         <TableHeader/>
        <div>No Data Found</div>
        </div>
        )
    }
    else {
const milestoneData =projectsData[0].project_milestones
        // const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
        const columns = [
            { field: "name", header: "Milestone Name" },
            { field: "milestone_planned_cost", header: "Planned Cost" },
            { field: "milestone_billing_amount", header: "Billing Amount" },
            { field: "notes", header: "Notes" }
        ]
        const dynamicColumns = columns.map((col) => {
            return <Column key={col.field} field={col.field} header={col.header} />
        })
        return (
            <div>
                   <div>
                <TableHeader/>
            </div>
                <DataTable value={milestoneData}  className="p-datatable-sm" resizableColumns columnResizeMode="expand">
                    {dynamicColumns}
                </DataTable>
            </div>
        )
    }
}