import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../../shared/api/axios'
import { publishNews, rejectNews } from '../../../features/news/api/moderation'
import styles from './newsDetails.module.css'
import { useAuth } from '../../../app/providers/AuthProvider'
import { UserRole } from '../../../shared/auth/roles'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

type News = {
  id: string
  title: string
  summary: string
  content: string
  status: number
  createdAt: string
  publishedAt?: string
  rejectionComment?: string
  mainImage: {
    originalUrl: string
    mediumUrl?: string
  }
  mobileImage?: {
    originalUrl: string
    mediumUrl?: string
  } | null
}

export function NewsDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const { data } = await api.get(`/news/${id}`)
      setNews(data)
    } catch {
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!id) return
    await publishNews(id)
    load()
  }

  const handleReject = async () => {
    if (!id || !comment) return
    await rejectNews(id, comment)
    load()
  }

  if (loading) return <div className={styles.loader}>Загрузка...</div>
  if (!news) return null

  const { roles } = useAuth()

  const isAdmin = roles.includes(UserRole.Admin)


  return (
    <div className={styles.page}>
      {/* HERO */}
      {news.mainImage && (
        <div className={styles.heroBlock}>
          <div className={styles.hero}>
            <picture>
              {news.mobileImage && (
                <source
                  media="(max-width: 768px)"
                  srcSet={
                    SERVER_URL +
                    (news.mobileImage.mediumUrl ??
                      news.mobileImage.originalUrl)
                  }
                />
              )}

              <img
                src={
                  SERVER_URL +
                  (news.mainImage.mediumUrl ??
                    news.mainImage.originalUrl)
                }
                alt={news.title}
              />
            </picture>

            <div className={styles.heroOverlay}>
              <h1 className={styles.title}>{news.title}</h1>
            </div>
          </div>

          {/* 👇 Мета-информация под фото */}
          <div className={styles.heroMeta}>
            <span>
              {news.publishedAt &&
                new Date(news.publishedAt).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>user</span>
          </div>
        </div>
      )}
      <div className={styles.container}>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* ===== ADMIN IMAGE CHECK ===== */}
        {isAdmin && (
          <div className={styles.adminImages}>
            <h3>Проверка изображений</h3>

            <div>
              <p>Desktop:</p>
              <img
                src={
                  SERVER_URL +
                  (news.mainImage.mediumUrl ??
                    news.mainImage.originalUrl)
                }
              />
            </div>

            {news.mobileImage && (
              <div>
                <p>Mobile:</p>
                <img
                  src={
                    SERVER_URL +
                    (news.mobileImage.mediumUrl ??
                      news.mobileImage.originalUrl)
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* ===== REJECTION COMMENT ===== */}
        {isAdmin && news.status === 3 && news.rejectionComment && (
          <div className={styles.rejection}>
            <strong>Причина отклонения:</strong>
            <p>{news.rejectionComment}</p>
          </div>
        )}

        {/* ===== MODERATION PANEL ===== */}
        {isAdmin && news.status !== 2 && (
          <div className={styles.adminPanel}>
            <h3>Модерация</h3>

            <button
              className={`${styles.button} ${styles.success}`}
              onClick={handlePublish}
            >
              Опубликовать
            </button>

            <textarea
              placeholder="Причина отказа"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <button
              className={`${styles.button} ${styles.danger}`}
              onClick={handleReject}
            >
              Отклонить
            </button>
          </div>
        )}
      </div>
    </div>
  )
}