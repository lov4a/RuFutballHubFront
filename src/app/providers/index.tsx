import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { ErrorProvider } from './ErrorProvider'


type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ErrorProvider>
  )
}
