import { server } from "../../config";
import AccountForm from "../../components/Accounts/AccountForm";
import axios from "axios";

const add = ({ countries, accountType }) => {
  return <AccountForm countries={countries} accountType={accountType} />;
};

export async function getStaticProps() {
  const countriesData = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/countries?select=code,name`,
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

  const data = await axios.all([countriesData, accountTypeData]);
  const countries = data[0].data;
  const accountType = data[1].data;

  return {
    props: {
      countries,
      accountType,
    },
    revalidate: 60,
  };
}

export default add;
