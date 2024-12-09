import type { AppProps } from 'next/app'

// This is a minimal custom App component that won't affect our static HTML
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
