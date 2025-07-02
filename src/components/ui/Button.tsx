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
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";
    
    const variantStyles = {
      primary: "bg-ocean-gradient text-white hover:shadow-ocean-lg focus:ring-ocean-400/50 shadow-ocean",
      secondary: "bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/30 focus:ring-white/30 shadow-lg",
      outline: "border-2 border-ocean-500 text-ocean-600 bg-transparent hover:bg-ocean-50 focus:ring-ocean-400/50 shadow-md",
      ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400/50"
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm min-h-[40px]",
      md: "px-6 py-3 text-base min-h-[48px]",
      lg: "px-8 py-4 text-lg min-h-[56px]",
      xl: "px-10 py-5 text-xl min-h-[64px]"
    };

    const iconSizeMap = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7"
    };

    const iconGap = {
      sm: "gap-2",
      md: "gap-2",
      lg: "gap-3",
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
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            <span className="ml-2">Загрузка...</span>
          </>
        );
      }

      if (icon && iconPosition === 'left') {
        return (
          <>
            {renderIcon()}
            <span className="font-bold">{children}</span>
          </>
        );
      }

      if (icon && iconPosition === 'right') {
        return (
          <>
            <span className="font-bold">{children}</span>
            {renderIcon()}
          </>
        );
      }

      return <span className="font-bold">{children}</span>;
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