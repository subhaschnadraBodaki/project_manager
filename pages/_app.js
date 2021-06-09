import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import {Provider} from 'next-auth/client'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>

    <QueryClientProvider client={queryClient}>

      <Component {...pageProps} />
    </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
