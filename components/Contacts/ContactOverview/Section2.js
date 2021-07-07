import { useState } from "react";
import Link from 'next/link'

const Section2 = ({ contactdata }) => {
  const [MoreDetails, setMoreDetails] = useState(false);

  if (contactdata == null || contactdata === undefined) {
    
    return <div>No Data Found</div>;
  }

  const columns = [
    "Mailing Address",
    "Mailing City",
    "Mailing Country ",
    "Mailing State",
    "Mailing Postalcode",
    "Mailing Street",
    "Active",
    "Website",
    "Title"
  ];

  const { mailing_address,mailing_city, mailing_country, mailing_state, mailing_postalcode, mailing_street, active, website, title } = contactdata[0];
  
  const values = [mailing_address,mailing_city, mailing_country, mailing_state, mailing_postalcode, mailing_street, active, website, title];

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