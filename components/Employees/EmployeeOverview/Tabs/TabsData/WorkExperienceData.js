import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const WorkExperienceData = ({ employeeData }) => {
  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].work_experience[0] == null ||
    employeeData[0].work_experience[0] === undefined
  ) {
    return <div>No Data Found</div>;
  }

  const workExperience = employeeData[0].work_experience;

  const columns = [
    { field: "organization", header: "organization" },
    { field: "no_of_years", header: "No Of Years" },
    { field: "employment_type", header: "Employment Type" },
    { field: "designation", header: "Designation" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        value={workExperience}
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};


export default WorkExperienceData;
