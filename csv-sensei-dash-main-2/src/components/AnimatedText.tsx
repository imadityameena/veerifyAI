import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  lines: string[];
  delay?: number;
  className?: string;
  showBullets?: boolean;
  bulletColors?: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  lines, 
  delay = 500, 
  className = "",
  showBullets = false,
  bulletColors = ['bg-blue-400', 'bg-purple-400', 'bg-green-400']
}) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    lines.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, index * delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [lines, delay]);

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div
          key={index}
          className={`transition-all duration-700 transform ${
            visibleLines.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`
          }}
        >
          {showBullets ? (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${bulletColors[index % bulletColors.length]} rounded-full animate-pulse`} 
                   style={{animationDuration: '2s', animationDelay: `${index * 0.5}s`}}></div>
              <span className="text-gray-600 dark:text-white">{line}</span>
            </div>
          ) : (
            line
          )}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;
