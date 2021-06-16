import React from "react";
import TabsContent1 from "./TabsContent1";
import TabsContent2 from "./TabsContent2";
import TabsContent3 from "./TabsContent3";

const Tabs = ({ color, tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9, tab10 }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const tabs = ['Teams', 'Risks', 'Deliverables', 'Issues', 'Change Requests', 'Resource Requests', 'Status Reports', 'Financials', 'Milestones', 'Tasks']
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
                <li key={index} className="-mb-px flex-grow h-10 w-10 mr-2 last:mr-0  flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === index+1
                        ? "text-white bg-" + color + "-500"
                        : "text-" + color + "-500 bg-white")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(index+1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    <i className="fas fa-space-shuttle text-base mr-1"></i> {tab}
                  </a>
                </li>
              )
            })}

          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <TabsContent1 />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <TabsContent2 />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <TabsContent3 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs