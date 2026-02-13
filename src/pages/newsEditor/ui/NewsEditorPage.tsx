import { useState } from 'react'
import { NewsEditor } from '../../../features/news/editor/NewsEditor'

export  function NewsEditorPage() {
  const [content, setContent] = useState('')

  return (
    <div>
      <h1>Создание новости</h1>

      <NewsEditor value={content} onChange={setContent} />

      <h3>HTML результат:</h3>
      <pre>{content}</pre>
    </div>
  )
}
