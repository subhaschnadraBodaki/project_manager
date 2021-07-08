import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const EmployeeAddressData = ({ employeeData }) => {
  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].employee_address[0] == null ||
    employeeData[0].employee_address[0] === undefined
  ) {
    return <div>No Data Found</div>;
  }

  const employeeAddress = employeeData[0].employee_address;

  const columns = [
    { field: "address_type", header: "Address Type" },
    { field: "address", header: "address" },
    { field: "city", header: "City" },
    { field: "country", header: "Country" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        value={employeeAddress}
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};


export default EmployeeAddressData;
