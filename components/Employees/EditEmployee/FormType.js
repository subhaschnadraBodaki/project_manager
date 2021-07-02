import AddWorkExperience from "./RelatedTables/Add/AddWorkExperience";

export default function FormType({
  formType,
  employeeId,
  employeeName,
  employmentType,
  designation,
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
    default:
      return <h1>Switch</h1>;
  }
}
