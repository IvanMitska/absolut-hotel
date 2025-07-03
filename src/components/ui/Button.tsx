import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury' | 'ocean' | 'glass' | 'teal-gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Современные размеры 2025
  const sizeClasses = {
    sm: 'h-10 px-4 text-sm font-semibold', // 40px height
    md: 'h-12 px-6 text-sm font-semibold', // 48px height
    lg: 'h-12 px-8 text-base font-semibold', // 48px height, больше padding
    xl: 'h-14 px-10 text-base font-bold', // 56px height для hero
  };

  // Современные варианты стилей
  const variantClasses = {
    primary: 'bg-gradient-to-r from-ocean-600 to-teal-400 hover:from-ocean-700 hover:to-teal-500 text-white shadow-colored hover:shadow-colored-lg',
    secondary: 'bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md',
    outline: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    luxury: 'bg-gold-gradient hover:from-gold-400 hover:to-gold-600 text-slate-800 shadow-gold hover:shadow-gold-lg',
    ocean: 'bg-ocean-gradient hover:from-ocean-700 hover:to-ocean-500 text-white shadow-ocean hover:shadow-ocean-lg',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-glass',
    'teal-gold': 'bg-teal-gold hover:from-teal-500 hover:to-gold-400 text-white shadow-teal hover:shadow-teal-lg',
  };

  const baseClasses = [
    'inline-flex items-center justify-center',
    'rounded-xl', // Более округлые углы для 2025
    'font-medium',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-4 focus:ring-ocean-200/50 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'transform hover:scale-105 hover:-translate-y-0.5',
    'active:scale-100 active:translate-y-0',
  ].join(' ');

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
    disabled || loading ? 'cursor-not-allowed opacity-50 transform-none' : '',
    className,
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'xl' ? 'w-6 h-6' : 'w-5 h-5';

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;
    
    return (
      <span className={`${iconSize} ${position === 'left' ? 'mr-2' : 'ml-2'}`}>
        {icon}
      </span>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg
            className={`animate-spin ${iconSize} ${children ? 'mr-2' : ''}`}
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
          {children && <span>Загрузка...</span>}
        </>
      );
    }

    return (
      <>
        {renderIcon('left')}
        {children}
        {renderIcon('right')}
      </>
    );
  };

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 