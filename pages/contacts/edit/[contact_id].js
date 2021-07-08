import axios from "axios";
// import EditContact from '../../../components/Contacts/EditContact/EditContact';
import EditContact from "../../../components/Contacts/EditContact/Tabs/EditContact";

const editcontact = ({ accountData, contactdata }) => {
  const contactId = contactdata[0].id;
  return (
    <EditContact
      contactId={contactId}
      contactdata={contactdata}
      accountData={accountData}
    />
  );
};

export async function getServerSideProps(context) {
  const { contact_id } = context.query;
  const response = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/contacts?id=eq.${contact_id}`,
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
  const contactdata = data[0].data;
  const accountData = data[1].data;

  return {
    props: {
      contactdata,
      accountData,
    },
  };
}

export default editcontact;
