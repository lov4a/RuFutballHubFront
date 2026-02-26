import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { useRef } from 'react'

export const ResizableImageComponent = ({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const startResizing = (event: React.MouseEvent) => {
    event.preventDefault()

    const startX = event.clientX
    const startWidth = containerRef.current?.offsetWidth || 0

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX)

      updateAttributes({
        width: Math.max(100, newWidth),
      })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

return (
  <NodeViewWrapper
    style={{
      display: 'flex',
      justifyContent:
        node.attrs.align === 'left'
          ? 'flex-start'
          : node.attrs.align === 'right'
          ? 'flex-end'
          : 'center',
      position: 'relative',
      margin: '16px 0',
    }}
  >
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: node.attrs.width,
        border: selected ? '2px solid #4c9aff' : 'none',
      }}
    >
      {/* 🔵 Панель управления */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: -36,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
            background: '#1e1e1e',
            padding: '6px 10px',
            borderRadius: 6,
            color: 'white',
            fontSize: 14,
          }}
        >
          <button onClick={() => updateAttributes({ align: 'left' })}>
            ⬅
          </button>
          <button onClick={() => updateAttributes({ align: 'center' })}>
            ⬍
          </button>
          <button onClick={() => updateAttributes({ align: 'right' })}>
            ➡
          </button>
        </div>
      )}

      <img
        src={node.attrs.src}
        style={{
          width: '100%',
          display: 'block',
        }}
      />

      {selected && (
        <div
          onMouseDown={startResizing}
          style={{
            position: 'absolute',
            right: -6,
            bottom: -6,
            width: 12,
            height: 12,
            background: '#4c9aff',
            cursor: 'nwse-resize',
          }}
        />
      )}
    </div>
  </NodeViewWrapper>
)


}
