import Tabs from "./Tabs";

const TabsRender = ({ employeeData, employmentType, designation }) => {
  return (
    <Tabs
      color="blue"
      employeeData={employeeData}
      employmentType={employmentType}
      designation={designation}
    />
  );
};

export default TabsRender;
