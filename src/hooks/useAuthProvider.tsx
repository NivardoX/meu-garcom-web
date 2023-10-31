import { useContext } from 'react'
import { AuthContext } from '../Context/AuthProviderContext'

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
