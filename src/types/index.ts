export interface FileItem {
  id: string;
  name: string;
  content: string;
  path?: string;
  isDirectory: boolean;
  children?: FileItem[];
  modifiedAt: number;
  createdAt: number;
}

export interface EditorState {
  content: string;
  cursorPosition: number;
  selectionStart: number;
  selectionEnd: number;
  isDirty: boolean;
}

export interface Theme {
  id: string;
  name: string;
  isDark: boolean;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface AIConfig {
  apiKey: string;
  apiUrl: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface AIAction {
  id: string;
  name: string;
  icon: string;
  prompt: string;
}

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
}

export type ViewMode = 'edit' | 'preview' | 'split' | 'mindmap';

export type SidebarTab = 'files' | 'outline' | 'ai' | 'settings';
