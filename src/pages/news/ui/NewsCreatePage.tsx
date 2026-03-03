import { useState } from 'react'
import { NewsEditor } from '../../../features/news/editor/NewsEditor'
import { createNews } from '../../../features/news/api/createNews'
import { uploadNewsImage } from '../../../features/news/api/uploadNewsImage'

export function NewsCreatePage() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState(1)
  const [content, setContent] = useState('')

  const [mainImageId, setMainImageId] = useState<string | null>(null)
  const [mobileImageId, setMobileImageId] = useState<string | null>(null)

  const [mainPreview, setMainPreview] = useState<string | null>(null)
  const [mobilePreview, setMobilePreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  // =============================
  // IMAGE UPLOAD
  // =============================

  const handleMainImageUpload = async (file: File) => {
    const result = await uploadNewsImage(file)

    setMainImageId(result.imageId)
    setMainPreview(result.mediumUrl ?? result.originalUrl)
  }

  const handleMobileImageUpload = async (file: File) => {
    const result = await uploadNewsImage(file)

    setMobileImageId(result.imageId)
    setMobilePreview(result.mediumUrl ?? result.originalUrl)
  }

  // =============================
  // SUBMIT
  // =============================

  const handleSubmit = async () => {
    if (!title || !summary || !content || !mainImageId) {
      alert('Заполни все обязательные поля')
      return
    }

    try {
      setLoading(true)

      await createNews({
        title,
        summary,
        content,
        category,
        mainImageId,
        mobileImageId,
      })

      alert('Новость отправлена на проверку')

      // очистка формы
      setTitle('')
      setSummary('')
      setContent('')
      setMainImageId(null)
      setMobileImageId(null)
      setMainPreview(null)
      setMobilePreview(null)

    } catch {
      alert('Ошибка создания новости')
    } finally {
      setLoading(false)
    }
  }

  // =============================
  // UI
  // =============================

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Создание новости</h1>

      {/* TITLE */}
      <input
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 10 }}
      />

      {/* SUMMARY */}
      <textarea
        placeholder="Краткое описание"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 10 }}
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(Number(e.target.value))}
        style={{ marginBottom: 20, padding: 8 }}
      >
        <option value={1}>General</option>
        <option value={2}>Transfers</option>
        <option value={3}>Fantasy</option>
        <option value={4}>Analytics</option>
        <option value={5}>Interviews</option>
      </select>

      {/* MAIN IMAGE */}
      <div style={{ marginBottom: 20 }}>
        <label>Главное изображение *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleMainImageUpload(e.target.files[0])
          }
        />
        {mainPreview && (
          <img
            src={mainPreview}
            alt=""
            style={{ maxWidth: 300, marginTop: 10 }}
          />
        )}
      </div>

      {/* MOBILE IMAGE */}
      <div style={{ marginBottom: 20 }}>
        <label>Мобильное изображение</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleMobileImageUpload(e.target.files[0])
          }
        />
        {mobilePreview && (
          <img
            src={mobilePreview}
            alt=""
            style={{ maxWidth: 300, marginTop: 10 }}
          />
        )}
      </div>

      {/* CONTENT */}
      <NewsEditor value={content} onChange={setContent} />

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: '12px 24px',
          background: '#111',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Отправка...' : 'Отправить на проверку'}
      </button>
    </div>
  )
}
