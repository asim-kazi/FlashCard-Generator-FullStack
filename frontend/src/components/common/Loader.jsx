import { memo } from 'react';

const Loader = memo(({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={`${sizes[size]} border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin`}
        />
        <div
          className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"
          style={{ animationDuration: '1.5s' }}
        />
      </div>
      {text && <p className="text-sm text-gray-400 animate-pulse">{text}</p>}
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;
