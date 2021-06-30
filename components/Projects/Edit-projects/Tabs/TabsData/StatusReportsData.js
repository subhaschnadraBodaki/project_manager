import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import formatDate from '../../../../utils/FormatDate';
import TableToolbar from '../TableToolbar'

export default function StatusReportsData({projectsData}) {

    if(projectsData[0]==null || projectsData[0] === undefined || projectsData[0].project_status_report[0]==null || projectsData[0].project_status_report[0]===undefined ){
        return <div>No Data Found</div>
            }
else{
const statusReportData = projectsData[0].project_status_report
function reportingDate (){
    if (statusReportData[0].reporting_date==null){
        return '-'
    }
    else{
        return formatDate(statusReportData[0].reporting_date)
    }
}
    const columns = [
        {field:"quality_status" , header:"Quality Status"},
        {field:"effort_status" , header:"Effort Status"},
        {field:"milestone_status"  , header:"Milestone Status"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
               <div>
                <TableToolbar/>
            </div>
              <DataTable value={statusReportData} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
              <Column header="Reporting Date" body={reportingDate}></Column>
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}
}