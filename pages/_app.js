import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import {Provider} from 'next-auth/client'
import NavBar from '../components/NavBar'

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
  // const navLinks =[ 'Dashboard', 'Projects' , 'Employees']
  return (
    <Provider session={pageProps.session}>

    <QueryClientProvider client={queryClient}>
    {/* <NavBar dashboard={navLinks[0]}  page1={navLinks[1]} page2={navLinks[2]}></NavBar> */}
      <Component {...pageProps} />
    </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
