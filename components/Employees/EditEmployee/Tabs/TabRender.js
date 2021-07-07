import Tabs from "./Tabs";

const TabsRender = ({
  employeeData,
  employmentType,
  designation,
  identityType,
  countries,
  skillCategories,
  skillLevel,
  addressType,
  phoneType,
  qualification,
  qualificationStatus,
}) => {
  return (
    <Tabs
      color="blue"
      employeeData={employeeData}
      employmentType={employmentType}
      designation={designation}
      identityType={identityType}
      countries={countries}
      skillCategories={skillCategories}
      skillLevel={skillLevel}
      addressType={addressType}
      phoneType={phoneType}
      qualification={qualification}
      qualificationStatus={qualificationStatus}
    />
  );
};

export default TabsRender;
