import { memo } from 'react';

const Card = memo(
  ({ children, variant = 'default', hover = false, className = '' }) => {
    const variants = {
      default: 'bg-gray-800/50 border-gray-700',
      gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700',
      glass: 'bg-white/5 backdrop-blur-lg border-white/10',
    };

    const hoverEffect = hover
      ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300'
      : '';

    return (
      <div
        className={`
      rounded-xl border shadow-lg p-6
      ${variants[variant]}
      ${hoverEffect}
      ${className}
    `}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
