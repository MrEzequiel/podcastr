import 'styled-components'
import mainTheme from './theme/mainTheme'

export type Theme = typeof mainTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
