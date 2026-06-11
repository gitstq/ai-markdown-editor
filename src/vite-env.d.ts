/// <reference types="vite/client" />

declare module '*.css' {
  const content: string
  export default content
}

interface Window {
  electronAPI?: {
    openFile: () => Promise<{ canceled: boolean; filePaths: string[] }>
    saveFile: (content: string) => Promise<{ canceled: boolean; filePath?: string }>
  }
}
