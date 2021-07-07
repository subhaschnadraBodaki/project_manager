import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const EmployeeSkillsData = ({ employeeData }) => {
  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].employee_skills[0] == null ||
    employeeData[0].employee_skills[0] === undefined
  ) {
    return <div>No Data Found</div>;
  }

  const employeeSkills = employeeData[0].employee_skills;

  const columns = [
    { field: "skill_category", header: "Skill Category" },
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "skill_level", header: "Skill Level" },
  ];

  const dynamicColumns = columns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div>
      <DataTable
        value={employeeSkills}
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};


export default EmployeeSkillsData;
