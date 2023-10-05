import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { apiProvider as api } from '../service/apiProvider'
import { SignInProviderProps } from '../pages/ProviderPages/SignInProvider'
import { ProviderInfo } from '../@types/Provider/provider'
import { useNavigate } from 'react-router-dom'

type AuthContextDataProps = {
  signInProvider: (providerCredentials: SignInProviderProps) => Promise<void>
  providerSession: ProviderInfo | null
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate()
  const [providerSession, setProviderSession] = useState<ProviderInfo | null>(
    null,
  )
  const [lastUserUpdate, setLastUserUpdate] = useState<Date>(new Date())
  const isAuthenticated = !!providerSession

  useEffect(() => {
    const accessToken = Cookies.get('meu-garcom-web.provider.token')
    // const minutesFromLastUpdate = +differenceInMinutes(
    //   new Date(),
    //   lastUserUpdate,
    // )
    if (accessToken) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`
      console.log(lastUserUpdate)

      api
        .get('auth/provider-manager/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then((response) => {
          setLastUserUpdate(new Date())
          setProviderSession(response.data)
          navigate('/provider')
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  // async function refreshUser() {
  //   // TODO: criar setTimeOut para atualizar o usuário com o tempo para não gerar várias requests no /me
  //   console.log(user)
  //   const accessToken = Cookies.get('meu-garcom-web.token')
  //   const minutesFromLastUpdate = +differenceInMinutes(
  //     new Date(),
  //     lastUserUpdate,
  //   )
  //   if ((accessToken && minutesFromLastUpdate) || !!user) {
  //     console.log('inicou')
  //     try {
  //       const response = await api.get('/auth/restaurant-manager/me')
  //       setLastUserUpdate(new Date())
  //       setUser(response.data)
  //     } catch (error) {
  //       signOut()
  //     }
  //   }
  // }

  async function signInProvider(
    providerCredentials: SignInProviderProps,
  ): Promise<void> {
    try {
      const response = await api.post('/auth/provider-manager/sign-in', {
        username: providerCredentials.username,
        password: providerCredentials.password,
      })
      const { accessToken, user } = response.data
      api.defaults.headers.Authorization = `Bearer ${accessToken}`
      setProviderSession(user)
      Cookies.set('meu-garcom-web.provider.token', accessToken, {
        expires: 30,
        path: '/',
      })
    } catch (error) {
      console.log('Sign In Error =>', error)
    }
  }

  async function signOut() {
    Cookies.remove('meu-garcom-web.provider.token')
    setProviderSession(null)
    navigate('/provider')
  }

  return (
    <AuthContext.Provider
      value={{
        signInProvider,
        signOut,
        isAuthenticated,
        providerSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
