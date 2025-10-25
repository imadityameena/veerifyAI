import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3, 
  Shield, 
  Users, 
  Receipt, 
  TrendingUp, 
  Activity,
  Database,
  Settings
} from 'lucide-react';

interface FloatingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
  size: 'sm' | 'md' | 'lg';
  position: { x: number; y: number };
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  icon, 
  title,
  description,
  gradient, 
  delay, 
  size,
  position 
}) => {
  const sizeClasses = {
    sm: 'w-40 h-48',
    md: 'w-44 h-52',
    lg: 'w-48 h-56'
  };

  const getPositionClass = (x: number, y: number) => {
    // Position cards across the entire area for optimal coverage
    if (x === 15 && y === 15) return 'pos-15-15';
    if (x === 45 && y === 10) return 'pos-45-10';
    if (x === 75 && y === 20) return 'pos-75-20';
    if (x === 25 && y === 40) return 'pos-25-40';
    if (x === 55 && y === 35) return 'pos-55-35';
    if (x === 80 && y === 50) return 'pos-80-50';
    if (x === 10 && y === 65) return 'pos-10-65';
    if (x === 45 && y === 70) return 'pos-45-70';
    if (x === 40 && y === 85) return 'pos-40-85';
    if (x === 85 && y === 80) return 'pos-85-80';
    return 'pos-center';
  };

  const getDelayClass = (delay: number) => {
    if (delay === 0) return 'delay-0';
    if (delay === 2) return 'delay-2';
    if (delay === 4) return 'delay-4';
    if (delay === 6) return 'delay-6';
    if (delay === 8) return 'delay-8';
    if (delay === 10) return 'delay-10';
    if (delay === 12) return 'delay-12';
    if (delay === 14) return 'delay-14';
    return 'delay-0';
  };

  const getDurationClass = (delay: number) => {
    const duration = 3 + delay * 0.5;
    if (duration <= 3) return 'duration-3';
    if (duration <= 3.5) return 'duration-3-5';
    if (duration <= 4) return 'duration-4';
    if (duration <= 4.5) return 'duration-4-5';
    if (duration <= 5) return 'duration-5';
    return 'duration-5-5';
  };

  return (
    <div 
      className={`absolute ${sizeClasses[size]} animate-dashboard-full-area ${getPositionClass(position.x, position.y)} ${getDelayClass(delay)} ${getDurationClass(delay)}`}
    >
      <Card className={`h-full ${gradient} backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] transition-all duration-700 hover:scale-110 group cursor-pointer overflow-hidden`}>
        <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center relative">
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Icon Container */}
          <div className="relative z-10 mb-4 group-hover:scale-125 transition-all duration-500">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
              {icon}
            </div>
          </div>
          
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-500 relative z-10">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-white/90 leading-relaxed group-hover:text-white transition-colors duration-500 relative z-10 max-w-[200px]">
              {description}
            </p>
          
          {/* Enhanced Floating particles effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping shadow-lg"></div>
            <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-0-5 shadow-lg"></div>
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping delay-1 shadow-lg"></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1-5 shadow-lg"></div>
          </div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export const FloatingDashboardCards: React.FC = () => {
  const dashboardCards = [
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "Analytics",
      description: "Advanced data insights and visualizations",
      gradient: "bg-primary",
      delay: 0,
      size: 'lg' as const,
      position: { x: 15, y: 15 }
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Compliance",
      description: "Healthcare compliance monitoring",
      gradient: "bg-emerald-600",
      delay: 2,
      size: 'lg' as const,
      position: { x: 45, y: 10 }
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Doctor Roster",
      description: "Staff management and scheduling",
      gradient: "bg-purple-600",
      delay: 4,
      size: 'lg' as const,
      position: { x: 75, y: 20 }
    },
    {
      icon: <Receipt className="w-8 h-8 text-white" />,
      title: "Billing",
      description: "Revenue and billing analytics",
      gradient: "bg-orange-600",
      delay: 6,
      size: 'lg' as const,
      position: { x: 25, y: 40 }
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "KPIs",
      description: "Key performance indicators",
      gradient: "bg-indigo-600",
      delay: 8,
      size: 'lg' as const,
      position: { x: 55, y: 35 }
    },
    {
      icon: <Activity className="w-8 h-8 text-white" />,
      title: "Monitoring",
      description: "Real-time system monitoring",
      gradient: "bg-cyan-600",
      delay: 10,
      size: 'lg' as const,
      position: { x: 80, y: 50 }
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: "Data Management",
      description: "Centralized data storage and processing",
      gradient: "bg-teal-600",
      delay: 12,
      size: 'lg' as const,
      position: { x: 10, y: 65 }
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title: "Configuration",
      description: "System settings and preferences",
      gradient: "bg-slate-600",
      delay: 14,
      size: 'lg' as const,
      position: { x: 45, y: 70 }
    }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-emerald-50/20 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-emerald-900/10"></div>
      
      {/* Floating cards */}
      {dashboardCards.map((card, index) => (
        <FloatingCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          gradient={card.gradient}
          delay={card.delay}
          size={card.size}
          position={card.position}
        />
      ))}
      
      {/* Additional floating elements for ambiance */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-float-delayed"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-emerald-400/30 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-orange-400/30 rounded-full animate-float-slow"></div>
    </div>
  );
};

export default FloatingDashboardCards;