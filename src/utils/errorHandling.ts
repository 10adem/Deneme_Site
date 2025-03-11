export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      return (error as { message: string }).message;
    }
    if ('error' in error && typeof (error as Record<string, unknown>).error === 'string') {
      return (error as { error: string }).error;
    }
  } else if (typeof error === 'string') {
    return error;
  }
  return 'Bilinmeyen hata';
} 