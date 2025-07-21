import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'emerald' | 'charcoal' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  rounded = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  // Определение вариантов стилей
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-charcoal-100 text-charcoal-800 border border-charcoal-200',
    secondary: 'bg-charcoal-100 text-charcoal-800 border border-charcoal-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    emerald: 'bg-gradient-to-r from-charcoal-600 to-charcoal-700 text-white shadow-lg',
    charcoal: 'bg-gradient-to-r from-charcoal-700 to-charcoal-800 text-white shadow-charcoal',
    glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30',
  };

  // Определение размеров
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs font-medium',
    sm: 'px-2.5 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-sm font-medium',
    lg: 'px-4 py-2 text-base font-semibold',
  };

  // Определение скругления
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  // Размеры иконок
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  };

  const classes = [
    'inline-flex items-center gap-1.5',
    variantClasses[variant],
    sizeClasses[size],
    roundedClasses[rounded],
    'transition-all duration-300',
    'whitespace-nowrap',
    className,
  ].filter(Boolean).join(' ');

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;
    
    return (
      <span className={iconSizes[size]}>
        {icon}
      </span>
    );
  };

  return (
    <span className={classes} {...props}>
      {renderIcon('left')}
      {children}
      {renderIcon('right')}
    </span>
  );
};

export default Badge;