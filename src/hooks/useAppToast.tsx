import { AppToastContext } from '../Context/AppToast'
import { useContext } from 'react'

export function useAppToast() {
  const context = useContext(AppToastContext)

  return context
}
