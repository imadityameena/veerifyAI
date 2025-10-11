// Admin API service with proper authentication
const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || '/api';
};

// Helper function to get auth token from cookies or localStorage
const getAuthToken = () => {
  // First try to get from cookies
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  // Fallback to localStorage if available
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      // If we have user data, we can make the request and let the server handle auth
      return 'localStorage-fallback';
    }
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }
  
  return null;
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid, redirect to login
      window.location.href = '/login';
      throw new Error('Authentication required');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Admin Statistics
export async function fetchAdminStats() {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/stats`);
  return response;
}

// User Management
export async function fetchUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
} = {}) {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const url = `${getApiUrl()}/admin/users${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const response = await makeAuthenticatedRequest(url);
  return response;
}

export async function fetchUser(userId: string) {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/users/${userId}`);
  return response;
}

export async function updateUser(userId: string, userData: any) {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  return response;
}

export async function deleteUser(userId: string) {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/users/${userId}`, {
    method: 'DELETE',
  });
  return response;
}

export async function toggleUserStatus(userId: string) {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/users/${userId}/toggle-status`, {
    method: 'PATCH',
  });
  return response;
}

export async function createUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  role?: 'user' | 'admin';
}) {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  return response;
}

// Feature Toggle Management
export async function fetchFeatureToggles() {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/feature-toggles`);
  return response;
}

export async function updateFeatureToggle(featureName: string, isEnabled: boolean) {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/feature-toggles/${featureName}`, {
    method: 'PATCH',
    body: JSON.stringify({ isEnabled }),
  });
  return response;
}

// Health Check
export async function checkAdminHealth() {
  const response = await makeAuthenticatedRequest(`${getApiUrl()}/admin/health`);
  return response;
}
