import { Auth, Card, Space } from "@supabase/ui";
import { Children } from "react";
import { supabase } from "./initSupabase";

export const RenderOnAuthenticated = ({children}) => {
  const { user, session } = Auth.useUser();

  if (!user) 
    return (
      <>
        <Card>
          <Auth supabaseClient={supabase} />
        </Card>
      </>
    );
  

  return children;
};
