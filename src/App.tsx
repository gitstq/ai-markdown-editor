import { useEffect } from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/Sidebar'
import { Toolbar } from '@/components/Toolbar'
import { Editor } from '@/components/Editor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { AIPanel } from '@/components/AIPanel'

function App() {
  const isDark = useEditorStore((state) => state.isDark)
  const viewMode = useEditorStore((state) => state.viewMode)
  const content = useEditorStore((state) => state.content)
  const focusMode = useEditorStore((state) => state.focusMode)
  const sidebarTab = useEditorStore((state) => state.sidebarTab)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className={cn('h-screen flex flex-col bg-background text-foreground', focusMode && 'focus-mode')}>
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="editor-container flex-1 flex overflow-hidden">
          {viewMode === 'edit' && (
            <div className="flex-1 overflow-hidden">
              <Editor />
            </div>
          )}
          {viewMode === 'preview' && (
            <div className="flex-1 overflow-hidden">
              <MarkdownPreview content={content} />
            </div>
          )}
          {viewMode === 'split' && (
            <>
              <div className="flex-1 overflow-hidden border-r border-border">
                <Editor />
              </div>
              <div className="flex-1 overflow-hidden">
                <MarkdownPreview content={content} />
              </div>
            </>
          )}
        </div>
        {sidebarTab === 'ai' && (
          <div className="w-80 border-l border-border bg-card overflow-hidden">
            <AIPanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
