import { useState } from "react";
import Link from "next/link";

const Section2 = ({ oppurtunitydata }) => {
  const [MoreDetails, setMoreDetails] = useState(false);

  if (oppurtunitydata == null || oppurtunitydata === undefined) {
    return <div>No Data Found</div>;
  }

  const columns = [
    "Forecast Category Name",
    "Has Open Activity",
    "Has Opportunity Line Item",
    "Has Overdue Task",
    "Is Closed",
    "Is Won",
    "Stage Name",
    "Type",
  ];

  const {
    forecast_category_name,
has_open_activity,
has_opportunity_line_item,
has_overdue_task,
is_closed,
is_won,
stage_name,
type,
  } = oppurtunitydata[0];

  const values = [
    forecast_category_name,
has_open_activity,
has_opportunity_line_item,
has_overdue_task,
is_closed,
is_won,
stage_name,
type,
  ];

  const linkName = MoreDetails ? "Less Details" : "More Details ";
  const extraContent = (
    <div>
      <div className="grid grid-cols-4 grid-rows-3 grid-flow-col gap-y-0.5  gap-x-1  px-5 ">
        {columns.map((column, index) => {
          if (index < columns.length / 2) {
            return (
              <div
                key={index}
                className="col-start-1  text-base  font-serif  my-1.5 max-h-7 "
              >
                {column}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className=" col-start-3 text-base font-serif    max-h-7 my-1.5  "
              >
                {column}
              </div>
            );
          }
        })}
        {values.map((value, index) => {
          if (value === null || value === undefined) {
            return <div key={index}>-</div>;
          } else {
            return (
              <div
                key={index}
                className="text-base text-black font-normal font-mono  max-h-7 my-1.5 "
              >
                {value}
              </div>
            );
          }
        })}
      </div>
    </div>
  );

  return (
    <>
      {MoreDetails && extraContent}
      <Link href="">
        <div>
          <a
            className="cursor-pointer text-blue-900"
            onClick={() => {
              setMoreDetails(!MoreDetails);
            }}
          >
            {linkName}
          </a>
        </div>
      </Link>
    </>
  );
};

export default Section2;
