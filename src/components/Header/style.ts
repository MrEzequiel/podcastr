import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 6.5rem;
  padding: 2rem 4rem;

  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray100};

  & > p {
    text-transform: capitalize;
  }
`

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    cursor: pointer;
  }

  p {
    margin-left: 2rem;
    padding-left: 2rem;
    border-left: 1px solid ${props => props.theme.colors.gray100};
    color: ${props => props.theme.colors.gray500};
  }
`
