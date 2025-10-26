import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
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
  Sparkles
} from 'lucide-react';
import herosectionimg from '@/assets/herosectionimg.jpg';
import { Logo } from '@/components/Logo';
import { ModeToggle } from '@/components/ui/mode-toggle';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hospitals');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Formspree form state
  const [state, handleSubmit] = useForm("mblzball"); // Replace with your actual Formspree form ID

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const scrollToHero = () => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'home') {
      scrollToHero();
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = [
        { id: 'home', element: heroRef.current },
        { id: 'solution', element: document.getElementById('solution') },
        { id: 'benefits', element: document.getElementById('benefits') },
        { id: 'audience', element: document.getElementById('audience') },
        { id: 'contact', element: document.getElementById('contact') }
      ];

      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
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
    <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-200/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo size="md" showIndicator={false} onClick={() => handleNavClick('home')} />

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('home')}
                className={`relative text-sm font-semibold transition-colors duration-300 uppercase tracking-wide pb-1 ${
                  activeSection === 'home' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Home
                {activeSection === 'home' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavClick('solution')}
                className={`relative text-sm font-semibold transition-colors duration-300 uppercase tracking-wide pb-1 ${
                  activeSection === 'solution' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Solution
                {activeSection === 'solution' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavClick('benefits')}
                className={`relative text-sm font-semibold transition-colors duration-300 uppercase tracking-wide pb-1 ${
                  activeSection === 'benefits' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Benefits
                {activeSection === 'benefits' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavClick('audience')}
                className={`relative text-sm font-semibold transition-colors duration-300 uppercase tracking-wide pb-1 ${
                  activeSection === 'audience' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                About
                {activeSection === 'audience' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className={`relative text-sm font-semibold transition-colors duration-300 uppercase tracking-wide pb-1 ${
                  activeSection === 'contact' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Contact
                {activeSection === 'contact' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300"></div>
                )}
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Button 
                onClick={handleSignIn}
                variant="outline"
                className="border-gray-300 hover:border-primary hover:text-primary text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-primary dark:hover:text-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Sign In
              </Button>
              <Button 
                onClick={handleGetStarted}
                className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-[#F0F8FF] dark:bg-gray-900 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          
          
          
          
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full blur-3xl " style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
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
                   <div className="group flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50  rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 hover:shadow-lg transition-all duration-300 cursor-pointer">
                     <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50  transition-all duration-300">
                       <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">24/7 Monitoring</p>
                       <p className="text-xs text-gray-600 dark:text-gray-400">Continuous compliance</p>
                     </div>
                   </div>
                   
                   <div className="group flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50  rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 hover:shadow-lg transition-all duration-300 cursor-pointer">
                     <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50  transition-all duration-300">
                       <Brain className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">AI-Powered</p>
                       <p className="text-xs text-gray-600 dark:text-gray-400">Smart detection</p>
                     </div>
                   </div>
                   
                   <div className="group flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50  rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 hover:shadow-lg transition-all duration-300 cursor-pointer">
                     <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50  transition-all duration-300">
                       <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Real-time</p>
                       <p className="text-xs text-gray-600 dark:text-gray-400">Instant alerts</p>
                     </div>
                   </div>
                 </div>

                 {/* CTA Buttons */}
                 <div className="flex flex-col sm:flex-row gap-4">
                   <Button 
                     onClick={handleGetStarted}
                     size="lg" 
                     className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl group shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 animate-light-glow"
                   >
                     Get Started
                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                   </Button>
                 </div>
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
                <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 hover:shadow-lg hover:shadow-3xl transition-all duration-500 cursor-pointer group border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-600">
                    <div className="flex items-center gap-4 mb-6">
                    <div className=" transition-all duration-300">
                      <Logo size="md" showIndicator={false} className="bg-white dark:bg-gray-700" />
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
                      <div className="group/status flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover/status:bg-green-600 group-hover/status:scale-110 transition-all duration-300">
                          <CheckCircle className="w-4 h-4 text-white group-hover/status:" />
                        </div>
                         <div>
                           <p className="text-sm font-medium text-gray-900 dark:text-white group-hover/status:text-green-700 dark:group-hover/status:text-green-300 transition-colors duration-300">Monitoring</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                         </div>
                       </div>
                       
                       <div className="group/alerts flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                         <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center group-hover/alerts:bg-yellow-600 group-hover/alerts:scale-110 transition-all duration-300">
                           <AlertTriangle className="w-4 h-4 text-white group-hover/alerts:" />
                         </div>
                         <div>
                           <p className="text-sm font-medium text-gray-900 dark:text-white group-hover/alerts:text-yellow-700 dark:group-hover/alerts:text-yellow-300 transition-colors duration-300">Alerts</p>
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
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-600 rounded-xl shadow-lg p-4 transform -rotate-12 hover:rotate-0 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer group/ai">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover/ai:bg-purple-600 group-hover/ai:scale-110 transition-all duration-300">
                      <Brain className="w-4 h-4 text-white group-hover/ai:" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover/ai:text-purple-600 dark:group-hover/ai:text-purple-400 transition-colors duration-300">AI Alert</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Risk detected</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-600 rounded-xl shadow-lg p-4 transform rotate-12 hover:rotate-0 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer group/growth">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover/growth:bg-green-600 group-hover/growth:scale-110 transition-all duration-300">
                      <TrendingUp className="w-4 h-4 text-white group-hover/growth:" />
                    </div>
                     <div>
                       <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover/growth:text-green-600 dark:group-hover/growth:text-green-400 transition-colors duration-300">Growth</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">Tracking</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

       {/* The Challenge Section */}
       <section 
         ref={(el) => (sectionRefs.current[0] = el)}
         className="py-20 bg-[#F0F8FF] dark:bg-gray-800 relative overflow-hidden transition-colors duration-300"
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
                  <AlertTriangle className="w-6 h-6 text-red-500 group-hover:" />
                   <span className="text-gray-700 dark:text-gray-300">Reactive compliance management</span>
                 </div>
                 <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                   <Clock className="w-6 h-6 text-orange-500 group-hover:" />
                   <span className="text-gray-700 dark:text-gray-300">Time-consuming manual processes</span>
                 </div>
                 <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                   <Eye className="w-6 h-6 text-yellow-500 group-hover:" />
                   <span className="text-gray-700 dark:text-gray-300">Limited visibility into compliance status</span>
                </div>
              </div>
            </div>
            <div className="relative opacity-0 translate-x-[50px] transition-all duration-1000 ease-out delay-300 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 transform hover:shadow-2xl transition-all duration-500 border border-gray-300 dark:border-gray-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Compliance Risk Level</span>
                    <Badge variant="destructive" className="">High</Badge>
                  </div>
                  <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:bg-gray-600 rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full w-3/4 transition-all duration-2000 ease-out animate-fade-in-up shadow-lg"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-red-500  transition-transform duration-300">23%</div>
                      <div className="text-gray-600 dark:text-gray-300">Overdue Items</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-orange-500  transition-transform duration-300">156</div>
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
         id="solution"
         ref={(el) => (sectionRefs.current[1] = el)}
         className="py-20 bg-[#F0F8FF] dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
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
                 <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col">
                   <div className="flex items-start gap-4 mb-6">
                     <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50  transition-all duration-300">
                       <div className="group-hover:">
                         {capability.icon}
                       </div>
                     </div>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                     {capability.title}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 flex-grow">
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
               <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col">
                 <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4  group-hover: transition-all duration-300">24/7</div>
                 <p className="text-lg text-gray-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-grow">
                   Continuous compliance monitoring capability
                 </p>
               </div>
             </div>
             
             <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1200">
               <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col">
                 <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                   Instant compliance monitoring at any time
                 </h4>
                 <div className="flex items-center gap-4 flex-grow">
                   <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-700  transition-all duration-300">
                     <Brain className="w-8 h-8 text-white group-hover:" />
                   </div>
                   <div className="flex-1">
                     <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full mb-2 group-hover:h-2 transition-all duration-300">
                       <div className="w-4/5 h-1 bg-blue-600 rounded-full group-hover:w-full group-hover:h-2 transition-all duration-500"></div>
                     </div>
                     <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                       <span>AI Monitoring</span>
                       <span>Real-time</span>
                     </div>
                   </div>
                   <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600  transition-all duration-300">
                     <Shield className="w-8 h-8 text-white group-hover:" />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Benefits Section */}
       <section 
         id="benefits"
         ref={(el) => (sectionRefs.current[2] = el)}
         className="py-20 bg-[#F0F8FF] dark:bg-gray-800 relative overflow-hidden transition-colors duration-300"
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
               <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600 h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer group">
                 <div className="flex-1 flex flex-col">
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                     No compliance volatility
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                     Generate consistent compliance results without manual intervention or reactive management.
                   </p>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50  transition-all duration-300">
                     <Zap className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:" />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Automated Monitoring</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400">24/7 surveillance</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1000">
               <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600 h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer group">
                 <div className="flex-1 flex flex-col">
                   <div className="flex items-center justify-between mb-6">
                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Summary</h4>
                     <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">6 Months</div>
                   </div>
                   <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                     Dashboard
                   </div>
                   <div className="space-y-4 flex-grow">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
                       <span className="text-sm font-semibold text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">Active</span>
                     </div>
                     <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full group-hover:h-3 transition-all duration-300">
                       <div className="w-4/5 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full group-hover:w-full group-hover:h-3 group-hover:shadow-lg transition-all duration-500"></div>
                     </div>
                     <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
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
         id="audience"
         ref={(el) => (sectionRefs.current[3] = el)}
         className="py-20 bg-[#F0F8FF] dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
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
                  className={`px-6 py-3 text-lg font-medium border-b-2 transition-all duration-300 transform hover:shadow-lg ${
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
            <Card className="bg-[#F0F8FF] dark:bg-gray-800 transform hover:shadow-xl transition-all duration-500">
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
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0  transition-transform duration-300" />
                          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center opacity-0 translate-x-[20px] transition-all duration-500 ease-out delay-200 animate-fade-in-up">
                    <div className="relative">
                      {activeTab === 'hospitals' && <Building2 className="w-32 h-32 text-blue-600 opacity-20 " />}
                      {activeTab === 'networks' && <Users className="w-32 h-32 text-purple-600 opacity-20 " />}
                      {activeTab === 'regulators' && <FileCheck className="w-32 h-32 text-green-600 opacity-20 " />}
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
         id="features"
         ref={(el) => (sectionRefs.current[4] = el)}
         className="py-20 bg-[#F0F8FF] dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
       >
         {/* Animated Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
           {/* Floating AI Particles */}
           
           {/* Enhanced Moving Gradient Orbs */}
           <div className="absolute bottom-1/3 right-0 w-40 h-40 bg-gradient-to-r from-violet-200/20 to-purple-200/20 dark:from-violet-400/30 dark:to-purple-400/30 rounded-full blur-xl  shadow-2xl" style={{animationDelay: '3s'}}></div>
           
           
           
           {/* Additional Light Theme Enhancements */}
         </div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
           {/* Steps Section */}
           <div className="mb-20">
             <div className="text-center mb-12 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up">
               <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-white/10  border border-purple-200 dark:border-white/20 rounded-full px-4 py-2 mb-6">
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
                 <div className="bg-purple-50 dark:bg-white/10 border border-purple-200 dark:border-white/20 rounded-2xl p-8 h-full">
                   <div className="text-6xl font-bold text-purple-200 dark:text-white/30 mb-6">1</div>
                   <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Open your account</h3>
                   <p className="text-gray-600 dark:text-purple-100 leading-relaxed">
                     Sign up to VeerifyAI and set up your compliance dashboard from the admin panel.
                   </p>
                 </div>
               </div>

               <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-400">
                 <div className="bg-purple-50 dark:bg-white/10 border border-purple-200 dark:border-white/20 rounded-2xl p-8 h-full">
                   <div className="text-6xl font-bold text-purple-200 dark:text-white/30 mb-6">2</div>
                   <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Configure your systems</h3>
                   <p className="text-gray-600 dark:text-purple-100 leading-relaxed">
                     Connect your healthcare systems and start earning compliance insights automatically.
                   </p>
                 </div>
               </div>

               <div className="opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-600">
                 <div className="bg-purple-50 dark:bg-white/10 border border-purple-200 dark:border-white/20 rounded-2xl p-8 h-full">
                   <div className="text-6xl font-bold text-purple-200 dark:text-white/30 mb-6">3</div>
                   <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Watch your compliance grow</h3>
                   <p className="text-gray-600 dark:text-purple-100 leading-relaxed">
                     Access insights instantly and remain protected from compliance volatility.
                   </p>
                 </div>
               </div>
             </div>
           </div>

           {/* Mission Section */}
           <div className="text-center mb-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-800">
             <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-white/10  border border-purple-200 dark:border-white/20 rounded-full px-4 py-2 mb-6">
               <Shield className="w-4 h-4 text-purple-600 dark:text-white" />
               <span className="text-purple-600 dark:text-white font-medium">OUR MISSION</span>
             </div>
             <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
               Building the future of healthcare compliance
             </h2>
             <p className="text-xl text-gray-600 dark:text-purple-100 max-w-4xl mx-auto leading-relaxed">
               Our platform is designed to help healthcare organizations streamline compliance management and reduce manual processes.
             </p>
           </div>

           {/* Statistics Grid */}
           <div className="grid md:grid-cols-3 gap-8 mb-20">
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1000 group p-6 rounded-xl hover:shadow-xl hover:bg-purple-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
               <div className="text-6xl font-bold text-purple-600 dark:text-white mb-4  group-hover: transition-all duration-300">AI</div>
               <p className="text-lg font-semibold text-gray-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">Powered monitoring</p>
             </div>
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1200 group p-6 rounded-xl hover:shadow-xl hover:bg-purple-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
               <div className="text-6xl font-bold text-purple-600 dark:text-white mb-4  group-hover: transition-all duration-300">Real-time</div>
               <p className="text-lg font-semibold text-gray-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">Risk detection</p>
             </div>
             <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1400 group p-6 rounded-xl hover:shadow-xl hover:bg-purple-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer">
               <div className="text-6xl font-bold text-purple-600 dark:text-white mb-4  group-hover: transition-all duration-300">Automated</div>
               <p className="text-lg font-semibold text-gray-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">Reporting system</p>
             </div>
           </div>

           {/* Success Stories Section */}
           <div className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-1600">
             <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-white/10  border border-purple-200 dark:border-white/20 rounded-full px-4 py-2 mb-6">
               <Sparkles className="w-4 h-4 text-purple-600 dark:text-white" />
               <span className="text-purple-600 dark:text-white font-medium">SUCCESS STORIES</span>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               <div className="group bg-purple-50 dark:bg-white/10  border border-purple-200 dark:border-white/20 rounded-2xl p-8 transform hover:bg-purple-100 dark:hover:bg-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                 <div className="text-4xl font-bold text-purple-600 dark:text-white mb-4  group-hover: transition-all duration-300">99.7%</div>
                 <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">Uptime Reliability</h3>
                 <p className="text-gray-600 dark:text-purple-100 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300 flex-grow">
                   Continuous monitoring ensures your compliance systems are always operational and secure.
                 </p>
               </div>

               <div className="group bg-purple-50 dark:bg-white/10  border border-purple-200 dark:border-white/20 rounded-2xl p-8 transform hover:bg-purple-100 dark:hover:bg-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                 <div className="text-4xl font-bold text-purple-600 dark:text-white mb-4  group-hover: transition-all duration-300">24/7</div>
                 <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">AI Monitoring</h3>
                 <p className="text-gray-600 dark:text-purple-100 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300 flex-grow">
                   Round-the-clock intelligent surveillance that never sleeps, protecting your organization.
                 </p>
               </div>

               <div className="group bg-purple-50 dark:bg-white/10  border border-purple-200 dark:border-white/20 rounded-2xl p-8 transform hover:bg-purple-100 dark:hover:bg-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                 <div className="text-4xl font-bold text-purple-600 dark:text-white mb-4  group-hover: transition-all duration-300">10x</div>
                 <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">Faster Detection</h3>
                 <p className="text-gray-600 dark:text-purple-100 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300 flex-grow">
                   AI-powered risk identification that's significantly faster than traditional methods.
                 </p>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Contact Section */}
       <section 
         id="contact"
         ref={(el) => (sectionRefs.current[5] = el)}
         className="py-20 bg-[#F0F8FF] dark:bg-gray-800 relative overflow-hidden transition-colors duration-300"
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
                   onClick={handleGetStarted}
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
               <Card className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-600 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fade-in-up animate-delay-500 ">
                 <CardContent className="p-10">
                   {state.succeeded ? (
                     <div className="text-center py-8">
                       <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                         <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                         Thank You!
                       </h3>
                       <p className="text-gray-600 dark:text-gray-300 mb-6">
                         Your message has been sent successfully. We'll get back to you soon!
                       </p>
                       <Button 
                         onClick={() => navigate('/signup')}
                         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                       >
                         Get Started
                       </Button>
                     </div>
                   ) : (
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
                             className="w-full h-12 bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm"
                           />
                           <ValidationError 
                             prefix="Name" 
                             field="name"
                             errors={state.errors}
                             className="text-red-500 text-sm mt-1"
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
                             className="w-full h-12 bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm"
                           />
                           <ValidationError 
                             prefix="Organization" 
                             field="organization"
                             errors={state.errors}
                             className="text-red-500 text-sm mt-1"
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
                           className="w-full h-12 bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm"
                         />
                         <ValidationError 
                           prefix="Email" 
                           field="email"
                           errors={state.errors}
                           className="text-red-500 text-sm mt-1"
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
                           placeholder="Tell us about your compliance challenges and how we can help..."
                           className="w-full bg-white dark:bg-white border-2 border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200 rounded-xl transition-all duration-300 shadow-sm resize-none"
                         />
                         <ValidationError 
                           prefix="Message" 
                           field="message"
                           errors={state.errors}
                           className="text-red-500 text-sm mt-1"
                         />
                       </div>
                       <div className="text-center opacity-0 translate-y-10 transition-all duration-700 ease-out animate-fade-in-up animate-delay-1100">
                         <Button 
                           type="submit" 
                           size="lg" 
                           disabled={state.submitting}
                           className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transform hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           {state.submitting ? 'Sending...' : 'Send Message'}
                           <Mail className="ml-2 w-5 h-5 group-hover:" />
                         </Button>
                       </div>
                     </form>
                   )}
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
