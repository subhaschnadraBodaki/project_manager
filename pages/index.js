import styles from "../styles/Home.module.css";
import { useKeycloak } from "@react-keycloak/ssr";
import { RenderOnAuthenticated } from "../components/utils/supabase/renderOnAuthenticated";

import { Auth, Button, Icon, Card, Space } from "@supabase/ui";
import { supabase } from "../components/utils/supabase/initSupabase";

export default function Home() {
  // const { keycloak, initialized } = useKeycloak()
  return (
    // <div>
    //   <div>
    //     <h1>Welcome to keycloak-nextauth authentication  </h1>
    //   </div>
    //   <div>
    //     <div>{`User is ${!keycloak.authenticated ? 'NOT ' : ''
    //       }authenticated`}</div>
    //     <div>

    //       {!keycloak.authenticated && (
    //         <button type="button" onClick={() => keycloak.login()}>
    //           Login
    //         </button>
    //       )}
    //     </div>
    //     {keycloak.authenticated && (
    //       <button type="button" onClick={() => keycloak.logout()}>
    //         Logout
    //       </button>
    //     )}
    //   </div>
    // </div>

    <RenderOnAuthenticated>
      <div className={styles.container}>
        <h1>Welcome To project Management</h1>
        <Button
          icon={<Icon type="LogOut" />}
          type="outline"
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </Button>
      </div>
    </RenderOnAuthenticated>
  );

  // const { user } = Auth.useUser()

  // if(!user) {
  //   return (
  //     <div>
  //       <Space direction="vertical" size={8}>
  //         <Card>
  //           <Auth supabaseClient={supabase} />
  //         </Card>
  //       </Space>
  //     </div>
  //   )
  // }

  // return (
  //   <h1>Welcome to supabase Auth</h1>
  // )
}
