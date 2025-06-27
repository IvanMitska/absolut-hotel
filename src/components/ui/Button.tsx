import React from 'react';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      // Размеры
      {
        'px-3 py-2 text-sm rounded-md': size === 'sm',
        'px-4 py-2.5 text-sm rounded-lg': size === 'md',
        'px-6 py-3 text-base rounded-lg': size === 'lg',
      },
      // Варианты
      {
        'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500': variant === 'primary',
        'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 focus:ring-primary-500': variant === 'secondary',
        'border border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 bg-transparent': variant === 'outline',
        'text-primary-700 hover:bg-primary-50 focus:ring-primary-500 bg-transparent': variant === 'ghost',
      },
      // Полная ширина
      {
        'w-full': fullWidth,
      },
      className
    );

    const buttonContent = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
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
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && !loading && (
          <span className="ml-2">{icon}</span>
        )}
      </>
    );

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 