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
    />
  );
};

export default TabsRender;
