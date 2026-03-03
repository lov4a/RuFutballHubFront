import { useEffect, useState } from 'react'
import { api } from '../../../shared/api/axios'
import { Link } from 'react-router-dom'
import styles from './newsList.module.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

type News = {
  id: string
  title: string
  summary: string
  publishedAt?: string
  mainImage: {
    originalUrl: string
    mediumUrl?: string
  }
}

type ApiResponse = {
  pageNumber: number
  pageSize: number
  totalCount: number
  items: News[]
}

export function NewsListPage() {
  const [news, setNews] = useState<News[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const pageSize = 12

  useEffect(() => {
    load()
  }, [page])

  const load = async () => {
    try {
      setLoading(true)

      const { data } = await api.get<ApiResponse>(
        `/news?pageNumber=${page}&pageSize=${pageSize}`
      )

      setNews(data.items)
      setTotalPages(
        Math.ceil(data.totalCount / pageSize)
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Загрузка...</div>

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Новости</h1>

      <div className={styles.grid}>
        {news.map(item => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className={styles.card}
          >
            <img
              src={
                SERVER_URL +
                (item.mainImage.mediumUrl ??
                  item.mainImage.originalUrl)
              }
              alt={item.title}
            />

            <div className={styles.cardContent}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Пагинация */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          ←
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          →
        </button>
      </div>
    </div>
  )
}