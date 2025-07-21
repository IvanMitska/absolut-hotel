import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'premium';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hover?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  shadow = 'md',
  hover = true,
  children,
  className = '',
  ...props
}) => {
  // Определение вариантов стилей
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white',
    outlined: 'bg-white border-2 border-charcoal-200',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
    premium: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200',
  };

  // Определение отступов
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  // Определение скругления
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    '2xl': 'rounded-3xl',
  };

  // Определение теней
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  };

  // Hover эффекты
  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' 
    : '';

  const classes = [
    variantClasses[variant],
    paddingClasses[padding],
    roundedClasses[rounded],
    shadowClasses[shadow],
    hoverClasses,
    'transition-all duration-300',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white/30 to-gray-50/50 rounded-xl pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;