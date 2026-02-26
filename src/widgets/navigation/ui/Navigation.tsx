export type TNavItem = {
  label: string
  to: string
  orderNumber: number
}

export const NAV_ITEMS: TNavItem[] = [
  { label: '20 ТУР', to: '/', orderNumber: 0 },
  { label: 'Ожидаемые очки', to: '/', orderNumber: 1 },
  { label: 'Календарь', to: '/fixtures-ticker', orderNumber: 1 },
  { label: 'Ожидаемые составы', to: '/', orderNumber: 1 },
]