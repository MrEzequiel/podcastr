import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import Header from '../components/Header'
import Player from '../components/Player'
import {
  AppContainer,
  ComponentWrapper,
  MainContainer,
} from '../styles/AppStyle'
import { GlobalStyles } from '../styles/GlobalStyle'
import mainTheme from '../styles/theme/mainTheme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <Head>
        <title>Podcastr</title>
      </Head>

      <AppContainer>
        <MainContainer>
          <Header />
          <ComponentWrapper>
            <Component {...pageProps} />
          </ComponentWrapper>
        </MainContainer>

        <Player />
      </AppContainer>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp
