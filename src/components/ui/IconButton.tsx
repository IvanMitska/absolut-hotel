import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'glass' | 'emerald' | 'charcoal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  icon: React.ReactNode;
  loading?: boolean;
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'default',
  size = 'md',
  rounded = 'lg',
  icon,
  loading = false,
  tooltip,
  className = '',
  disabled,
  ...props
}) => {
  // Определение вариантов стилей
  const variantClasses = {
    default: 'bg-white border border-gray-200 text-charcoal-600 hover:text-charcoal-900 hover:bg-gray-50 hover:border-gray-300',
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald hover:shadow-emerald-lg',
    secondary: 'bg-charcoal-700 hover:bg-charcoal-800 text-white shadow-charcoal hover:shadow-charcoal-lg',
    ghost: 'text-charcoal-600 hover:text-charcoal-900 hover:bg-gray-100',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30',
    emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald hover:shadow-emerald-lg',
    charcoal: 'bg-gradient-to-r from-charcoal-700 to-charcoal-800 hover:from-charcoal-800 hover:to-charcoal-900 text-white shadow-charcoal hover:shadow-charcoal-lg',
  };

  // Определение размеров
  const sizeClasses = {
    xs: 'w-6 h-6 p-1',
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-14 h-14 p-3',
  };

  // Определение скругления
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  };

  // Размеры иконок
  const iconSizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
  };

  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'transform hover:-translate-y-0.5 hover:scale-105',
    'active:scale-95 active:translate-y-0',
    'relative overflow-hidden',
  ].join(' ');

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    roundedClasses[rounded],
    disabled || loading ? 'cursor-not-allowed opacity-50 transform-none' : '',
    className,
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          className={`animate-spin ${iconSizes[size]}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    }

    return (
      <span className={iconSizes[size]}>
        {icon}
      </span>
    );
  };

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      title={tooltip}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};

export default IconButton;