import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TeamsData({ projectsData }) {
    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_team_member[0] == null || projectsData[0].project_team_member[0] === undefined) {
        return <div>No Data Found</div>
    }
    else {

const teamsData =projectsData[0].project_team_member
        
        const columns = [
            { field: "team_member", header: "Team Member" },
            { field: "notes", header: "Notes" },
            { field: "allocation_percentage", header: "Allocation Percentage" },
            { field: "full_time", header: "Full Time" }
        ]
        const dynamicColumns = columns.map((col) => {
            return <Column key={col.field} field={col.field} header={col.header} />
        })

        return (
            <div>
                <DataTable value={teamsData} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
                    {dynamicColumns}
                </DataTable>
            </div>
        )
    }
}