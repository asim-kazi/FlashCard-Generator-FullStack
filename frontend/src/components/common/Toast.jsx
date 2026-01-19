import { memo, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

const Toast = memo(({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success: 'bg-green-500/10 border-green-500/50 text-green-400',
    error: 'bg-red-500/10 border-red-500/50 text-red-400',
    warning: 'bg-amber-500/10 border-amber-500/50 text-amber-400',
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
  };

  return (
    <div
      className={`
      fixed bottom-4 right-4 z-50
      flex items-center gap-3 px-4 py-3 rounded-lg border
      backdrop-blur-lg shadow-xl
      animate-slide-up
      ${styles[type]}
    `}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
