import { TablesContext } from '../context/TablesContext'
import { useContext } from 'react'

export function useTables() {
  const context = useContext(TablesContext)

  return context
}
