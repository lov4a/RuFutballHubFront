import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { useEffect } from 'react'
import { ResizableImage } from './extensions/ResizableImage'
import { uploadNewsImage } from '../api/uploadNewsImage'

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export function NewsEditor({ value = '', onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      ResizableImage,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return

    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.startsWith('image')) {
          event.preventDefault()

          const file = item.getAsFile()
          if (!file) return

          try {
              const result = await uploadNewsImage(file)

              editor
                .chain()
                .focus()
                .setImage({
                  src: result.smallUrl ?? result.originalUrl, // 👈 ВАЖНО
                  width: 400,
                })
                .run()

          } catch {
            alert('Ошибка загрузки изображения')
          }
        }
      }
    }

    editor.view.dom.addEventListener('paste', handlePaste)
    return () => {
      editor.view.dom.removeEventListener('paste', handlePaste)
    }
  }, [editor])

  if (!editor) return null

  const addLink = () => {
    const url = prompt('Введите ссылку')
    if (!url) return

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }

  const removeLink = () => {
    editor.chain().focus().unsetLink().run()
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">

  <div className="toolbar-group">
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={editor.isActive('bold') ? 'toolbar-btn active' : 'toolbar-btn'}
    >
      B
    </button>

    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={editor.isActive('italic') ? 'toolbar-btn active' : 'toolbar-btn'}
    >
      I
    </button>

    <button
      onClick={() =>
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      }
      className={
        editor.isActive('heading', { level: 2 })
          ? 'toolbar-btn active'
          : 'toolbar-btn'
      }
    >
      H2
    </button>
  </div>

  <div className="toolbar-group">
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={editor.isActive('bulletList') ? 'toolbar-btn active' : 'toolbar-btn'}
    >
      •
    </button>

    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={editor.isActive('orderedList') ? 'toolbar-btn active' : 'toolbar-btn'}
    >
      1.
    </button>
  </div>

  <div className="toolbar-group">
    <button onClick={addLink} className="toolbar-btn">🔗</button>
    <button onClick={removeLink} className="toolbar-btn">❌🔗</button>
  </div>

  <div className="toolbar-group">
    <button
      onClick={() =>
        editor.chain().focus().insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        }).run()
      }
      className="toolbar-btn"
    >
      ⬜ Table
    </button>
  </div>

</div>


      <EditorContent editor={editor} className="editor-content" />
    </div>
  )
}
