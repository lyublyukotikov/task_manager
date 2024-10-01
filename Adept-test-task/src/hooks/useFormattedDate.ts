import { useCallback } from 'react';

export const useFormattedDate = () => {
  return useCallback((dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', options);
  }, []);
};
