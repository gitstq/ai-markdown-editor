import React, { useState } from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { useAI } from '@/hooks/useAI'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  Wand2,
  Languages,
  Type,
  Loader2,
  Settings,
  Send,
} from 'lucide-react'

export const AIPanel: React.FC = () => {
  const [selectedText, setSelectedText] = useState('')
  const [result, setResult] = useState('')
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [showConfig, setShowConfig] = useState(false)

  const content = useEditorStore((state) => state.content)
  const setContent = useEditorStore((state) => state.setContent)
  const aiConfig = useEditorStore((state) => state.aiConfig)
  const setAIConfig = useEditorStore((state) => state.setAIConfig)

  const { isLoading, continueWriting, polishText, translateText, formatMarkdown, callAI } =
    useAI()

  const handleGetSelection = () => {
    const selection = window.getSelection()?.toString() || ''
    setSelectedText(selection)
    return selection
  }

  const handleAction = async (action: string) => {
    const text = handleGetSelection() || content
    if (!text.trim()) return

    setActiveAction(action)
    setResult('')

    let response
    switch (action) {
      case 'continue':
        response = await continueWriting(text)
        break
      case 'polish':
        response = await polishText(text)
        break
      case 'translate-en':
        response = await translateText(text, '英文')
        break
      case 'translate-zh':
        response = await translateText(text, '中文')
        break
      case 'format':
        response = await formatMarkdown(text)
        break
      default:
        return
    }

    if (response.error) {
      setResult(`错误: ${response.error}`)
    } else {
      setResult(response.content)
    }
  }

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return
    const text = handleGetSelection() || content

    setActiveAction('custom')
    setResult('')

    const response = await callAI(`${customPrompt}\n\n${text}`)
    if (response.error) {
      setResult(`错误: ${response.error}`)
    } else {
      setResult(response.content)
    }
  }

  const handleApply = () => {
    if (result && !result.startsWith('错误:')) {
      const text = selectedText || content
      if (selectedText && content.includes(text)) {
        setContent(content.replace(text, result))
      } else {
        setContent(result)
      }
      setResult('')
      setSelectedText('')
    }
  }

  const actions = [
    { id: 'continue', icon: <Sparkles size={16} />, label: '续写' },
    { id: 'polish', icon: <Wand2 size={16} />, label: '润色' },
    { id: 'translate-en', icon: <Languages size={16} />, label: '转英文' },
    { id: 'translate-zh', icon: <Languages size={16} />, label: '转中文' },
    { id: 'format', icon: <Type size={16} />, label: '格式化' },
  ]

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          AI 助手
        </h2>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="p-1.5 rounded-md hover:bg-accent"
        >
          <Settings size={16} />
        </button>
      </div>

      {showConfig && (
        <div className="space-y-3 p-3 bg-muted rounded-lg">
          <div>
            <label className="text-xs text-muted-foreground">API Key</label>
            <input
              type="password"
              value={aiConfig.apiKey}
              onChange={(e) => setAIConfig({ apiKey: e.target.value })}
              className="w-full mt-1 px-2 py-1.5 text-sm rounded border border-border bg-background"
              placeholder="输入你的 API Key"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">模型</label>
            <select
              value={aiConfig.model}
              onChange={(e) => setAIConfig({ model: e.target.value })}
              className="w-full mt-1 px-2 py-1.5 text-sm rounded border border-border bg-background"
            >
              <option value="glm-5.1">GLM-5.1</option>
              <option value="glm-4">GLM-4</option>
              <option value="glm-4-flash">GLM-4-Flash</option>
            </select>
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        {selectedText ? (
          <span>已选择 {selectedText.length} 个字符</span>
        ) : (
          <span>未选择文本，将处理全文</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            disabled={isLoading}
            className={cn(
              'flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
              activeAction === action.id && isLoading
                ? 'bg-primary/20 text-primary'
                : 'bg-muted hover:bg-accent'
            )}
          >
            {isLoading && activeAction === action.id ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              action.icon
            )}
            {action.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="输入自定义指令..."
          className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background"
          onKeyDown={(e) => e.key === 'Enter' && handleCustomPrompt()}
        />
        <button
          onClick={handleCustomPrompt}
          disabled={isLoading}
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send size={16} />
        </button>
      </div>

      {result && (
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">结果</span>
            <button
              onClick={handleApply}
              className="px-3 py-1 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              应用到文档
            </button>
          </div>
          <div className="flex-1 overflow-auto p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
