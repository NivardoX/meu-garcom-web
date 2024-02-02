import {
  SideBarContainer,
  SideBarLogoImage,
  SideBarName,
  SideBarOptionContent,
  ExitButton,
} from './styles'
import LogoImage from '../../../../assets/LogoBg.png'
import { IoRestaurantOutline } from 'react-icons/io5'
import { VscWarning } from 'react-icons/vsc'
import { IoIosLogOut } from 'react-icons/io'
import { useAuth } from '../../../../hooks/useAuthProvider'

export function SideBarProvider() {
  const { signOut } = useAuth()

  return (
    <SideBarContainer>
      <SideBarLogoImage src={LogoImage} />

      <SideBarOptionContent to="/provider/restaurant">
        <IoRestaurantOutline size={33} color="#D1D2DC" />
        <SideBarName>Restaurantes</SideBarName>
      </SideBarOptionContent>

      <SideBarOptionContent to="/provider/restaurant/desactive">
        <VscWarning size={33} color="#D1D2DC" />
        <SideBarName>Restaurantes inativos</SideBarName>
      </SideBarOptionContent>

      <ExitButton
        style={{ marginTop: 'auto', paddingBottom: 30 }}
        onClick={signOut}
      >
        <IoIosLogOut size={33} color="#D1D2DC" />
        <SideBarName>SAIR</SideBarName>
      </ExitButton>
    </SideBarContainer>
  )
}
