import { Outlet, useLocation } from 'react-router-dom'

import { Header } from '../../widgets/navigation'
import { Footer } from '../../widgets/footer'
import { LeftPromoRail, RightPromoRail } from '../../widgets/promo'
import { FeaturesBar } from '../../widgets/featuresBar'

import { ErrorNotification } from '../notifications/ErrorNotification'
import { useGlobalError } from '../providers/ErrorProvider'

import styles from './MainLayout.module.css'

export function MainLayout() {
  const { message } = useGlobalError()
  const location = useLocation()

  // 👉 Здесь можно управлять логикой отключения зон
  const hideWidgets = location.pathname.startsWith('/fixtures-ticker')
  const hideAds = false // при необходимости тоже можно отключать

  return (
    <>
      <Header
        onMenuClick={() => {}}
        afterNav={
          message && <ErrorNotification message={message} />
        }
      />

      <div
        className={`${styles.page} 
        ${hideWidgets ? styles.noWidgets : ''} 
        ${hideAds ? styles.noAds : ''}`}
      >
        {!hideAds && (
          <aside className={styles.leftAd}>
            <LeftPromoRail />
          </aside>
        )}

        <main className={styles.main}>
          <Outlet />
        </main>

        {!hideWidgets && (
          <aside className={styles.widgets}>
            <FeaturesBar/>
          </aside>
        )}

        {!hideAds && (
          <aside className={styles.rightAd}>
            <RightPromoRail />
          </aside>
        )}
      </div>
      <Footer />
    </>
  )
}