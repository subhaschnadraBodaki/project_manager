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
    { field: "annual_revenue", header: "Annual Revenue" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        className="p-datatable-sm"
        value={accountsData}
        resizableColumns
        columnResizeMode="expand"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
      >
        {dynamicColumns}

        <Column field="action" header="Action" body={actionBody}></Column>
      </DataTable>
    </div>
  );
}
