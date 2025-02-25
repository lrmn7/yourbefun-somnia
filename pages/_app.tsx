import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import avatar from '../components/Somnia/avatar'
import Disclaimer from '../components/Somnia/disclaimer' // Import Disclaimer

const queryClient = new QueryClient()

import { config } from '../components/Somnia/wagmi'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme()}
          avatar={avatar}
          appInfo={{ disclaimer: Disclaimer }}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
