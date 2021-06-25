import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableToolbar from '../TableToolbar'

export default function MilestonesData({ projectsData }) {

    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_milestones[0] == null || projectsData[0].project_milestones[0] === undefined) {
        return <div>No Data Found</div>
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
                <TableToolbar/>
            </div>
                <DataTable value={milestoneData} resizableColumns columnResizeMode="expand">
                    {dynamicColumns}
                </DataTable>
            </div>
        )
    }
}