import styles from "../styles/Home.module.css";
import { useKeycloak } from "@react-keycloak/ssr";
// import jwt_decode from "jwt-decode";  
// import { RenderOnAuthenticated } from "../components/utils/supabase/renderOnAuthenticated";
// import { signIn, signOut, useSession } from 'next-auth/client'
// import { Auth, Button, Icon, Card, Space } from "@supabase/ui";
// import { supabase } from "../components/utils/supabase/initSupabase";

export default function Home() {
  const { keycloak, initialized } = useKeycloak()
  // console.log(keycloak)
  // const decoded = jwt_decode(keycloak.refreshToken);
  // console.log(decoded,{header:true})
//   function parseJwt(token) {
//     if (!token) { return; }
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace('-', '+').replace('_', '/');
//     return JSON.parse(atob(base64));
// }

// console.log(parseJwt(keycloak.token))
  // const [session, loading] = useSession()
  return (
    // <div>
    <div>
      <h1>Welcome to keycloak-nextauth authentication  </h1>
    </div>
//     <div>
//     <div>{`User is ${
//       !keycloak.authenticated ? 'NOT ' : ''
//     }authenticated`}</div>
// <div>

// {!keycloak.authenticated && (
//  <button type="button" onClick={() => keycloak.login()}>
//    Login
//  </button>
// )}
// </div>
//     {keycloak.authenticated && (
//       <button type="button" onClick={() => keycloak.logout()}>
//         Logout
//       </button>
//     )}
//   </div>
//   </div>

  );
}
