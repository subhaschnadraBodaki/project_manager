import axios from "axios";
// import EditOppurtunity from '../../../components/Contacts/EditContact/EditContact';
import EditContact from "../../../components/Oppurtunities/EditOppurtunity/EditOppurtunity";

const editoppurtunity = ({ accountdata, oppurtunitydata }) => {
  const oppurtunityId = oppurtunitydata[0].id;
  return (
    <EditContact
    oppurtunityId={oppurtunityId}
    oppurtunitydata={oppurtunitydata}
      accountdata={accountdata}
    />
  );
};

export async function getServerSideProps(context) {
  const { oppurtunity_id } = context.query;
  const response = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities?id=eq.${oppurtunity_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const response1 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=id,account_name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([response, response1]);
  const oppurtunitydata = data[0].data;
  const accountdata = data[1].data;

  return {
    props: {
      oppurtunitydata,
      accountdata,
    },
  };
}

export default editoppurtunity;
