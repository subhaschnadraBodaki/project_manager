import React from "react";
import axios from "axios";

import Heading from "../../../components/contacts/ContactOverview/Heading";
import Section1 from "../../../components/contacts/ContactOverview/Section1";
import Section2 from "../../../components/contacts/ContactOverview/Section2";

const ContactOverview = ({ contactdata }) => {
  return (
    <>
      <div className="mx-10 px-5">
        <Heading label="contact Overview" />
      </div>
      <div className="mx-1 px-2 ">
        <div>
          <Section1 contactdata={contactdata} />
        </div>
        <div>
          <Section2 contactdata={contactdata} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { contact_id } = context.query;

  const account = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/contacts?id=eq.${contact_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });

  if (account.status != 200) throw new Error(account.statusText);

  const response = account.data;
  return {
    props: {
      response,
    },
  };
}

export default ContactOverview;
