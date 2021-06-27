import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function RisksData({projectsData}) {

    if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_risks[0] == null || projectsData[0].project_risks[0] === undefined) {

        return <div>No Data Found</div>
    }else{

    // const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
    const risksData = projectsData[0].project_risks
    const columns = [
        {field:"risk_rank" , header:"Risk Rank"},
        {field:"risk_value" , header:"Risk Value"},
        {field:"notes" , header:"Notes"},
        {field:"state"  , header:"State"},
        {field:"status"  , header:"Status"},
        {field:"impact"  , header:"Impact"},
        {field:"probability"  , header:"Probability"},
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
           <DataTable value={risksData} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}
}