import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Cell, Pie, LineChart, Line, AreaChart, Area } from 'recharts';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  TrendingUp, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Plus,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  FileText,
  Stethoscope,
  Brain,
  BarChart3,
  PieChart as PieChartIcon,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
  recentActiveUsers: number;
  recentSignups: number;
  lastUpdated: string;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface UsersResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface FeatureToggle {
  _id: string;
  featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai';
  isEnabled: boolean;
  displayName: string;
  description: string;
  lastModifiedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface SchemaUsageStats {
  schemaType: string;
  totalUses: number;
  successfulUses: number;
  totalRows: number;
  avgProcessingTime: number;
  uniqueUsers: number;
}

interface UserUsageStats {
  userId: string;
  userEmail: string;
  userCompany: string;
  totalUses: number;
  successfulUses: number;
  schemasUsed: string[];
  lastUsed: string;
}

interface UsageStats {
  schemaStats: SchemaUsageStats[];
  userStats: UserUsageStats[];
  recentActivity: any[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UsersResponse['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([]);
  const [isTogglesLoading, setIsTogglesLoading] = useState(false);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [isUsageLoading, setIsUsageLoading] = useState(false);
  
  // Create user form state
  const [createUserForm, setCreateUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: 'user' as 'user' | 'admin',
    password: '',
    confirmPassword: ''
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [createUserError, setCreateUserError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Get the API base URL from environment variables
  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || '/api';
  };

  // Fetch admin statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/admin/stats`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setError(''); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch statistics. Please check your connection.');
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    setIsUsersLoading(true);
    try {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: '10',
      ...(searchTerm && { search: searchTerm }),
      ...(roleFilter && roleFilter !== 'all' && { role: roleFilter }),
      ...(statusFilter && statusFilter !== 'all' && { status: statusFilter }),
      sortBy,
      sortOrder,
    });

      const response = await fetch(`${getApiUrl()}/admin/users?${params}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users || []);
        setPagination(data.data.pagination || null);
        setError(''); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please check your connection.');
    } finally {
      setIsUsersLoading(false);
    }
  };

  // Toggle user status
  const toggleUserStatus = async (userId: string) => {
    try {
      const response = await fetch(`${getApiUrl()}/admin/users/${userId}/toggle-status`, {
        method: 'PATCH',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success) {
        fetchUsers(); // Refresh users list
        fetchStats(); // Refresh stats
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      setError('Failed to toggle user status');
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${getApiUrl()}/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success) {
        fetchUsers(); // Refresh users list
        fetchStats(); // Refresh stats
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  // Create new user
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingUser(true);
    setCreateUserError('');

    // Validate form
    const errors = [];
    
    if (!createUserForm.firstName.trim()) errors.push('First name is required');
    if (!createUserForm.lastName.trim()) errors.push('Last name is required');
    if (!createUserForm.email.trim()) errors.push('Email is required');
    if (!createUserForm.company.trim()) errors.push('Company is required');
    if (!createUserForm.password) errors.push('Password is required');
    if (!createUserForm.role) errors.push('Role is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (createUserForm.email && !emailRegex.test(createUserForm.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Password validation
    if (createUserForm.password && createUserForm.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    // Password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (createUserForm.password && !passwordRegex.test(createUserForm.password)) {
      errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }
    
    if (createUserForm.password !== createUserForm.confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    if (errors.length > 0) {
      setCreateUserError(errors.join(', '));
      setIsCreatingUser(false);
      return;
    }

    try {
      const requestData = {
        firstName: createUserForm.firstName.trim(),
        lastName: createUserForm.lastName.trim(),
        email: createUserForm.email.trim(),
        company: createUserForm.company.trim(),
        role: createUserForm.role,
        password: createUserForm.password
      };
      
      const response = await fetch(`${getApiUrl()}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setCreateUserForm({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          role: 'user',
          password: '',
          confirmPassword: ''
        });
        setShowCreateUser(false);
        setCreateUserError('');
        
        // Refresh users list and stats
        fetchUsers();
        fetchStats();
      } else {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((error: any) => error.msg || error.message).join(', ');
          setCreateUserError(`Validation failed: ${errorMessages}`);
        } else {
          setCreateUserError(data.message || 'Failed to create user');
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setCreateUserError('Failed to create user. Please check your connection.');
    } finally {
      setIsCreatingUser(false);
    }
  };

  // Handle form input changes
  const handleCreateUserInputChange = (field: string, value: string) => {
    setCreateUserForm(prev => ({
      ...prev,
      [field]: value
    }));
    if (createUserError) setCreateUserError('');
  };

  // Fetch usage statistics
  const fetchUsageStats = async () => {
    setIsUsageLoading(true);
    try {
      const response = await fetch(`${getApiUrl()}/admin/usage-stats`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUsageStats(data.data);
        setError(''); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to fetch usage statistics');
      }
    } catch (error) {
      console.error('Error fetching usage stats:', error);
      setError('Failed to fetch usage statistics. Please check your connection.');
    } finally {
      setIsUsageLoading(false);
    }
  };

  // Fetch feature toggles
  const fetchFeatureToggles = async () => {
    setIsTogglesLoading(true);
    try {
      console.log(`Fetching feature toggles from: ${getApiUrl()}/admin/feature-toggles`);
      
      const response = await fetch(`${getApiUrl()}/admin/feature-toggles`, {
        credentials: 'include',
      });
      
      console.log(`Feature toggles response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Feature toggles response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Feature toggles response data:', data);
      
      if (data.success) {
        // Apply localStorage overrides if any
        const localToggles = JSON.parse(localStorage.getItem('featureToggles') || '{}');
        const togglesWithOverrides = data.data.toggles.map((toggle: any) => ({
          ...toggle,
          isEnabled: localToggles[toggle.featureName] !== undefined ? localToggles[toggle.featureName] : toggle.isEnabled
        }));
        
        setFeatureToggles(togglesWithOverrides);
        setError(''); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to fetch feature toggles');
      }
    } catch (error) {
      console.error('Error fetching feature toggles:', error);
      
      // Fallback to default toggles with localStorage overrides
      console.log('Using fallback feature toggles');
      const defaultToggles = [
        {
          _id: 'op_billing',
          featureName: 'op_billing',
          isEnabled: true,
          displayName: 'OP Billing',
          description: 'Outpatient billing management system',
          lastModifiedBy: 'system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'doctor_roster',
          featureName: 'doctor_roster',
          isEnabled: true,
          displayName: 'Doctor Roster',
          description: 'Doctor roster and scheduling management',
          lastModifiedBy: 'system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'compliance_ai',
          featureName: 'compliance_ai',
          isEnabled: true,
          displayName: 'Compliance AI',
          description: 'AI-powered compliance monitoring and reporting',
          lastModifiedBy: 'system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      // Apply localStorage overrides
      const localToggles = JSON.parse(localStorage.getItem('featureToggles') || '{}');
      const togglesWithOverrides = defaultToggles.map((toggle: any) => ({
        ...toggle,
        isEnabled: localToggles[toggle.featureName] !== undefined ? localToggles[toggle.featureName] : toggle.isEnabled
      }));
      
      setFeatureToggles(togglesWithOverrides);
      setError(''); // Clear error since we're using fallback
    } finally {
      setIsTogglesLoading(false);
    }
  };

  // Toggle feature status
  const toggleFeature = async (featureName: string, isEnabled: boolean) => {
    try {
      console.log(`Toggling feature ${featureName} to ${isEnabled}`);
      console.log(`API URL: ${getApiUrl()}/admin/feature-toggles/${featureName}`);
      
      // First, optimistically update the UI
      setFeatureToggles(prev => 
        prev.map(toggle => 
          toggle.featureName === featureName 
            ? { ...toggle, isEnabled }
            : toggle
        )
      );
      
      // Store in localStorage as fallback
      const localToggles = JSON.parse(localStorage.getItem('featureToggles') || '{}');
      localToggles[featureName] = isEnabled;
      localStorage.setItem('featureToggles', JSON.stringify(localToggles));
      
      const response = await fetch(`${getApiUrl()}/admin/feature-toggles/${featureName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isEnabled })
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        
        // If server is not available, keep the local storage update
        if (response.status === 0 || response.status >= 500) {
          console.log('Server not available, using local storage fallback');
          setError(''); // Clear error since we're using fallback
          return;
        }
        
        // Revert the optimistic update for client errors
        setFeatureToggles(prev => 
          prev.map(toggle => 
            toggle.featureName === featureName 
              ? { ...toggle, isEnabled: !isEnabled }
              : toggle
          )
        );
        
        // Remove from localStorage
        delete localToggles[featureName];
        localStorage.setItem('featureToggles', JSON.stringify(localToggles));
        
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setError(''); // Clear any previous errors
        console.log(`Successfully toggled ${featureName} to ${isEnabled}`);
      } else {
        // Revert the optimistic update
        setFeatureToggles(prev => 
          prev.map(toggle => 
            toggle.featureName === featureName 
              ? { ...toggle, isEnabled: !isEnabled }
              : toggle
          )
        );
        
        // Remove from localStorage
        delete localToggles[featureName];
        localStorage.setItem('featureToggles', JSON.stringify(localToggles));
        
        setError(data.message || 'Failed to update feature toggle');
      }
    } catch (error) {
      console.error('Error toggling feature:', error);
      
      // If it's a network error, keep the local storage update
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('Network error, using local storage fallback');
        setError(''); // Clear error since we're using fallback
        return;
      }
      
      // Revert the optimistic update for other errors
      setFeatureToggles(prev => 
        prev.map(toggle => 
          toggle.featureName === featureName 
            ? { ...toggle, isEnabled: !isEnabled }
            : toggle
        )
      );
      
      // Remove from localStorage
      const localToggles = JSON.parse(localStorage.getItem('featureToggles') || '{}');
      delete localToggles[featureName];
      localStorage.setItem('featureToggles', JSON.stringify(localToggles));
      
      setError(`Failed to update feature toggle: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchStats(), fetchUsers(), fetchFeatureToggles(), fetchUsageStats()]);
      } catch (error) {
        console.error('Error in initial data fetch:', error);
        setError('Failed to load admin data. Please ensure the server is running.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch users when filters change
  useEffect(() => {
    if (!isLoading) {
      setCurrentPage(1);
      fetchUsers();
    }
  }, [searchTerm, roleFilter, statusFilter, sortBy, sortOrder]);

  // Fetch users when page changes
  useEffect(() => {
    if (!isLoading && currentPage > 1) {
      fetchUsers();
    }
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Welcome back, {user?.firstName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  All registered accounts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeUsers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Currently active accounts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Recent Activity</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.recentActiveUsers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Logged in last 30 days
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">New Signups</CardTitle>
                <UserX className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.recentSignups}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Joined last 30 days
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feature Toggle Management */}
        <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Feature Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Enable or disable features for all users on the main website
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isTogglesLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-600 dark:text-gray-300">Loading feature settings...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featureToggles.map((toggle) => {
                  const getFeatureIcon = () => {
                    switch (toggle.featureName) {
                      case 'op_billing':
                        return <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />;
                      case 'doctor_roster':
                        return <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
                      case 'compliance_ai':
                        return <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
                      default:
                        return <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
                    }
                  };

                  return (
                    <div key={toggle._id} className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFeatureIcon()}
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {toggle.displayName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {toggle.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={toggle.isEnabled}
                          onCheckedChange={(checked) => toggleFeature(toggle.featureName, checked)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={toggle.isEnabled ? "default" : "secondary"}>
                          {toggle.isEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                        {toggle.isEnabled ? (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        )}
                      </div>
                      {!toggle.isEnabled && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-600 rounded-md p-3">
                          <p className="text-sm text-orange-800 dark:text-orange-300">
                            <strong>Under Construction:</strong> This feature is currently disabled and will show an "Under Construction" page to users.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        {usageStats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Schema Usage Chart */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Schema Usage Statistics</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Track which schemas are being used most frequently
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isUsageLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-300">Loading usage statistics...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Schema Usage Bar Chart */}
                    <div className="h-80">
                      <ChartContainer
                        config={{
                          op_billing: {
                            label: "OP Billing",
                            color: "hsl(var(--chart-1))",
                          },
                          doctor_roster: {
                            label: "Doctor Roster", 
                            color: "hsl(var(--chart-2))",
                          },
                          compliance_ai: {
                            label: "Compliance AI",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-full w-full"
                      >
                        <BarChart data={usageStats.schemaStats}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="schemaType" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                              const labels: { [key: string]: string } = {
                                'op_billing': 'OP Billing',
                                'doctor_roster': 'Doctor Roster',
                                'compliance_ai': 'Compliance AI'
                              };
                              return labels[value] || value;
                            }}
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="totalUses">
                            {usageStats.schemaStats.map((entry, index) => {
                              const colors = ['#10b981', '#3b82f6', '#f97316']; // Green, Blue, Orange
                              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ChartContainer>
                    </div>

                    {/* Schema Usage Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {usageStats.schemaStats.map((schema) => {
                        const getSchemaIcon = () => {
                          switch (schema.schemaType) {
                            case 'op_billing':
                              return <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />;
                            case 'doctor_roster':
                              return <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
                            case 'compliance_ai':
                              return <Brain className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
                            default:
                              return <BarChart3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
                          }
                        };

                        const getSchemaName = () => {
                          const names: { [key: string]: string } = {
                            'op_billing': 'OP Billing',
                            'doctor_roster': 'Doctor Roster',
                            'compliance_ai': 'Compliance AI'
                          };
                          return names[schema.schemaType] || schema.schemaType;
                        };

                        return (
                          <div key={schema.schemaType} className="bg-[#F0F8FF] dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              {getSchemaIcon()}
                              <span className="font-medium text-gray-900 dark:text-white">
                                {getSchemaName()}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Total Uses:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{schema.totalUses}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Success Rate:</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {schema.totalUses > 0 ? Math.round((schema.successfulUses / schema.totalUses) * 100) : 0}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Unique Users:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{schema.uniqueUsers}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Usage Chart */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">User Activity</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Track user engagement and activity patterns
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isUsageLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-gray-600 dark:text-gray-300">Loading user statistics...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Top Users Table */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">Top Active Users</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {usageStats.userStats.slice(0, 5).map((user, index) => (
                          <div key={user.userId} className="flex items-center justify-between p-3 bg-[#F0F8FF] dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                  {user.userEmail}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {user.userCompany}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.totalUses} uses
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user.schemasUsed.length} schemas
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Usage Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#F0F8FF] dark:bg-blue-900/20 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Usage</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                          {usageStats.schemaStats.reduce((sum, schema) => sum + schema.totalUses, 0)}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">All schemas combined</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-300">Active Users</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                          {usageStats.userStats.length}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">Users with activity</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Management */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">User Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Manage user accounts, roles, and permissions
                </CardDescription>
              </div>
              <Button onClick={() => setShowCreateUser(true)} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F0F8FF] dark:bg-gray-700">
                    <TableHead className="text-gray-600 dark:text-gray-300">User</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Company</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Role</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Last Login</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Created</TableHead>
                    <TableHead className="text-right text-gray-600 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isUsersLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <p className="text-gray-600 dark:text-gray-300">Loading users...</p>
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300">No users found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-white">{user.company}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? 'default' : 'destructive'}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.lastLogin ? (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">Never</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toggleUserStatus(user._id)}>
                                {user.isActive ? (
                                  <>
                                    <ToggleLeft className="w-4 h-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <ToggleRight className="w-4 h-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteUser(user._id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)} of{' '}
                  {pagination.totalUsers} users
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create User Modal */}
      <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Create New User</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Add a new user to the system. All fields are required.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={createUser} className="space-y-4">
            {createUserError && (
              <Alert variant="destructive" className="border-red-200 dark:border-red-500 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800 dark:text-red-300">
                  {createUserError}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={createUserForm.firstName}
                  onChange={(e) => handleCreateUserInputChange('firstName', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Enter first name"
                  disabled={isCreatingUser}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={createUserForm.lastName}
                  onChange={(e) => handleCreateUserInputChange('lastName', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Enter last name"
                  disabled={isCreatingUser}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={createUserForm.email}
                onChange={(e) => handleCreateUserInputChange('email', e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="Enter email address"
                disabled={isCreatingUser}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700 dark:text-gray-300">
                Company *
              </Label>
              <Input
                id="company"
                type="text"
                value={createUserForm.company}
                onChange={(e) => handleCreateUserInputChange('company', e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="Enter company name"
                disabled={isCreatingUser}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                Role *
              </Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCreateUserInputChange('role', 'user')}
                  disabled={isCreatingUser}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    createUserForm.role === 'user'
                      ? 'border-blue-500 bg-[#F0F8FF] dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  } ${isCreatingUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      createUserForm.role === 'user'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {createUserForm.role === 'user' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">User</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleCreateUserInputChange('role', 'admin')}
                  disabled={isCreatingUser}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    createUserForm.role === 'admin'
                      ? 'border-blue-500 bg-[#F0F8FF] dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  } ${isCreatingUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      createUserForm.role === 'admin'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {createUserForm.role === 'admin' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">Admin</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={createUserForm.password}
                  onChange={(e) => handleCreateUserInputChange('password', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white pr-10"
                  placeholder="Enter password (min 6 chars, 1 uppercase, 1 lowercase, 1 number)"
                  disabled={isCreatingUser}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  disabled={isCreatingUser}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                Confirm Password *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={createUserForm.confirmPassword}
                  onChange={(e) => handleCreateUserInputChange('confirmPassword', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white pr-10"
                  placeholder="Confirm password"
                  disabled={isCreatingUser}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  disabled={isCreatingUser}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateUser(false)}
                disabled={isCreatingUser}
                className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingUser}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isCreatingUser ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create User'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
