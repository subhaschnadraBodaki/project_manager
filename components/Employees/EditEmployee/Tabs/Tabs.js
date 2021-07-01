import React from "react";
import WorkExperienceData from '../Tabs/TabsData/WorkExperienceData'

const Tabs = ({ color, employeeData, employmentType, designation }) => {
  const [openTab, setOpenTab] = React.useState(1);

  const tabs = ["Education", "Communication", "Skills", "Work Exp", "Address"];

  const TabsContent = [
    'education',
    'communication',
    'skills',
    <WorkExperienceData
      employeeData={employeeData}
      employmentType={employmentType}
      designation={designation}
    />,
    'address'
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
