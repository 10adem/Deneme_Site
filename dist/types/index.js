export function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    else if (typeof error === 'object' && error !== null) {
        if ('message' in error) {
            return error.message;
        }
        if ('error' in error && typeof error.error === 'string') {
            return error.error;
        }
    }
    else if (typeof error === 'string') {
        return error;
    }
    return 'Bilinmeyen hata';
}
