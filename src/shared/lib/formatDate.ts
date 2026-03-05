export function formatMatchDate(date: string) {
  const d = new Date(date)

  const dayMonth = d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  })

  const time = d.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${dayMonth} • ${time}`
}