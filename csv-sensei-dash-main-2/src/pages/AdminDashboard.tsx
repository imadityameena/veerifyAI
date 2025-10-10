import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Brain
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

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch admin statistics
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
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

      const response = await fetch(`/api/admin/users?${params}`, {
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
      const response = await fetch(`/api/admin/users/${userId}/toggle-status`, {
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
      const response = await fetch(`/api/admin/users/${userId}`, {
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

  // Fetch feature toggles
  const fetchFeatureToggles = async () => {
    setIsTogglesLoading(true);
    try {
      const response = await fetch('/api/admin/feature-toggles', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setFeatureToggles(data.data.toggles);
      } else {
        setError(data.message || 'Failed to fetch feature toggles');
      }
    } catch (error) {
      console.error('Error fetching feature toggles:', error);
      setError('Failed to fetch feature toggles. Please check your connection.');
    } finally {
      setIsTogglesLoading(false);
    }
  };

  // Toggle feature status
  const toggleFeature = async (featureName: string, isEnabled: boolean) => {
    try {
      const response = await fetch(`/api/admin/feature-toggles/${featureName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isEnabled })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setFeatureToggles(prev => 
          prev.map(toggle => 
            toggle.featureName === featureName 
              ? { ...toggle, isEnabled }
              : toggle
          )
        );
      } else {
        setError(data.message || 'Failed to update feature toggle');
      }
    } catch (error) {
      console.error('Error toggling feature:', error);
      setError('Failed to update feature toggle. Please try again.');
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
        await Promise.all([fetchStats(), fetchUsers(), fetchFeatureToggles()]);
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, {user?.firstName}</p>
              </div>
            </div>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  All registered accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Currently active accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.recentActiveUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Logged in last 30 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Signups</CardTitle>
                <UserX className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.recentSignups}</div>
                <p className="text-xs text-muted-foreground">
                  Joined last 30 days
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feature Toggle Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <div>
                <CardTitle>Feature Management</CardTitle>
                <CardDescription>
                  Enable or disable features for all users on the main website
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isTogglesLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin mr-2 text-blue-600" />
                <span className="text-slate-600">Loading feature settings...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featureToggles.map((toggle) => {
                  const getFeatureIcon = () => {
                    switch (toggle.featureName) {
                      case 'op_billing':
                        return <FileText className="w-5 h-5 text-green-600" />;
                      case 'doctor_roster':
                        return <Stethoscope className="w-5 h-5 text-blue-600" />;
                      case 'compliance_ai':
                        return <Brain className="w-5 h-5 text-purple-600" />;
                      default:
                        return <Settings className="w-5 h-5 text-gray-600" />;
                    }
                  };

                  return (
                    <div key={toggle._id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFeatureIcon()}
                          <div>
                            <h3 className="font-medium text-slate-900">
                              {toggle.displayName}
                            </h3>
                            <p className="text-sm text-slate-600">
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
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      {!toggle.isEnabled && (
                        <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                          <p className="text-sm text-orange-800">
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

        {/* Users Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
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
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
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
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isUsersLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                        <p className="text-slate-600">Loading users...</p>
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                        <p className="text-slate-600">No users found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-slate-600">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{user.company}</TableCell>
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
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span className="text-sm">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-slate-400">Never</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
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
                <p className="text-sm text-slate-600">
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
    </div>
  );
};

export default AdminDashboard;
