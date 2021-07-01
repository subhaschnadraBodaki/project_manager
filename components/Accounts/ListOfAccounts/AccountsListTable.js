import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";


export default function AccountsListTable({ accountsData, actionBody }) {
  const columns = [
    { field: "id", header: "Id" },
    { field: "account_name", header: "Name" },
    { field: "type", header: "Account Type" },
    { field: "number_of_employees", header: "No Of Employees" },
    { field: "annual_revenue", header: "Annual Revenue"}
  ];

  // const { status, data, error } = useQuery("products", AccountsData);

  // console.log(data);
  // if (status === "loading") {
  //   return <div>loading...</div>; // loading state
  // }

  // if (status === "error") {
  //   return <div>{error.message}</div>; // error state
  // }

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );
  return (
    <div>
      <DataTable
        value={accountsData}
        resizableColumns
        columnResizeMode="expand"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        {dynamicColumns}

        <Column field="action" header="Action" body={actionBody}></Column>
      </DataTable>
    </div>
  );
}
