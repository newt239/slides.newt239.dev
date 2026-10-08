type HastNode = { type: string, value?: string, children?: HastNode[] }

const textOf = (node: HastNode): string =>
  node.type === 'text' ? node.value ?? '' : (node.children ?? []).map(textOf).join('')

export default () => ({
  transformers: [
    {
      line(this: { addClassToHast: (node: HastNode, className: string) => void }, node: HastNode) {
        if (textOf(node).trimStart().startsWith('#'))
          this.addClassToHast(node, 'comment-line')
      },
    },
  ],
})
