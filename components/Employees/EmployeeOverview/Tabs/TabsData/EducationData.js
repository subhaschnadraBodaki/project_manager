import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const EducationData = ({ employeeData }) => {
  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].education[0] == null ||
    employeeData[0].education[0] === undefined
  ) {
    return <div>No Data Found</div>;
  }

  const education = employeeData[0].education;

  const columns = [
    { field: "qualification", header: "Qualification" },
    { field: "percentage_of_marks", header: "Percenatage Of Marks" },
    { field: "year_of_passing", header: "Year of Passing" },
    { field: "status", header: "Status" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        value={education}
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};


export default EducationData;
