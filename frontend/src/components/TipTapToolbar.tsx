import { Node, mergeAttributes } from '@tiptap/react';
import { Command } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    foo: {
      insertFoo: () => ReturnType;
    };
  }
}

export const Foo = Node.create({
  name: 'foo',
  group: 'inline',
  inline: true,
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (node) => 
          node instanceof HTMLElement && node.hasAttribute('data-foo') && null,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes({ 'data-foo': '' }, HTMLAttributes), 'foo'];
  },
  renderText() {
    return 'foo';
  },
  addCommands() {
    return {
      insertFoo:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },
});

