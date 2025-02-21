const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
};

export const fetchStats = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  
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

export const fetchTeamMembers = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/admin/team`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch team members');
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