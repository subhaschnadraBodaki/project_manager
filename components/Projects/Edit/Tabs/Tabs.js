import React from "react";
import TasksTable from "./RelatedTables/TasksTable";
import TeamsTable from "./RelatedTables/TeamsTable";
import ChangeRequestsTable from "./RelatedTables/ChangeRequestsTable";
import DeliverablesTable from "./RelatedTables/DeliverablesTable";
import FinancialsTable from "./RelatedTables/FinancialsTable";
import IssuesTable from "./RelatedTables/IssuesTable";
import MilestonesTable from "./RelatedTables/MilestonesTable";
import ResourceRequestTable from "./RelatedTables/ResourceRequestTable";
import RisksTable from "./RelatedTables/RisksTable";
import StatusReportsTable from "./RelatedTables/StatusReportsTable";

const Tabs = ({ color, projectsData }) => {
  const [openTab, setOpenTab] = React.useState(1);

  const tabs = [
    "Tasks",
    "Milestones",
    "Team",
    "Risks",
    "Deliverables",
    "Issues",
    "Change Req.",
    "Resource Req.",
    "Status "
    // "Financials",
  ];

  const TabsContent = [
    <TasksTable projectsData={projectsData} />,
    <MilestonesTable projectsData={projectsData} />,
    <TeamsTable projectsData={projectsData} />,
    <RisksTable projectsData={projectsData} />,
    <DeliverablesTable projectsData={projectsData} />,
    <IssuesTable projectsData={projectsData} />,
    <ChangeRequestsTable projectsData={projectsData} />,
    <ResourceRequestTable projectsData={projectsData} />,
    <StatusReportsTable projectsData={projectsData} />,
    // <FinancialsTable projectsData={projectsData} />,
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

// -mb-px flex-grow h-10 w-10  mr-2 last:mr-0  flex-auto text-center
