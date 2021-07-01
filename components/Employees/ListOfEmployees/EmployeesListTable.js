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

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );
  return (
    <div>
      <DataTable
        value={employeesData}
        resizableColumns
        columnResizeMode="expand"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        className="p-datatable-responsive-demo"
        header="Responsive"
      >
        {dynamicColumns}

        <Column field="action" header="Action" body={actionBody}></Column>
      </DataTable>
    </div>
  );
}
