import Tabs from "./Tabs";

const TabsRender = ({ employeeData, employmentType, designation, identityType, countries }) => {
  return (
    
    <Tabs
      color="blue"
      employeeData={employeeData}
      employmentType={employmentType}
      designation={designation}
      identityType={identityType}
      countries={countries}
    />
  );
};

export default TabsRender;
