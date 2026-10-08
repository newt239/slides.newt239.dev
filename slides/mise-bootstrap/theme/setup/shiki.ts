import { defineShikiSetup } from '@slidev/types'

type HastNode = { type: string, value?: string, children?: HastNode[] }

const textOf = (node: HastNode): string =>
  node.type === 'text' ? node.value ?? '' : (node.children ?? []).map(textOf).join('')

export default defineShikiSetup(() => ({
  transformers: [
    {
      line(node) {
        if (textOf(node as HastNode).trimStart().startsWith('#'))
          this.addClassToHast(node, 'comment-line')
      },
    },
  ],
}))
