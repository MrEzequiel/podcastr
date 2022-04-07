import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
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
import { LoadingChangePage } from '../styles/LoadingChangePage'
import mainTheme from '../styles/theme/mainTheme'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleStart = (url: string) => {
      setIsLoading(true)
    }
    const handleStop = () => {
      setIsLoading(false)
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTo(0, 0)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
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

        <CSSTransition
          nodeRef={loadingRef}
          timeout={500}
          in={isLoading}
          classNames="loading"
          unmountOnExit
        >
          <LoadingChangePage ref={loadingRef} isLoading={isLoading}>
            <div>
              <Image src="/logo-mini.svg" layout="fill" alt="Podcastr" />
            </div>
          </LoadingChangePage>
        </CSSTransition>

        <GlobalStyles />
      </ThemeProvider>
    </PlayerContextProvider>
  )
}

export default MyApp
