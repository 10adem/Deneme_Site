export interface SurveyResult {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  type: 'survey';
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  type: 'blog';
}

export interface Tag {
  id: number;
  name: string;
} 