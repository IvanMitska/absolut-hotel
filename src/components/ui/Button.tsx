import React from 'react';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 hover:shadow-lg hover:scale-105 active:scale-95 hover:shadow-accent-500/25',
    secondary: 'bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 focus:ring-primary-500 hover:shadow-md hover:scale-105 active:scale-95',
    outline: 'border border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 hover:shadow-md hover:scale-105 active:scale-95',
    ghost: 'text-primary-700 hover:bg-primary-50 focus:ring-primary-500 hover:scale-105 active:scale-95'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };

  const LoadingSpinner = () => (
    <div className={cn(
      'animate-spin rounded-full border-2 border-current border-t-transparent',
      iconSizeClasses[size]
    )} />
  );

  const ButtonIcon = () => {
    if (loading) return <LoadingSpinner />;
    if (!icon) return null;
    
    return (
      <span className={cn(
        'transition-transform duration-300',
        iconPosition === 'right' && 'group-hover:translate-x-1',
        iconPosition === 'left' && 'group-hover:-translate-x-1'
      )}>
        {icon}
      </span>
    );
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loading && 'cursor-wait',
        disabled && 'transform-none hover:scale-100',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Эффект волны при клике */}
      <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-lg transition-transform duration-300 origin-center"></span>
      
      {/* Контент кнопки */}
      <span className="relative flex items-center justify-center gap-inherit">
        {iconPosition === 'left' && <ButtonIcon />}
        
        <span className={cn(
          'transition-all duration-300',
          loading && 'opacity-70'
        )}>
          {children}
        </span>
        
        {iconPosition === 'right' && <ButtonIcon />}
      </span>
      
      {/* Градиентный блик для primary кнопок */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
      )}
    </button>
  );
};

export default Button; 