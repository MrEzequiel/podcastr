import styled from 'styled-components'

export const MainContainer = styled.main`
  overflow-y: auto;
  flex: 1;
`

export const AppContainer = styled.div`
  display: flex;
`

export const ComponentWrapper = styled.div`
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray500};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.white};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray800};
  }
`
