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
  phoneType
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
    />
  );
};

export default TabsRender;
