import type { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { MainNav } from './MainNav'
import styles from '../navigation.module.css'

export type HeaderProps = {
  onMenuClick: () => void
  afterNav?: ReactNode
}

export function Header({ onMenuClick, afterNav }: HeaderProps) {
  return (
    <header className={styles.header}>
      <TopBar />
      <MainNav onMenuClick={onMenuClick} />
      {afterNav}
    </header>
  )
}
