import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Building2, 
  FileCheck, 
  TrendingUp,
  Target,
  Zap,
  Eye,
  Clock,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import herosectionimg from '@/assets/herosectionimg.jpg';
import { useTheme } from '@/contexts/ThemeContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('hospitals');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // After form submission, redirect to signup
    navigate('/signup');
  };

  const handleRequestDemo = () => {
    navigate('/login');
  };

  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

   const capabilities = [
     {
       icon: <Shield className="w-8 h-8 text-blue-600" />,
       title: "Continuous Compliance Monitoring",
       description: "24/7 automated monitoring of regulatory requirements and compliance status across all departments."
     },
     {
       icon: <Brain className="w-8 h-8 text-purple-600" />,
       title: "Predictive Safety and Risk Detection",
       description: "AI-powered risk assessment that identifies potential issues before they become problems."
     },
     {
       icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
       title: "Automated Risk Assessment",
       description: "Real-time analysis of operational risks with instant alerts and mitigation recommendations."
     }
   ];

   const benefits = [
     {
       icon: <Zap className="w-12 h-12 text-blue-600" />,
       title: "Efficiency",
       description: "Reduce manual compliance work and focus on what matters most — patient care."
     },
     {
       icon: <FileCheck className="w-12 h-12 text-green-600" />,
       title: "Documentation",
       description: "Comprehensive audit trail management and tracking of all compliance activities and decisions."
     },
     {
       icon: <Target className="w-12 h-12 text-purple-600" />,
       title: "Trust",
       description: "Build confidence with regulators through transparent, automated compliance reporting."
     }
   ];

  const targetAudiences = {
    hospitals: {
      title: "Hospitals & Clinics",
      benefits: [
        "Automated HIPAA compliance monitoring",
        "Real-time patient safety risk detection",
        "Streamlined audit preparation",
        "Reduced administrative burden"
      ]
    },
    networks: {
      title: "Healthcare Networks",
      benefits: [
        "Multi-facility compliance oversight",
        "Standardized reporting across locations",
        "Centralized risk management",
        "Scalable compliance framework"
      ]
    },
    regulators: {
      title: "Regulators & Auditors",
      benefits: [
        "Transparent compliance reporting",
        "Real-time monitoring capabilities",
        "Predictive risk insights",
        "Streamlined audit processes"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    {/* Dark Mode Toggle */}
    <div className="fixed top-6 right-6 z-50">
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className={`
          w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 shadow-lg
          ${theme === 'light' 
            ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-gray-200' 
            : 'bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-700 hover:border-gray-500 shadow-gray-900'
          }
        `}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </Button>
    </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-400/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 dark:bg-purple-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-200/30 dark:bg-indigo-400/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 bg-pink-200/30 dark:bg-pink-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          
          {/* Moving Lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent dark:via-blue-400/30 animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent dark:via-purple-400/30 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}></div>
          </div>
          
          {/* Interactive Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-300/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8">
              <div 
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Brain className="w-4 h-4" />
                  AI-POWERED COMPLIANCE
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  Get compliant early,<br />
                  <span className="text-blue-600 dark:text-blue-400">stay safe automatically</span><br />
                  all your operations.
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Supports healthcare organizations with intelligent monitoring, powerful integrations, 
                  and comprehensive compliance management tools.
                </p>
              </div>

              <div 
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                 {/* Key Features */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                   <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                     <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                       <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white text-sm">24/7 Monitoring</p>
                       <p className="text-xs text-gray-600 dark:text-gray-400">Continuous compliance</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                     <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                       <Brain className="w-5 h-5 text-green-600 dark:text-green-400" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white text-sm">AI-Powered</p>
                       <p className="text-xs text-gray-600 dark:text-gray-400">Smart detection</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                     <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                       <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white text-sm">Real-time</p>
                       <p className="text-xs text-gray-600 dark:text-gray-400">Instant alerts</p>
                     </div>
                   </div>
                 </div>

                 {/* CTA Button */}
                 <Button 
                   onClick={handleRequestDemo}
                   size="lg" 
                   className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300"
                 >
                   Request a Demo
                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                 </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div 
              className={`relative transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative">
                {/* Main Dashboard Card */}
                <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">VeerifyAI Dashboard</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">admin@hospital.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Compliance Status</p>
                     <div className="flex items-center gap-4">
                       <div className="text-3xl font-bold text-green-600">Active</div>
                       <div className="text-sm text-gray-500 dark:text-gray-400">Real-time</div>
                     </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                         <div>
                           <p className="text-sm font-medium text-gray-900 dark:text-white">Monitoring</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                         <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                           <AlertTriangle className="w-4 h-4 text-white" />
                         </div>
                         <div>
                           <p className="text-sm font-medium text-gray-900 dark:text-white">Alerts</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">Real-time</p>
                         </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                      View Full Report
                    </Button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-600 rounded-xl shadow-lg p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">AI Alert</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Risk detected</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-600 rounded-xl shadow-lg p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                     <div>
                       <p className="text-sm font-semibold text-gray-900 dark:text-white">Growth</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">Tracking</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

       {/* The Challenge Section */}
       <section 
         ref={(el) => (sectionRefs.current[0] = el)}
         className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300"
       >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 translate-x-[-50px] transition-all duration-1000 ease-out animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Hidden Cost of Compliance Gaps
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Healthcare organizations face mounting pressure to maintain compliance while delivering exceptional patient care. 
                The current approach of <span className="font-semibold text-red-600 relative group cursor-pointer">
                  manual effort, missed renewals, and overlooked risks
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-500"></div>
                </span> 
                creates vulnerabilities that can impact patient safety and organizational reputation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                  <AlertTriangle className="w-6 h-6 text-red-500 group-hover:animate-pulse" />
                   <span className="text-gray-700 dark:text-gray-300">Reactive compliance management</span>
                 </div>
                 <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                   <Clock className="w-6 h-6 text-orange-500 group-hover:animate-spin" />
                   <span className="text-gray-700 dark:text-gray-300">Time-consuming manual processes</span>
                 </div>
                 <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                   <Eye className="w-6 h-6 text-yellow-500 group-hover:animate-bounce" />
                   <span className="text-gray-700 dark:text-gray-300">Limited visibility into compliance status</span>
                </div>
              </div>
            </div>
            <div className="relative opacity-0 translate-x-[50px] transition-all duration-1000 ease-out delay-300 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Compliance Risk Level</span>
                    <Badge variant="destructive" className="animate-pulse">High</Badge>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                    <div className="bg-red-500 h-3 rounded-full w-3/4 transition-all duration-2000 ease-out animate-fade-in-up"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-red-500 group-hover:scale-110 transition-transform duration-300">23%</div>
                      <div className="text-gray-600 dark:text-gray-300">Overdue Items</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-300">156</div>
                      <div className="text-gray-600 dark:text-gray-300">Manual Tasks</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Our Solution Section */}
       <section 
         ref={(el) => (sectionRefs.current[1] = el)}
         className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
       >
         <div className="max-w-7xl mx-auto px-6">
           {/* Header */}
           <div className="text-center mb-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up">
             <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
               <Brain className="w-4 h-4" />
               FUTURE COMPLIANCE
             </div>
             <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
               Experience that grows with your scale.
             </h2>
             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
               Design a healthcare compliance operating system that works for your business and streamlined risk management.
             </p>
           </div>

           {/* Feature Cards */}
           <div className="grid lg:grid-cols-3 gap-8 mb-20">
             {capabilities.map((capability, index) => (
               <div 
                 key={index} 
                 className={`group opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up ${
                   index === 0 ? 'animate-delay-200' : 
                   index === 1 ? 'animate-delay-400' : 
                   'animate-delay-600'
                 }`}
               >
                 <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl">
                   <div className="flex items-start gap-4 mb-6">
                     <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                       {capability.icon}
                     </div>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                     {capability.title}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                     {capability.description}
                   </p>
                 </div>
               </div>
             ))}
           </div>

           {/* Why Choose Us Section */}
           <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-800">
             <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
               <Shield className="w-4 h-4" />
               WHY US
             </div>
             <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
               Why they prefer VeerifyAI
             </h3>
           </div>

           {/* Statistics Cards */}
           <div className="grid md:grid-cols-2 gap-8">
             <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1000">
               <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                 <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">24/7</div>
                 <p className="text-lg text-gray-900 dark:text-white font-semibold">
                   Continuous compliance monitoring capability
                 </p>
               </div>
             </div>
             
             <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1200">
               <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                 <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                   Instant compliance monitoring at any time
                 </h4>
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                     <Brain className="w-8 h-8 text-white" />
                   </div>
                   <div className="flex-1">
                     <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full mb-2">
                       <div className="w-4/5 h-1 bg-blue-600 rounded-full"></div>
                     </div>
                     <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                       <span>AI Monitoring</span>
                       <span>Real-time</span>
                     </div>
                   </div>
                   <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center">
                     <Shield className="w-8 h-8 text-white" />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Benefits Section */}
       <section 
         ref={(el) => (sectionRefs.current[2] = el)}
         className="py-20 bg-blue-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300"
       >
         <div className="max-w-7xl mx-auto px-6">
           {/* Mission Section */}
           <div className="text-center mb-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up">
             <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
               <Target className="w-4 h-4" />
               OUR MISSION
             </div>
             <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
               Designed for healthcare organizations
             </h2>
             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
               Our platform is built to help healthcare organizations manage compliance more effectively and efficiently.
             </p>
           </div>

           {/* Statistics Grid */}
           <div className="grid md:grid-cols-3 gap-8 mb-20">
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-200">
               <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">AI</div>
               <p className="text-lg text-gray-900 dark:text-white font-semibold">Powered compliance monitoring</p>
             </div>
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-400">
               <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">Real-time</div>
               <p className="text-lg text-gray-900 dark:text-white font-semibold">Risk detection and alerts</p>
             </div>
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-600">
               <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">Automated</div>
               <p className="text-lg text-gray-900 dark:text-white font-semibold">Compliance reporting</p>
             </div>
           </div>

           {/* Benefits Cards */}
           <div className="grid lg:grid-cols-2 gap-8">
             <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-800">
               <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600 h-full flex flex-col">
                 <div className="flex-1">
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                     No compliance volatility
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                     Generate consistent compliance results without manual intervention or reactive management.
                   </p>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                     <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-900 dark:text-white">Automated Monitoring</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400">24/7 surveillance</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1000">
               <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600 h-full flex flex-col">
                 <div className="flex-1">
                   <div className="flex items-center justify-between mb-6">
                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Summary</h4>
                     <div className="text-sm text-gray-500 dark:text-gray-400">6 Months</div>
                   </div>
                   <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                     Dashboard
                   </div>
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
                       <span className="text-sm font-semibold text-green-600 dark:text-green-400">Active</span>
                     </div>
                     <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                       <div className="w-4/5 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                     </div>
                     <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                       <span>Monitor</span>
                       <span>Analyze</span>
                       <span>Report</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Who We Serve Section */}
       <section 
         ref={(el) => (sectionRefs.current[3] = el)}
         className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
       >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tailored solutions for every healthcare stakeholder
            </p>
          </div>

          <div className="max-w-4xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300 animate-fade-in-up">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
              {Object.entries(targetAudiences).map(([key, audience]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 text-lg font-medium border-b-2 transition-all duration-300 transform hover:scale-105 ${
                    activeTab === key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {audience.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <Card className="bg-gray-50 dark:bg-gray-800 transform hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="opacity-0 translate-x-[-20px] transition-all duration-500 ease-out animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {targetAudiences[activeTab as keyof typeof targetAudiences].title}
                    </h3>
                    <ul className="space-y-4">
                      {targetAudiences[activeTab as keyof typeof targetAudiences].benefits.map((benefit, index) => (
                        <li 
                          key={index} 
                          className="flex items-start space-x-3 group hover:translate-x-2 transition-all duration-300 animate-fade-in-up"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center opacity-0 translate-x-[20px] transition-all duration-500 ease-out delay-200 animate-fade-in-up">
                    <div className="relative">
                      {activeTab === 'hospitals' && <Building2 className="w-32 h-32 text-blue-600 opacity-20 animate-pulse" />}
                      {activeTab === 'networks' && <Users className="w-32 h-32 text-purple-600 opacity-20 animate-pulse" />}
                      {activeTab === 'regulators' && <FileCheck className="w-32 h-32 text-green-600 opacity-20 animate-pulse" />}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* AI Innovation Showcase Section */}
       <section 
         ref={(el) => (sectionRefs.current[4] = el)}
         className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-800 text-white relative overflow-hidden transition-colors duration-300"
       >
         {/* Animated Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
           {/* Floating AI Particles */}
           <div className="absolute top-10 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
           <div className="absolute top-20 right-1/3 w-6 h-6 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
           <div className="absolute bottom-20 left-1/3 w-10 h-10 bg-purple-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
           <div className="absolute bottom-10 right-1/4 w-4 h-4 bg-indigo-300/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
           
           {/* Moving Gradient Orbs */}
           <div className="absolute top-1/3 left-0 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-float"></div>
           <div className="absolute bottom-1/3 right-0 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
           
           {/* Neural Network Lines */}
           <div className="absolute inset-0 opacity-20">
             <svg className="w-full h-full" viewBox="0 0 1000 1000">
               <defs>
                 <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                   <stop offset="100%" stopColor="rgba(147,197,253,0.1)" />
                 </linearGradient>
               </defs>
               <path
                 d="M100,200 Q300,100 500,200 T900,200"
                 stroke="url(#neuralGradient)"
                 strokeWidth="2"
                 fill="none"
                 className="animate-pulse"
               />
               <path
                 d="M100,400 Q300,300 500,400 T900,400"
                 stroke="url(#neuralGradient)"
                 strokeWidth="2"
                 fill="none"
                 className="animate-pulse"
                 style={{animationDelay: '1s'}}
               />
               <path
                 d="M100,600 Q300,500 500,600 T900,600"
                 stroke="url(#neuralGradient)"
                 strokeWidth="2"
                 fill="none"
                 className="animate-pulse"
                 style={{animationDelay: '2s'}}
               />
             </svg>
           </div>
           
           {/* Interactive Glow Effects */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
           {/* Steps Section */}
           <div className="mb-20">
             <div className="text-center mb-12 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up">
               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                 <Brain className="w-4 h-4" />
                 <span className="font-medium">STEP</span>
               </div>
               <h2 className="text-4xl font-bold mb-6">
                 Maximize your compliance with AI that generates results.
               </h2>
             </div>

             {/* Three Steps */}
             <div className="grid md:grid-cols-3 gap-8">
               <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-200">
                 <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full">
                   <div className="text-6xl font-bold text-white/30 mb-6">1</div>
                   <h3 className="text-xl font-bold mb-4">Open your account</h3>
                   <p className="text-blue-100 leading-relaxed">
                     Sign up to VeerifyAI and set up your compliance dashboard from the admin panel.
                   </p>
                 </div>
               </div>

               <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-400">
                 <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full">
                   <div className="text-6xl font-bold text-white/30 mb-6">2</div>
                   <h3 className="text-xl font-bold mb-4">Configure your systems</h3>
                   <p className="text-blue-100 leading-relaxed">
                     Connect your healthcare systems and start earning compliance insights automatically.
                   </p>
                 </div>
               </div>

               <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-600">
                 <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full">
                   <div className="text-6xl font-bold text-white/30 mb-6">3</div>
                   <h3 className="text-xl font-bold mb-4">Watch your compliance grow</h3>
                   <p className="text-blue-100 leading-relaxed">
                     Access insights instantly and remain protected from compliance volatility.
                   </p>
                 </div>
               </div>
             </div>
           </div>

           {/* Mission Section */}
           <div className="text-center mb-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-800">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
               <Shield className="w-4 h-4" />
               OUR MISSION
             </div>
             <h2 className="text-5xl font-bold mb-6">
               Building the future of healthcare compliance
             </h2>
             <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
               Our platform is designed to help healthcare organizations streamline compliance management and reduce manual processes.
             </p>
           </div>

           {/* Statistics Grid */}
           <div className="grid md:grid-cols-3 gap-8 mb-20">
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1000">
               <div className="text-6xl font-bold text-white mb-4">AI</div>
               <p className="text-lg font-semibold">Powered monitoring</p>
             </div>
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1200">
               <div className="text-6xl font-bold text-white mb-4">Real-time</div>
               <p className="text-lg font-semibold">Risk detection</p>
             </div>
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1400">
               <div className="text-6xl font-bold text-white mb-4">Automated</div>
               <p className="text-lg font-semibold">Reporting system</p>
             </div>
           </div>

           {/* Pricing Plans Section */}
           <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1600">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
               <Target className="w-4 h-4" />
               <span className="font-medium">CHOOSE PLAN:</span>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
                 <h3 className="text-3xl font-bold mb-4">Professional</h3>
                 <div className="text-2xl font-bold mb-6">$19/month</div>
                 <ul className="space-y-3 text-left text-blue-100">
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-400" />
                     Basic compliance monitoring
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-400" />
                     Monthly reports
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-400" />
                     Email support
                   </li>
                 </ul>
                 <Button className="w-full mt-8 bg-white/20 hover:bg-white/30 text-white border border-white/30">
                   Get Started
                 </Button>
               </div>

               <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                 <div className="relative z-10">
                   <h3 className="text-3xl font-bold mb-4">Enterprise</h3>
                   <div className="text-2xl font-bold mb-6">$49/month</div>
                   <ul className="space-y-3 text-left text-white">
                     <li className="flex items-center gap-3">
                       <CheckCircle className="w-5 h-5 text-green-400" />
                       Advanced AI monitoring
                     </li>
                     <li className="flex items-center gap-3">
                       <CheckCircle className="w-5 h-5 text-green-400" />
                       Real-time alerts
                     </li>
                     <li className="flex items-center gap-3">
                       <CheckCircle className="w-5 h-5 text-green-400" />
                       24/7 dedicated support
                     </li>
                   </ul>
                   <Button className="w-full mt-8 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                     Get Started
                   </Button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Contact Section */}
       <section 
         ref={(el) => (sectionRefs.current[5] = el)}
         className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300"
       >
         <div className="max-w-7xl mx-auto px-6">
           {/* CTA Banner */}
           <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-12 text-center text-white relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up">
             <div className="relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-6">
                 Ready to level up your compliance process?
               </h2>
               <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-3xl mx-auto">
                 Supports healthcare organizations with intelligent monitoring, powerful integrations, 
                 and comprehensive compliance management tools.
               </p>
               <div className="flex justify-center">
                 <Button 
                   onClick={handleRequestDemo}
                   size="lg" 
                   className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl group"
                 >
                   Get Started Now
                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                 </Button>
               </div>
             </div>
             
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
           </div>

           {/* Contact Form Section */}
           <div className="mt-20">
             <div className="text-center mb-12 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-300">
               <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                 Get in Touch
               </h3>
               <p className="text-lg text-gray-600 dark:text-gray-300">
                 Ready to transform your compliance operations? Let's talk.
               </p>
             </div>

             <div className="max-w-4xl mx-auto">
               <Card className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-600 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-500 backdrop-blur-sm">
                 <CardContent className="p-10">
                   <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                       <div className="opacity-0 translate-x-[-20px] transition-all duration-700 ease-out animate-fade-in-up animate-delay-700">
                         <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                           Name *
                         </label>
                         <Input
                           id="name"
                           name="name"
                           type="text"
                           required
                           placeholder="Enter your full name"
                           value={formData.name}
                           onChange={handleInputChange}
                           className="w-full h-12 bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm"
                         />
                       </div>
                       <div className="opacity-0 translate-x-[20px] transition-all duration-700 ease-out animate-fade-in-up animate-delay-800">
                         <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                           Organization *
                         </label>
                         <Input
                           id="organization"
                           name="organization"
                           type="text"
                           required
                           placeholder="Your healthcare organization"
                           value={formData.organization}
                           onChange={handleInputChange}
                           className="w-full h-12 bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm"
                         />
                       </div>
                     </div>
                     <div className="opacity-0 translate-y-10 transition-all duration-700 ease-out animate-fade-in-up animate-delay-900">
                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                         Email *
                       </label>
                       <Input
                         id="email"
                         name="email"
                         type="email"
                         required
                         placeholder="your.email@organization.com"
                         value={formData.email}
                         onChange={handleInputChange}
                         className="w-full h-12 bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm"
                       />
                     </div>
                     <div className="opacity-0 translate-y-10 transition-all duration-700 ease-out animate-fade-in-up animate-delay-1000">
                       <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                         Message
                       </label>
                       <Textarea
                         id="message"
                         name="message"
                         rows={4}
                         value={formData.message}
                         onChange={handleInputChange}
                         placeholder="Tell us about your compliance challenges and how we can help..."
                         className="w-full bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm resize-none"
                       />
                     </div>
                     <div className="text-center opacity-0 translate-y-10 transition-all duration-700 ease-out animate-fade-in-up animate-delay-1100">
                       <Button 
                         type="submit" 
                         size="lg" 
                         className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 group"
                       >
                         Send Message
                         <Mail className="ml-2 w-5 h-5 group-hover:animate-bounce" />
                       </Button>
                     </div>
                   </form>
                 </CardContent>
               </Card>
             </div>
           </div>
         </div>
       </section>

       {/* Footer */}
       <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">VeerifyAI</h3>
              <p className="text-gray-400 mb-4">
                Building the AI Layer for Compliance and Safety in Healthcare
              </p>
              <div className="flex space-x-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <Phone className="w-5 h-5 text-gray-400" />
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Demo</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VeerifyAI. All rights reserved. Building the AI Layer for Compliance and Safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
