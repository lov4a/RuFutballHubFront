import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getNewsForModeration,
  publishNews,
  rejectNews,
} from '../../../features/news/api/moderation'


type NewsItem = {
  id: string
  title: string
  summary: string
  createdAt: string
}

export function NewsModerationPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const data = await getNewsForModeration()
      setNews(data)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (id: string) => {
    await publishNews(id)
    setNews(prev => prev.filter(n => n.id !== id))
  }

  const handleReject = async (id: string) => {
    if (!comment) {
      alert('Введите комментарий')
      return
    }

    await rejectNews(id, comment)
    setRejectingId(null)
    setComment('')
    setNews(prev => prev.filter(n => n.id !== id))
  }

  if (loading) return <p>Загрузка...</p>

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Модерация новостей</h1>

      {news.length === 0 && <p>Нет новостей на модерации</p>}

      {news.map(item => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            padding: 20,
            marginBottom: 20,
            borderRadius: 8,
          }}
        >
          {/* 🔹 Кликабельный заголовок */}
          <h3
            onClick={() => navigate(`/news/${item.id}`)}
            style={{ cursor: 'pointer', color: '#2563eb' }}
          >
            {item.title}
          </h3>

          <p>{item.summary}</p>

          <small>
            Создано: {new Date(item.createdAt).toLocaleString()}
          </small>

          <div style={{ marginTop: 15 }}>
            <button
              onClick={() => handlePublish(item.id)}
              style={{
                marginRight: 10,
                padding: '6px 12px',
                background: 'green',
                color: 'white',
                border: 'none',
              }}
            >
              Опубликовать
            </button>

            <button
              onClick={() => setRejectingId(item.id)}
              style={{
                padding: '6px 12px',
                background: 'red',
                color: 'white',
                border: 'none',
              }}
            >
              Отклонить
            </button>
          </div>

          {rejectingId === item.id && (
            <div style={{ marginTop: 15 }}>
              <textarea
                placeholder="Причина отказа"
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ width: '100%', padding: 8 }}
              />

              <button
                onClick={() => handleReject(item.id)}
                style={{
                  marginTop: 10,
                  padding: '6px 12px',
                  background: '#111',
                  color: 'white',
                  border: 'none',
                }}
              >
                Подтвердить отклонение
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}