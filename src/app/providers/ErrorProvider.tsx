import { createContext, useContext, useState, useEffect } from 'react'

type ErrorContextValue = {
  message: string | null
  showError: (msg: string) => void
}

const ErrorContext = createContext<ErrorContextValue | null>(null)

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const showError = (msg: string) => {
    setMessage(msg)
  }

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 4000)
    return () => clearTimeout(t)
  }, [message])

  return (
    <ErrorContext.Provider value={{ message, showError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useGlobalError() {
  const ctx = useContext(ErrorContext)
  if (!ctx) throw new Error('useGlobalError must be used inside ErrorProvider')
  return ctx
}
