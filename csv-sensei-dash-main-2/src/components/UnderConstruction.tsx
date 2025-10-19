import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Construction, 
  Clock, 
  ArrowLeft, 
  FileText, 
  Stethoscope, 
  Brain,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/components/ui/mode-toggle';

interface UnderConstructionProps {
  featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai';
  featureDisplayName: string;
  featureDescription: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  featureName,
  featureDisplayName,
  featureDescription
}) => {
  const navigate = useNavigate();

  const getFeatureIcon = () => {
    switch (featureName) {
      case 'op_billing':
        return <FileText className="w-16 h-16 text-green-600" />;
      case 'doctor_roster':
        return <Stethoscope className="w-16 h-16 text-blue-600" />;
      case 'compliance_ai':
        return <Brain className="w-16 h-16 text-purple-600" />;
      default:
        return <Settings className="w-16 h-16 text-gray-600" />;
    }
  };

  const getFeatureColor = () => {
    switch (featureName) {
      case 'op_billing':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
      case 'doctor_roster':
        return 'bg-[#F0F8FF] dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300';
      case 'compliance_ai':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-[#F0F8FF] dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mb-4">
              <Construction className="w-10 h-10 text-orange-600" />
            </div>
            
            <div className="flex items-center justify-center space-x-3 mb-4">
              {getFeatureIcon()}
              <div className="text-left">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                  {featureDisplayName}
                </CardTitle>
                <Badge className={`${getFeatureColor()} border`}>
                  Under Construction
                </Badge>
              </div>
            </div>

            <CardDescription className="text-lg text-slate-600 dark:text-gray-300 max-w-md mx-auto">
              {featureDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">
                    We're Working on Something Amazing!
                  </h3>
                  <p className="text-orange-800 dark:text-orange-300 text-sm leading-relaxed">
                    This feature is currently being developed and will be available soon. 
                    Our team is working hard to bring you the best experience possible. 
                    Thank you for your patience!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-slate-900 dark:text-white">What you can do:</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Explore other available features in the dashboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Check back later for updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Contact support if you have any questions</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => navigate('/demo')}
                className="flex items-center space-x-2 flex-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2"
              >
                <Construction className="w-4 h-4" />
                <span>Check Again</span>
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-slate-500 dark:text-gray-400">
                💡 This feature is managed by administrators and will be enabled when ready.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnderConstruction;
