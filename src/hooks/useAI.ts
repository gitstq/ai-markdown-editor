import { useState, useCallback } from 'react'
import { useEditorStore } from '@/stores/editorStore'

interface AIResponse {
  content: string
  error?: string
}

export function useAI() {
  const [isLoading, setIsLoading] = useState(false)
  const aiConfig = useEditorStore((state) => state.aiConfig)

  const callAI = useCallback(
    async (prompt: string, systemPrompt?: string): Promise<AIResponse> => {
      if (!aiConfig.apiKey) {
        return { content: '', error: '请先配置 AI API Key' }
      }

      setIsLoading(true)
      try {
        const response = await fetch(aiConfig.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${aiConfig.apiKey}`,
          },
          body: JSON.stringify({
            model: aiConfig.model,
            messages: [
              {
                role: 'system',
                content:
                  systemPrompt ||
                  '你是一个专业的写作助手，擅长Markdown格式。请直接返回处理后的内容，不要添加额外解释。',
              },
              { role: 'user', content: prompt },
            ],
            temperature: aiConfig.temperature,
            max_tokens: aiConfig.maxTokens,
          }),
        })

        if (!response.ok) {
          throw new Error(`API 请求失败: ${response.status}`)
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content || ''
        return { content }
      } catch (error) {
        return {
          content: '',
          error: error instanceof Error ? error.message : '未知错误',
        }
      } finally {
        setIsLoading(false)
      }
    },
    [aiConfig]
  )

  const continueWriting = useCallback(
    async (text: string) => {
      return callAI(
        `请根据以下内容续写，保持相同的风格和主题：\n\n${text}`,
        '你是一个专业的写作助手。请根据上下文续写内容，保持风格一致。只返回续写的内容，不要重复原文。'
      )
    },
    [callAI]
  )

  const polishText = useCallback(
    async (text: string) => {
      return callAI(
        `请润色以下文本，使其更加流畅和专业：\n\n${text}`,
        '你是一个专业的文字编辑。请润色文本，使其更加流畅、专业，同时保持原意。只返回润色后的内容。'
      )
    },
    [callAI]
  )

  const translateText = useCallback(
    async (text: string, targetLang: string) => {
      return callAI(
        `请将以下内容翻译成${targetLang}：\n\n${text}`,
        `你是一个专业翻译。请将文本翻译成${targetLang}，保持原意和语气。只返回翻译结果。`
      )
    },
    [callAI]
  )

  const formatMarkdown = useCallback(
    async (text: string) => {
      return callAI(
        `请美化以下Markdown格式，统一标题层级、列表缩进、代码块格式等：\n\n${text}`,
        '你是一个Markdown格式化专家。请美化Markdown格式，统一标题层级、列表缩进、代码块格式等。只返回格式化后的内容。'
      )
    },
    [callAI]
  )

  return {
    isLoading,
    callAI,
    continueWriting,
    polishText,
    translateText,
    formatMarkdown,
  }
}
