import React from 'react'
import {useQuery} from 'react-query'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import getProjectList from './FetchData'

export default function ProjectListTable({ actionBody }) {
    const columns = [
        { field: "name", header: "Name" },
        { field: "country.name", header: "Country" },
        { field: "company", header: "Company" },
        { field: "representative.name", header: "Representative" }
    ];

    const { status, data, error } = useQuery('products', getProjectList)

    if (status === 'loading') {
        return <div>loading...</div> // loading state
    }

    if (status === 'error') {
        return <div>{error.message}</div> // error state
    }

    const dynamicColumns =  columns.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    })

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    return (
        <div>
            <DataTable value={data.customers}  paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 30, 50]}
                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} >
               
                {dynamicColumns}
                <Column field="action" header="Action" body={actionBody}></Column>


            </DataTable>
        </div>
    )
}
