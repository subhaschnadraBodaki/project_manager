import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';


import {Auth} from '@supabase/ui'
import { supabase } from '../components/utils/supabase/initSupabase'
import NavBar from '../components/NavBar'

// import {Auth} from '@supabase/ui'
// import { supabase } from '../components/utils/supabase/initSupabase'

import cookie from 'cookie'
// import {SSRKeycloakProvider , SSRCookies} from  '@react-keycloak/ssr'
import { QueryClient, QueryClientProvider } from 'react-query'




// const keycloakCfg = {
//   url: 'http://localhost:8080/auth',
//   realm: 'test',
//   clientId: 'client-react',
//   verify_token_audience: true,
//   use_resource_role_mappings: true,
// }

const queryClient = new QueryClient()


function MyApp({ Component, pageProps ,cookies}) {
  // const navLinks =[ 'Dashboard', 'Projects' , 'Employees']
  return (
    
  //   <SSRKeycloakProvider
  //   keycloakConfig={keycloakCfg}
  //   persistor={SSRCookies(cookies)}
  // >
     /* <Auth.UserContextProvider supabaseClient={supabase} > */

    <QueryClientProvider client={queryClient}>
       <NavBar/>
      <Component {...pageProps} />
      </QueryClientProvider>

     /* </Auth.UserContextProvider> */
    // </SSRKeycloakProvider>
     
  )
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}


MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}


export default MyApp
