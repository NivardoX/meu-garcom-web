import { AppToastContext } from '../context/AppToast'
import { useContext } from 'react'

export function useAppToast() {
  const context = useContext(AppToastContext)

  return context
}
