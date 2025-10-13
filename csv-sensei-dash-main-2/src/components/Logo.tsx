import React from 'react';
import logoImage from '@/assets/logo.svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIndicator?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showIndicator = true, 
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div 
        className={`relative ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''}`}
        onClick={onClick}
      >
        <img
          src={logoImage}
          alt="Logo"
          className={`${sizeClasses[size]} object-contain`}
          onError={(e) => {
            console.log('Logo image failed to load:', logoImage);
            e.currentTarget.style.display = 'none';
          }}
        />
        {showIndicator && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
          </>
        )}
      </div>
    </div>
  );
};
