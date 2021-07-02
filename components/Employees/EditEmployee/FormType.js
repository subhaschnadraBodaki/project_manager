import AddWorkExperience from "./RelatedTables/Add/AddWorkExperience";
import AddEmployeeIdentity from "./RelatedTables/Add/AddEmployeeIdentity";

export default function FormType({
  formType,
  employeeId,
  employeeName,
  employmentType,
  designation,
  identityType,
  countries
}) {
  switch (formType) {
    case "AddWorkExperience":
      return (
        <AddWorkExperience
          employeeId={employeeId}
          employmentType={employmentType}
          designation={designation}
          employeeName={employeeName}
        />
      );

    case "AddEmployeeIdentity":
      return (
      <AddEmployeeIdentity
        employeeId={employeeId}
        employmentType={employmentType}
        designation={designation}
        identityType={identityType}
        countries={countries}
      />
      );
    default:
      return <h1>Switch</h1>;
  }
}
