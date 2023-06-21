import {
  SideBarContainer,
  SideBarLogoImage,
  SideBarName,
  SideBarOptionContent,
  ExitButton
} from './styles'
import LogoImage from '../../../../assets/Logo.svg'
import { IoRestaurantOutline } from 'react-icons/io5'
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
