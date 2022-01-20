import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from 'src/app/store'
import { Provider } from 'react-redux'
import NavBar from '@/components/NavBar'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
      {/* <Footer /> */}
    </Provider>
  )
}

export default MyApp
