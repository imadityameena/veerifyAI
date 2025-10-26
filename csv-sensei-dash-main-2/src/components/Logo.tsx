import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ltlogo2 from '@/assets/ltlogo2.png';

// added comments

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'h-28 w-28',
    md: 'h-32 w-32',
    lg: 'h-36 w-36',
    xl: 'h-44 w-44'
  };

  // Use light logo for light theme, dark logo for dark theme
  const logoSrc = theme === 'light' ? ltlogo2 : '/logo.png';
  const currentSizeClasses = sizeClasses;

  return (
    <div className={`flex items-center ${className}`}>
      <div 
        className={`relative ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''}`}
        onClick={onClick}
      >
        <div>
          <img
            src={logoSrc}
            alt="Logo"
            className={`${currentSizeClasses[size]} object-contain`}
            onError={(e) => {
              console.log('Logo image failed to load:', logoSrc);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
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
