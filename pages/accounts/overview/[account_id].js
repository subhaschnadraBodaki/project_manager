import React from "react";
import axios from "axios";

import Heading from "../../../components/Accounts/AccountOverview/Heading";
import Section1 from "../../../components/Accounts/AccountOverview/Section1";
import Section2 from "../../../components/Accounts/AccountOverview/Section2";

const accouuntOverview = ({ accountData }) => {
  return (
    <>
      <div className="mx-10 px-5">
        <Heading label="Account Overview" />
      </div>
      <div className="mx-1 px-2 ">
        <div>
          <Section1 accountData={accountData} />
        </div>
        <div>
          <Section2 accountData={accountData} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { account_id } = context.query;

  const account = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?id=eq.${account_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });

  if (account.status != 200) throw new Error(account.statusText);

  const accountData = account.data;
  return {
    props: {
      accountData,
    },
  };
}

export default accouuntOverview;
