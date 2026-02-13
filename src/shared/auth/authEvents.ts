type AuthEvent = 'session-expired'

type Listener = () => void

const listeners: Record<AuthEvent, Listener[]> = {
  'session-expired': [],
}

export const authEvents = {
  on(event: AuthEvent, listener: Listener) {
    listeners[event].push(listener)
  },

  off(event: AuthEvent, listener: Listener) {
    listeners[event] = listeners[event].filter((l) => l !== listener)
  },

  emit(event: AuthEvent) {
    listeners[event].forEach((l) => l())
  },
}
