import styles from "../../../styles/Home.module.css";
import { Auth, Card } from "@supabase/ui";
import { supabase } from "./initSupabase";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export const RenderOnAuthenticated = ({ children }) => {
  const { user, session } = Auth.useUser();
  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );
  const [authView, setAuthView] = useState("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("forgotten_password");
        if (event === "USER_UPDATED")
          setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (!user)
    return (
      <div className={styles.container}>
        <Card>
          <Auth supabaseClient={supabase} view={authView} />
        </Card>
      </div>
    );

  return (
    <>
      {authView === "forgotten_password" && (
        <Card>
          <Auth.UpdatePassword supabaseClient={supabase} />
        </Card>
      )}

      {user && <>{children}</>}
    </>
  );
};
