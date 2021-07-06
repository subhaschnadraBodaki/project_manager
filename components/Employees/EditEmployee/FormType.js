import AddWorkExperience from "./RelatedTables/Add/AddWorkExperience";
import AddEmployeeIdentity from "./RelatedTables/Add/AddEmployeeIdentity";
import AddEmployeeSkills from "./RelatedTables/Add/AddEmployeeSkills";
import AddEmployeeAddress from "./RelatedTables/Add/AddEmployeeAddress";
import AddCommunicationDetails from "./RelatedTables/Add/AddCommunicationDetails";
import AddEducation from "./RelatedTables/Add/AddEducation";
// import AddCommunicationDetails from "../../../playground/AddCommunicationetails";



export default function FormType({
  formType,
  employeeId,
  employeeName,
  employmentType,
  designation,
  identityType,
  countries,
  skillCategories,
  skillLevel,
  addressType,
  phoneType,
  qualification,
  qualificationStatus
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

    case "AddEmployeeSkills":
      return (
        <AddEmployeeSkills
          employeeId={employeeId}
          skillCategories={skillCategories}
          skillLevel={skillLevel}
        />
      );

    case "AddEmployeeAddress":
      return (
        <AddEmployeeAddress
          employeeId={employeeId}
          addressType={addressType}
          countries={countries}
        />
      );

    case "AddCommunicationDetails":
      return (
        <AddCommunicationDetails
          employeeId={employeeId}
          phoneType={phoneType}
        />
      );
        
    case "AddEducation": 
    return (
      <AddEducation
      employeeId={employeeId}
      qualification={qualification}
      qualificationStatus={qualificationStatus}
      />
    )

    default:
      return null;
  }
}
