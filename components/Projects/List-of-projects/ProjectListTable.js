import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function ProjectListTable({ actionBody, data, employeeData }) {
  const columns = [
    { field: "project_code", header: "Project Code" },
    { field: "name", header: "Name" },
    { field: "project_manager", header: "Project Manager" },
    { field: "customer_name", header: "Customer Name" },
    { field: "state", header: "State" },
  ];

  // const projectManager = employeeData.find(emp => {
  //     if(emp.user_id===data.project_manager_id){
  //         return ( <span>

  //             {`${emp.first_name} ${emp.middle_name} ${emp.last_name}`}
  //         </span>
  //         )
  //     }
  //     else{
  //         return (
  //             <span>-</span>
  //         )
  //     }
  // })
  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const statusBodyTemplate = (data) => {
    if (data.project_status == null) {
      return (
        <span className={"text-black rounded-lg   bg-cover  p-1"}>
          {data.project_status}
        </span>
      );
    } else {
      return (
        <span
          className={`text-sm text-${data.project_status.toLowerCase()}-500 bg-${data.project_status.toLowerCase()}-100 rounded-sm bg-cover p-1`}
        >
          {data.project_status}
        </span>
      );
    }
  };

  return (
    <div>
      <DataTable
        className="p-datatable-sm"
        value={data}
        resizableColumns
        columnResizeMode="expand"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
      >
        {dynamicColumns}
        {/* <Column  header="Project Manager" >{projectManager}</Column> */}
        <Column header="Project Health" body={statusBodyTemplate}></Column>
        <Column header="Action" body={actionBody}></Column>
      </DataTable>
    </div>
  );
}
