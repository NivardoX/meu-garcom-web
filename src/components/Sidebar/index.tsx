import {
  ExitButton,
  SideBarContainer,
  SideBarLogoImage,
  SideBarName,
  SideBarOptionContent,
} from './styles'
import LogoImage from '../../assets/LogoBg.png'
import { IoFastFoodOutline } from 'react-icons/io5'
import { RxDashboard, RxPerson } from 'react-icons/rx'
import { TbTie } from 'react-icons/tb'
import { AiOutlineTag } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io'
import { useAuth } from '../../hooks/useAuth'

export function SideBar() {
  const { signOut } = useAuth()
  return (
    <SideBarContainer>
      <SideBarLogoImage src={LogoImage} />
      <SideBarOptionContent to="/restaurant/table">
        <RxDashboard size={33} color="#D1D2DC" />
        <SideBarName>MESAS</SideBarName>
      </SideBarOptionContent>

      <SideBarOptionContent to="/restaurant/product">
        <IoFastFoodOutline size={33} color="#D1D2DC" />
        <SideBarName>PRODUTOS</SideBarName>
      </SideBarOptionContent>

      <SideBarOptionContent to="/restaurant/waiter">
        <TbTie size={33} color="#D1D2DC" />
        <SideBarName>GARÇONS</SideBarName>
      </SideBarOptionContent>

      <SideBarOptionContent to="/restaurant/category">
        <AiOutlineTag size={33} color="#D1D2DC" />
        <SideBarName>CATEGORIAS</SideBarName>
      </SideBarOptionContent>

      <SideBarOptionContent to="/restaurant/employee">
        <RxPerson size={33} color="#D1D2DC" />
        <SideBarName>COLABORADORES</SideBarName>
      </SideBarOptionContent>

      <ExitButton
        onClick={signOut}
        style={{ marginTop: 'auto', paddingBottom: 30 }}
      >
        <IoIosLogOut size={33} color="#D1D2DC" />
        <SideBarName>SAIR</SideBarName>
      </ExitButton>
    </SideBarContainer>
  )
}
