import React from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { cn, extractOutline } from '@/lib/utils'
import {
  FileText,
  List,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { SidebarTab } from '@/types'

export const Sidebar: React.FC = () => {
  const sidebarOpen = useEditorStore((state) => state.sidebarOpen)
  const setSidebarOpen = useEditorStore((state) => state.setSidebarOpen)
  const sidebarTab = useEditorStore((state) => state.sidebarTab)
  const setSidebarTab = useEditorStore((state) => state.setSidebarTab)
  const content = useEditorStore((state) => state.content)

  const tabs: { id: SidebarTab; icon: React.ReactNode; label: string }[] = [
    { id: 'files', icon: <FileText size={18} />, label: '文件' },
    { id: 'outline', icon: <List size={18} />, label: '大纲' },
    { id: 'ai', icon: <Sparkles size={18} />, label: 'AI' },
    { id: 'settings', icon: <Settings size={18} />, label: '设置' },
  ]

  const outline = extractOutline(content)

  return (
    <div
      className={cn(
        'sidebar flex flex-col border-r border-border bg-card transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-12'
      )}
    >
      <div className="flex items-center justify-between p-2 border-b border-border">
        {sidebarOpen && <span className="text-sm font-medium px-2">导航</span>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-md hover:bg-accent ml-auto"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <div className="flex flex-col gap-1 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSidebarTab(tab.id)
              if (!sidebarOpen) setSidebarOpen(true)
            }}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              sidebarTab === tab.id
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-accent text-muted-foreground'
            )}
          >
            {tab.icon}
            {sidebarOpen && <span>{tab.label}</span>}
          </button>
        ))}
      </div>

      {sidebarOpen && (
        <div className="flex-1 overflow-auto p-3 border-t border-border">
          {sidebarTab === 'outline' && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                文档大纲
              </h3>
              {outline.length === 0 ? (
                <p className="text-sm text-muted-foreground">暂无标题</p>
              ) : (
                <ul className="space-y-1">
                  {outline.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm truncate hover:text-primary cursor-pointer"
                      style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {sidebarTab === 'files' && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                文件管理
              </h3>
              <p className="text-sm text-muted-foreground">
                点击上方按钮打开文件
              </p>
            </div>
          )}

          {sidebarTab === 'ai' && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                AI 助手
              </h3>
              <p className="text-sm text-muted-foreground">
                在编辑器中选中文字后，使用 AI 功能进行续写、润色或翻译。
              </p>
            </div>
          )}

          {sidebarTab === 'settings' && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                设置
              </h3>
              <p className="text-sm text-muted-foreground">
                在设置面板中配置 AI API Key 和主题。
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
