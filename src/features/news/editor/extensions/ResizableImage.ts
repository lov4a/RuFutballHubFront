import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ResizableImageComponent } from './ResizableImageComponent'
import type { CommandProps } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resizableImage: {
      setImage: (options: { src: string; width?: number }) => ReturnType
      setImageAlign: (align: 'left' | 'center' | 'right') => ReturnType
    }
  }
}




export const ResizableImage = Node.create({
  name: 'resizableImage',

  group: 'block',
  draggable: true,
  selectable: true,

addAttributes() {
  return {
    src: {
      default: null,
      parseHTML: element => element.getAttribute('src'),
      renderHTML: attributes => {
        if (!attributes.src) {
          return {}
        }
        return {
          src: attributes.src,
        }
      },
    },
    width: {
      default: 400,
      parseHTML: element => {
        const width = element.getAttribute('width')
        return width ? parseInt(width) : 400
      },
      renderHTML: attributes => {
        return {
          width: attributes.width,
        }
      },
    },
    align: {
      default: 'center',
      parseHTML: element =>
        element.getAttribute('data-align') || 'center',
      renderHTML: attributes => {
        return {
          'data-align': attributes.align,
        }
      },
    },
  }
},

parseHTML() {
  return [
    {
      tag: 'img',
    },
  ]
},

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent)
  },

addCommands() {
  return {
    setImage:
      (options: { src: string; width?: number }) =>
      ({ commands }: CommandProps) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },

    setImageAlign:
      (align: 'left' | 'center' | 'right') =>
      ({ commands }) =>
        commands.updateAttributes(this.name, { align }),
  }
}

})
