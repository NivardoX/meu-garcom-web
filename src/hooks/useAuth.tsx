import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
