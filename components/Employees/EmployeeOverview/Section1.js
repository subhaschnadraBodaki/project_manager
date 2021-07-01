import formatDate from '../../utils/FormatDate'

const Section1 = ({ employeeData }) => {
  if (employeeData[0] == null || employeeData[0] === undefined) {
    return <div>No data Found</div>;
  } else {
    const columns = [
      "First Name",
      "Last Name",
      "Nationality",
      "Birthday",
      "Gender",
      "Marital Status",
    ];

    const {
      first_name,
      last_name,
      nationality,
      birthday,
      gender,
      marital_status,
    } = employeeData[0];

    const birthDate = dateFormat(birthday)

    const values = [
      first_name,
      last_name,
      nationality,
      birthDate,
      gender,
      marital_status,
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
  }
};

function dateFormat(date) {
    if (date !== null) {

        return formatDate(date)
    }
    else {
        return date
    }
}

export default Section1;
