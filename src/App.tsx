import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'
import * as AuthContext  from './Context/AuthContext'
import { AuthContextProvider } from './Context/AuthProviderContext'
import { Router } from './routes'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { AppToastProvider } from './Context/AppToast'
import { TablesProvider } from './Context/TablesContext'

export function App() {
  return (
    <ChakraProvider theme={defaultTheme} resetCSS>
      <BrowserRouter>
        <AppToastProvider>
          <AuthContext.AuthContextProvider>
            <AuthContextProvider>
            <CookiesProvider>
              <TablesProvider>
                <Router />
                <GlobalStyles />
              </TablesProvider>
            </CookiesProvider>
            </AuthContextProvider>
          </AuthContext.AuthContextProvider>
        </AppToastProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
