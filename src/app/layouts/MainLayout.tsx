import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { Header } from '../../widgets/navigation'
import { MobileSidebar } from '../../widgets/navigation/ui/MobileSidebar'
import { Footer } from '../../widgets/footer'
import { LeftPromoRail, RightPromoRail } from '../../widgets/promo'
import { FeaturesBar } from '../../widgets/featuresBar'
import { DonateBar } from '../../widgets/donate/ui/DonateBar'
import { CookieBanner } from '../../features/coockieBanner/ui/CookieBanner'

import { ErrorNotification } from '../notifications/ErrorNotification'
import { useGlobalError } from '../providers/ErrorProvider'

import styles from './MainLayout.module.css'

export function MainLayout() {
  const { message } = useGlobalError()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)

    const pages = ['/fixtures-ticker', '/predicted-points']
    const hideWidgets = pages.some(path => location.pathname.startsWith(path))

    const hideAds = false // при необходимости тоже можно отключать

  return (
    <>
      <Header
        onMenuClick={() => setMenuOpen(true)}
        afterNav={
          <>
            {message && <ErrorNotification message={message} />}
            <MobileSidebar
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
            />
          </>
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

        <div className={styles.donateBar}>
          <DonateBar/>
        </div>

        <main className={styles.main}>
          <Outlet />
        </main>

        {!hideWidgets && (
          <aside className={styles.widgets}>
            <FeaturesBar />
          </aside>
        )}

        {!hideAds && (
          <aside className={styles.rightAd}>
            <RightPromoRail />
          </aside>
        )}
      </div>

      <CookieBanner />
      <Footer />
    </>
  )
}