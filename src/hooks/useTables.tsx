import { TablesContext } from '../Context/TablesContext'
import { useContext } from 'react'

export function useTables() {
  const context = useContext(TablesContext)

  return context
}
