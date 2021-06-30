import React from "react";
import axios from "axios";

import Heading from "../../../components/Employees/EmployeeOverview/Heading";
import Section1 from "../../../components/Employees/EmployeeOverview/Section1";
import Section2 from "../../../components/Employees/EmployeeOverview/Section2";

const EmployeeOverview = ({ employeeData }) => {
  return (
    <>
      <div className="mx-10 px-5">
        <Heading label="Employee Overview" />
      </div>
      <div className="mx-1 px-2 ">
        <div>
          <Section1 employeeData={employeeData} />
        </div>
        <div>
          <Section2 employeeData={employeeData} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
    const { employee_id } = context.query;
  
    const employee = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?employee_id=eq.${employee_id}`,
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    });
  
    if (employee.status != 200) throw new Error(employee.statusText);
  
    const employeeData = employee.data;
    return {
      props: {
        employeeData,
      },
    };
  }

export default EmployeeOverview;