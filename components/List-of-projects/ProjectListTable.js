import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export default function ProjectListTable({ actionBody ,data }) {
    const columns = [
        { field: "project_code", header: "Project Code" },
        { field: "name", header: "Name" },
        { field: "project_manager", header: "Project Manager" },
      
    ];

    const dynamicColumns = columns.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    })


    const statusBodyTemplate = (data) => {
        if (data.project_status == null) {

            return <span className={"text-black" + " rounded-lg" + " bg-cover" + " p-1"} >{data.project_status}</span>;

        } else {
            return <span className={"text-" + data.project_status.toLowerCase() + "-500" + " bg-" + data.project_status.toLowerCase() + "-100" + " rounded-lg" + " bg-cover" + " p-1"} >{data.project_status}</span>;
        }
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    return (
        <div>
            <DataTable   value={data} resizableColumns columnResizeMode="expand"  paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 15]}
                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} >
                
                {dynamicColumns}
                <Column header="PRJ Health" body={statusBodyTemplate}></Column>
                <Column header="Action" body={actionBody}></Column>

            </DataTable>
            
        </div>
    )
}

