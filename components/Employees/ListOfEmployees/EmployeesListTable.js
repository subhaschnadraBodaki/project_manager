import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function EmployeesListTable({ actionBody, employeesData }) {
  const columns = [
    { field: "employee_id", header: "Employee_id" },
    { field: "first_name", header: "Name" },
    { field: "work_email", header: "Email" },
    { field: "job_title", header: "Job_title" },
  ];


  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  
  return (
    <div>
      <DataTable
        className="p-datatable-sm"
        value={employeesData}
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
