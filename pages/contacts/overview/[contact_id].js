import React from "react";
import axios from "axios";

import Heading from "../../../components/Contacts/ContactOverview/Heading";
import Section1 from "../../../components/Contacts/ContactOverview/Section1";
import Section2 from "../../../components/Contacts/ContactOverview/Section2";

const ContactOverview = ({ contactData }) => {
  return (
    <>
      <div className="mx-10 px-5">
        <Heading label="contact Overview" />
      </div>
      <div className="mx-1 px-2 ">
        <div>
          <Section1 contactData={contactData} />
        </div>
        <div>
          <Section2 contactData={contactData} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { contact_id } = context.query;

  const contact = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/contacts?id=eq.${contact_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });

  
  const contactData = contact.data
  return {
    props: {
      contactData,
    },
  };
}

export default ContactOverview;
