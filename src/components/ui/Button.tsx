import React from 'react';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'left',
      isLoading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      outline: "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl"
    };

    const iconSizeMap = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7"
    };

    const iconGap = {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5",
      xl: "gap-3"
    };

    const renderIcon = () => {
      if (!icon) return null;
      
      return React.cloneElement(icon as React.ReactElement, {
        className: cn(iconSizeMap[size], (icon as React.ReactElement).props?.className)
      });
    };

    const renderContent = () => {
      if (isLoading) {
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span className="ml-2">Загрузка...</span>
          </>
        );
      }

      if (icon && iconPosition === 'left') {
        return (
          <>
            {renderIcon()}
            <span>{children}</span>
          </>
        );
      }

      if (icon && iconPosition === 'right') {
        return (
          <>
            <span>{children}</span>
            {renderIcon()}
          </>
        );
      }

      return <span>{children}</span>;
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          icon && iconGap[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 