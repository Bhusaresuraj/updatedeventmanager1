const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AdminService {
  static async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getStats() {
    try {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch stats');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getTeamMembers() {
    try {
      const response = await fetch(`${API_URL}/admin/team`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch team members');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async addTeamMember(memberData) {
    try {
      const response = await fetch(`${API_URL}/admin/team`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add team member');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTeamMember(id) {
    try {
      const response = await fetch(`${API_URL}/admin/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete team member');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getTestimonials() {
    try {
      const response = await fetch(`${API_URL}/admin/testimonials`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch testimonials');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async addTestimonial(testimonialData) {
    try {
      const response = await fetch(`${API_URL}/admin/testimonials`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testimonialData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add testimonial');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTestimonial(id) {
    try {
      const response = await fetch(`${API_URL}/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete testimonial');
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Add more methods as needed
}

export default AdminService; 