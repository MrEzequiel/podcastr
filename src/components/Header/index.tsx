import React from 'react'
import Image from 'next/image'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import { HeaderContainer, LeftWrapper } from './style'
import Link from 'next/link'

const Header: React.FC = () => {
  const currentDate = format(new Date(), 'EEEEEE, d, MMMM', { locale: ptBR })

  return (
    <HeaderContainer>
      <LeftWrapper>
        <Link href="/">
          <a>
            <Image
              src="/logo.svg"
              alt="logo podcastr"
              width={120}
              height={50}
            />
          </a>
        </Link>

        <p>O melhor para você sempre</p>
      </LeftWrapper>

      <p>{currentDate}</p>
    </HeaderContainer>
  )
}

export default Header
