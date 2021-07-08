import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const EmployeeIdentityData = ({ employeeData }) => {
  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].employee_identity[0] == null ||
    employeeData[0].employee_identity[0] === undefined
  ) {
    return <div>No Data Found</div>;
  }

  const employeeIdentity = employeeData[0].employee_identity;

  const columns = [
    { field: "type", header: "Type" },
    { field: "identity_no", header: "Identity NO" },
    { field: "name", header: "Name" },
    { field: "issuing_authority", header: "Issuing Authority" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        value={employeeIdentity}
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};

export default EmployeeIdentityData;
