import { useState } from "react";
import formatDate from "../../utils/FormatDate";
import Link from "next/link";

const Section2 = ({ employeeData }) => {
  const [MoreDetails, setMoreDetails] = useState(false);

  if (employeeData[0] == null || employeeData[0] === undefined) {
    return <div>No Data Found</div>;
  }

  const columns = [
    "Job Title",
    "Employment Status",
    "Joined Date",
    "Confirmation Date",
    "Email",
    "Country",
  ];

  const {
    job_title,
    employment_status,
    joined_date,
    confirmation_date,
    work_email,
    country,
  } = employeeData[0];

  const jDate = dateFormat(joined_date);
  const cDate = dateFormat(confirmation_date);

  const values = [
    job_title,
    employment_status,
    jDate,
    cDate,
    work_email,
    country,
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

function dateFormat(date) {
  if (date !== null) {
    return formatDate(date);
  } else {
    return date;
  }
}

export default Section2;
