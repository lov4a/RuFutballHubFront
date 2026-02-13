import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export function NewsEditor({ value = '', onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div>
      {/* Toolbar */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
