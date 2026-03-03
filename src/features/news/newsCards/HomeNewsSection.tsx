import { useEffect, useState } from 'react'
import { api } from '../../../shared/api/axios'
import styles from './homeNews.module.css'
import { Link } from 'react-router-dom'

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

export function HomeNewsSection() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await api.get('/news?pageSize=16')
    setNews(data.items)
    setLoading(false)
  }

  if (loading) return null
  if (!news.length) return null

  const [first, ...rest] = news
  const smallNews = rest.slice(0, 15)

  return (
    <section className={styles.section}>
      <NewsHeroCard news={first} />

      <div className={styles.grid}>
        {smallNews.map(item => (
          <NewsSmallCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  )
}

function NewsHeroCard({ news }: { news: News }) {
  return (
    <Link to={`/news/${news.id}`} className={styles.hero}>
      <img
        src={
          SERVER_URL +
          (news.mainImage.mediumUrl ?? news.mainImage.originalUrl)
        }
        alt={news.title}
      />

      <div className={styles.heroContent}>
        <h2>{news.title}</h2>
        <p>{news.summary}</p>
      </div>
    </Link>
  )
}

function NewsSmallCard({ news }: { news: News }) {
  return (
    <Link to={`/news/${news.id}`} className={styles.card}>
      <img
        src={
          SERVER_URL +
          (news.mainImage.mediumUrl ?? news.mainImage.originalUrl)
        }
        alt={news.title}
      />

      <div className={styles.cardContent}>
        <h3>{news.title}</h3>
      </div>
    </Link>
  )
}