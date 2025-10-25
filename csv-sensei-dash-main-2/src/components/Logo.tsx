import React from 'react';

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
  const sizeClasses = {
    sm: 'h-28 w-28',
    md: 'h-32 w-32',
    lg: 'h-36 w-36',
    xl: 'h-44 w-44'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div 
        className={`relative ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''}`}
        onClick={onClick}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className={`${sizeClasses[size]} object-contain`}
          onError={(e) => {
            console.log('Logo image failed to load: /logo.png');
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
