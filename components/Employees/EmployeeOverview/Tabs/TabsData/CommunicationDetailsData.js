import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CommunicationDetailsData = ({ employeeData }) => {
  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].communication_details[0] == null ||
    employeeData[0].communication_details[0] === undefined
  ) {
    return <div>No Data Found</div>;
  }

  const communicationDetails = employeeData[0].communication_details;

  const columns = [
    { field: "employee_id", header: "Employee Id" },
    { field: "mobilephone", header: "MobilePhone" },
    { field: "homephone", header: "homephone" },
    { field: "alternative_phone", header: "Alternative Phone" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        value={communicationDetails}
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};


export default CommunicationDetailsData;
