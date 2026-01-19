import { memo } from 'react';
import { Loader2 } from 'lucide-react';

const Button = memo(
  ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    onClick,
    className = '',
    ...props
  }) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95',
      secondary:
        'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-lg shadow-purple-500/30',
      outline:
        'border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 focus:ring-gray-500',
      ghost: 'text-gray-300 hover:bg-gray-800 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
      xl: 'px-8 py-4 text-xl gap-3',
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : Icon ? (
          <Icon className="w-5 h-5" />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
