import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from '../components/Header'
import Player from '../components/Player'
import PlayerContextProvider from '../context/PlayerContext'
import {
  AppContainer,
  ComponentWrapper,
  MainContainer,
} from '../styles/AppStyle'
import { GlobalStyles } from '../styles/GlobalStyle'
import mainTheme from '../styles/theme/mainTheme'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const mainContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleRouteComplete = () => {
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTo(0, 0)
      }
    }

    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [router])

  return (
    <PlayerContextProvider>
      <ThemeProvider theme={mainTheme}>
        <Head>
          <title>Podcastr</title>
        </Head>

        <AppContainer>
          <MainContainer>
            <Header />
            <ComponentWrapper ref={mainContainerRef}>
              <Component {...pageProps} />
            </ComponentWrapper>
          </MainContainer>

          <Player />
        </AppContainer>
        <GlobalStyles />
      </ThemeProvider>
    </PlayerContextProvider>
  )
}

export default MyApp
