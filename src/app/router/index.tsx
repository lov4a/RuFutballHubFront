import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { RequireAuth } from './RequireAuth'

import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/login'
import { RegisterPage } from '../../pages/register'
import { ProfilePage } from '../../pages/profile'
import { AdminPage } from '../../pages/admin'
import { UserRole } from '../../shared/auth/roles'
import { AuthNavigationEffect } from '../providers/AuthNavigationEffect'
import { ManualUnderstatMatchingPage } from '../../pages/admin/manualPlayerMatching'
import { ManualFotMobMatchingPage } from '../../pages/admin/manualPlayerMatching'

import { NewsEditorPage } from '../../pages/newsEditor'


export function AppRouter() {
  return (
    <>
    <AuthNavigationEffect />

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        
        <Route element={<RequireAuth roles={[UserRole.Admin]} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/manual-player-matching/understat" element={<ManualUnderstatMatchingPage  />} />
            <Route path="/admin/manual-player-matching/fotmob" element={<ManualFotMobMatchingPage />} />
          </Route>

          <Route element={<RequireAuth roles={[UserRole.Admin, UserRole.Editor]} />}>
              <Route path="/create-news" element={<NewsEditorPage />} />
          </Route>
      </Route>
    </Routes>
    </>

  )
}
