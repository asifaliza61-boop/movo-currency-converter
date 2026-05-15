import { createContext, useContext, useState, useEffect } from 'react'
import { loadHistory, saveHistory, clearHistory as clearStoredHistory } from '../utils/storage'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = loadHistory()
    setHistory(stored)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveHistory(history)
    }
  }, [history, isLoaded])

  const addToHistory = (entry) => {
    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...entry,
      timestamp: new Date().toISOString(),
    }
    setHistory((prev) => [record, ...prev].slice(0, 100))
  }

  const removeFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
    clearStoredHistory()
  }

  return (
    <AppContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
