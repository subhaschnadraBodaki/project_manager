const Section1 = ({ accountData }) => {

  if (accountData[0] == null || accountData[0] === undefined) {
    return <div>No data Found</div>;
  }
  else {
  const columns = [
    "Account Name",
    "Type",
    "Industry",
    "Annual Revenue",
    "No of Employees",
    "Website",
  ];

  const {
    account_name,
    type,
    industry,
    annual_revenue,
    number_of_employees,
    webiste,
  } = accountData[0];

  const values = [
    account_name,
    type,
    industry,
    annual_revenue,
    number_of_employees,
    webiste,
];

  return (
    <div>
      <div>
        <h3 className="text-lg">Basic Details</h3>
      </div>

      <div className="grid grid-cols-4 grid-rows-3 grid-flow-col gap-y-0.5 gap-x-1  p-5 ">
        {columns.map((column, index) => {
          if (index < columns.length / 2) {
            return (
              <div
                key={index}
                className=" col-start-1  text-base  font-serif my-1.5 "
              >
                {column}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className=" col-start-3 text-base font-serif my-1.5  "
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
                className="text-base text-black font-normal font-mono "
              >
                {value}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
}

export default Section1;
