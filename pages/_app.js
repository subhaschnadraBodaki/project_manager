import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

import cookie from 'cookie'
import {SSRKeycloakProvider , SSRCookies} from  '@react-keycloak/ssr'
import { QueryClient, QueryClientProvider } from 'react-query'




const keycloakCfg = {
  url: 'http://localhost:8080/auth',
  realm: 'test',
  clientId: 'client-react'
}

const queryClient = new QueryClient()


function MyApp({ Component, pageProps ,cookies}) {
  // const navLinks =[ 'Dashboard', 'Projects' , 'Employees']
  return (
    
    <SSRKeycloakProvider
    keycloakConfig={keycloakCfg}
    persistor={SSRCookies(cookies)}
  >
    <QueryClientProvider client={queryClient}>
    {/* <NavBar dashboard={navLinks[0]}  page1={navLinks[1]} page2={navLinks[2]}></NavBar> */}
      <Component {...pageProps} />
      </QueryClientProvider>
    </SSRKeycloakProvider>
    
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
