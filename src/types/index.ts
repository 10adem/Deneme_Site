export interface Tag {
  id: number;
  name: string;
  created_at: string;
}

export interface BlogPost {
  name: string;
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

export interface SurveyResult {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      return (error as { message: string }).message;
    }
    if ('error' in error && typeof error.error === 'string') {
      return (error as { error: string }).error;
    }
  } else if (typeof error === 'string') {
    return error;
  }
  return 'Bilinmeyen hata';
}