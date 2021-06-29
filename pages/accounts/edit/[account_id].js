import axios from "axios";
import EditAccount from "../../../components/Accounts/EditAccount/EditAccount";

const editAccount = ({ accountData, countries }) => {
  const accountId = accountData[0].id;
  return (
    <div>
      <EditAccount
        accountId={accountId}
        accountData={accountData[0]}
        countries={countries}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { account_id } = context.query;

  const countriesData = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/countries?select=code,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const account = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?id=eq.${account_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([countriesData, account]);

  const accountData = data[1].data;
  const countries = data[0].data;

  return {
    props: {
      accountData,
      countries,
    },
  };
}

export default editAccount;
