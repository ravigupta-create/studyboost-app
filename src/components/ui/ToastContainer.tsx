'use client';

import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/cn';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2" role="log" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg animate-slide-up cursor-pointer min-w-[280px]',
            {
              'bg-green-600 text-white': toast.type === 'success',
              'bg-red-600 text-white': toast.type === 'error',
              'bg-blue-600 text-white': toast.type === 'info',
            }
          )}
          onClick={() => removeToast(toast.id)}
        >
          <span aria-hidden="true">
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'info' && 'ℹ'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
