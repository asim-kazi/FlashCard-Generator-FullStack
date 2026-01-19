import { memo } from 'react';

const Input = memo(({ label, error, icon: Icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-11' : ''}
            bg-gray-900/50 border rounded-lg
            text-gray-100 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
