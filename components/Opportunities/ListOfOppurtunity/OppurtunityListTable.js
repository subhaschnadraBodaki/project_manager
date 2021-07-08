import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function OppurtunityListTable({ oppurtunitiesData, actionBody }) {
  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "probability", header: "Probability" },
    { field: "amount", header: "Amount" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        className="p-datatable-sm"
        value={oppurtunitiesData}
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
