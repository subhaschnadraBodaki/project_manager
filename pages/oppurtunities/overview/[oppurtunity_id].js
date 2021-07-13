import React from "react";
import axios from "axios";

import Heading from "../../../components/Oppurtunities/OppurtunityOverview/Heading";
import Section1 from "../../../components/Oppurtunities/OppurtunityOverview/Section1";
import Section2 from "../../../components/Oppurtunities/OppurtunityOverview/Section2";

const OppurtunityOverview = ({ oppurtunitydata }) => {
  return (
    <>
      <div className="mx-10 px-5">
        <Heading label="contact Overview" />
      </div>
      <div className="mx-1 px-2 ">
        <div>
          <Section1 oppurtunitydata={oppurtunitydata} />
        </div>
        <div>
          <Section2 oppurtunitydata={oppurtunitydata} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { oppurtunity_id } = context.query;

  const oppurtunity = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities?id=eq.${oppurtunity_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });

  
  const oppurtunitydata = oppurtunity.data
  return {
    props: {
        oppurtunitydata,
    },
  };
}

export default OppurtunityOverview;
