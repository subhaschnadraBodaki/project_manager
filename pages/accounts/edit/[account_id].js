import { server } from "../../../config";
import axios from "axios";
import EditAccount from "../../../components/Accounts/EditAccount/EditAccount";

const editAccount = ({ accountData, countries, accountType }) => {
  const accountId = accountData[0].id;
  return (
    <div>
      <EditAccount
        accountId={accountId}
        accountData={accountData[0]}
        countries={countries}
        accountType={accountType}
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

  const accountTypeData = axios({
    method: "get",
    url: `${server}/api/enums/account_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([countriesData, account, accountTypeData]);

  const countries = data[0].data;
  const accountData = data[1].data;
  const accountType = data[2].data;

  return {
    props: {
      accountData,
      countries,
      accountType
    },
  };
}

export default editAccount;
