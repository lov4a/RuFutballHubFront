export type TNavItem = {
  label: string
  to: string
  orderNumber: number
}

export const NAV_ITEMS: TNavItem[] = [
  { label: 'Новости', to: '/news', orderNumber: 0 },
  { label: 'Ожидаемые очки', to: '/', orderNumber: 1 },
  { label: 'Календарь', to: '/fixtures-ticker', orderNumber: 1 },
  { label: 'Ожидаемые составы', to: '/predicted-lineups', orderNumber: 1 },
]