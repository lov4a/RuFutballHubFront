import { Outlet } from 'react-router-dom'

import { Header } from '../../widgets/navigation'
import { LeftPromoRail, RightPromoRail } from '../../widgets/promo'

import { ErrorNotification } from '../notifications/ErrorNotification'
import { useGlobalError } from '../providers/ErrorProvider'

import styles from './MainLayout.module.css'

export function MainLayout() {
  const { message } = useGlobalError()
  return (
    <>
      <Header
        onMenuClick={() => {}}
        afterNav={
          message && <ErrorNotification message={message} />
        }
      />
      
      
      <div className={styles.page}>
        <aside className={styles.left}>
          <LeftPromoRail />
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>

        <aside className={styles.right}>
          <RightPromoRail />
        </aside>
      </div>
    </>
  )
}
