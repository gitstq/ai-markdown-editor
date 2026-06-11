import React, { useCallback, useRef } from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { debounce } from '@/lib/utils'

export const Editor: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const content = useEditorStore((state) => state.content)
  const setContent = useEditorStore((state) => state.setContent)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debounce(() => setContent(e.target.value), 100)()
    },
    [setContent]
  )

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end)

    const newText = text.substring(0, start) + before + selected + after + text.substring(end)
    setContent(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursor = start + before.length + selected.length
      textarea.setSelectionRange(newCursor, newCursor)
    }, 0)
  }, [setContent])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/50">
        <button onClick={() => insertText('**', '**')} className="toolbar-btn" title="粗体">
          <span className="font-bold">B</span>
        </button>
        <button onClick={() => insertText('*', '*')} className="toolbar-btn" title="斜体">
          <span className="italic">I</span>
        </button>
        <button onClick={() => insertText('~~', '~~')} className="toolbar-btn" title="删除线">
          <span className="line-through">S</span>
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button onClick={() => insertText('# ')} className="toolbar-btn" title="标题">
          H
        </button>
        <button onClick={() => insertText('> ')} className="toolbar-btn" title="引用">
          <span className="text-lg">"</span>
        </button>
        <button onClick={() => insertText('- ')} className="toolbar-btn" title="列表">
          <span className="text-lg">•</span>
        </button>
        <button onClick={() => insertText('1. ')} className="toolbar-btn" title="有序列表">
          1.
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button onClick={() => insertText('```\n', '\n```')} className="toolbar-btn" title="代码块">
          {'</>'}
        </button>
        <button onClick={() => insertText('`', '`')} className="toolbar-btn" title="行内代码">
          <span className="font-mono text-sm">code</span>
        </button>
        <button onClick={() => insertText('[', '](url)')} className="toolbar-btn" title="链接">
          🔗
        </button>
        <button onClick={() => insertText('![alt](', ')')} className="toolbar-btn" title="图片">
          🖼️
        </button>
        <button onClick={() => insertText('| 列1 | 列2 |\n|------|------|\n| 内容 | 内容 |')} className="toolbar-btn" title="表格">
          ⊞
        </button>
      </div>
      <textarea
        ref={textareaRef}
        className="editor-textarea flex-1 p-4"
        defaultValue={content}
        onChange={handleChange}
        placeholder="在此输入 Markdown..."
        spellCheck={false}
      />
    </div>
  )
}
