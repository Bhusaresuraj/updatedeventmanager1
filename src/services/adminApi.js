const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Authentication
export const adminLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

// Dashboard Stats
export const fetchStats = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

// Team Management
export const fetchTeamMembers = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/team`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch team');
  return response.json();
};

// Events Management
export const fetchEvents = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/events`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
};

// Gallery Management
export const uploadImage = async (formData) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/gallery/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  if (!response.ok) throw new Error('Failed to upload image');
  return response.json();
};

// Services Management
export const updateService = async (serviceData) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/services`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(serviceData)
  });
  if (!response.ok) throw new Error('Failed to update service');
  return response.json();
};

// Artists Management
export const manageArtist = async (artistData, method = 'POST') => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/artists`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(artistData)
  });
  if (!response.ok) throw new Error('Artist operation failed');
  return response.json();
};

// Enquiries Management
export const fetchEnquiries = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/enquiries`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch enquiries');
  return response.json();
};

export const updateTeamMember = async (data) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/team`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update team member');
  }
  
  return response.json();
};

export const addTeamMember = async (memberData) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/team`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(memberData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to add team member');
  }
  
  return response.json();
};

export const deleteTeamMember = async (id) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/team/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete team member');
  }
  
  return response.json();
};

// Add more admin API functions as needed 