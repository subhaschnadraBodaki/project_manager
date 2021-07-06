import React from "react";
import WorkExperienceData from "../Tabs/TabsData/WorkExperienceData";
import EmployeeAddressData from "./TabsData/EmployeeAddressData";
import EmployeeIdentityData from "./TabsData/EmployeeIdentityData";
import EmployeeSkillsData from "./TabsData/EmployeeSkillsData";
import CommunicationDetailsData from "./TabsData/CommunicationDetailsData";
import EducationData from "./TabsData/EducationData";

const Tabs = ({
  color,
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
  const [openTab, setOpenTab] = React.useState(1);

  const tabs = [
    "Education",
    "Communication",
    "Skills",
    "Work Exp",
    "Identity",
    "Address",
  ];

  const TabsContent = [
    <EducationData
      employeeData={employeeData}
      qualification={qualification}
      qualificationStatus={qualificationStatus}
    />,
    <CommunicationDetailsData
      employeeData={employeeData}
      phoneType={phoneType}
    />,
    <EmployeeSkillsData
      employeeData={employeeData}
      skillCategories={skillCategories}
      skillLevel={skillLevel}
    />,
    <WorkExperienceData
      employeeData={employeeData}
      employmentType={employmentType}
      designation={designation}
    />,
    <EmployeeIdentityData
      employeeData={employeeData}
      identityType={identityType}
      countries={countries}
    />,
    <EmployeeAddressData
      employeeData={employeeData}
      countries={countries}
      addressType={addressType}
    />,
  ];

  return (
    <>
      <div className="flex flex-wrap">
        <div className=" w-full">
          <ul
            className="flex  mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {tabs.map((tab, index) => {
              return (
                <li key={index} className="text-center  flex-auto mr-2">
                  <a
                    className={
                      "text-xs  font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === index + 1
                        ? "text-white bg-" + color + "-900"
                        : "text-" + color + "-900 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(index + 1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                    {tab}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {TabsContent.map((content, index) => {
                  return (
                    <div
                      key={index}
                      className={openTab === index + 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
