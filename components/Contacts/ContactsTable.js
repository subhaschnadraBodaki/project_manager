import React from 'react'
import {useQuery} from 'react-query'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import ContactsData from './ContactsData'

export default function AccountsTable ({actionBody}) {
    const columns = [
        { field: "id", header: "Id" },
        { field: "contact_name", header: "Name" },
        { field: "email", header: "Email" },
        { field: "updated_at", header: "Updated_at" }
    ];



    const { status, data, error } = useQuery('products', ContactsData)
    
console.log(data)
    if (status === 'loading') {
        return <div>loading...</div> // loading state
    }

    if (status === 'error') {
        return <div>{error.message}</div> // error state
    }

    const dynamicColumns =  columns.map((col) => {
        return <Column  key={col.field} field={col.field} header={col.header} />;
    })


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    return (
        <div>
            <DataTable value={data} resizableColumns columnResizeMode="expand"  paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 15]}
                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} >
               
                {dynamicColumns}
               
                <Column field="action" header="Action" body={actionBody}></Column>


            </DataTable>
        </div>
    )
}
