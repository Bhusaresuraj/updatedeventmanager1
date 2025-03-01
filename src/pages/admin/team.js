import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from '../../styles/AdminTeam.module.css';
import { toast } from 'react-toastify';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: ''
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const data = await AdminService.getTeamMembers();
      setTeamMembers(data);
    } catch (error) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMember = await AdminService.addTeamMember(formData);
      setTeamMembers([...teamMembers, newMember]);
      setFormData({ name: '', role: '', image: '', bio: '' });
      toast.success('Team member added successfully!');
    } catch (error) {
      toast.error('Failed to add team member');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await AdminService.deleteTeamMember(id);
      setTeamMembers(teamMembers.filter(member => member.id !== id));
      toast.success('Team member deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete team member');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading team members...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1>Team Management</h1>

        <div className={styles.addMemberForm}>
          <h2>Add New Team Member</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Add Team Member
            </button>
          </form>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map(member => (
            <div key={member.id} className={styles.memberCard}>
              <img src={member.image} alt={member.name} />
              <div className={styles.memberInfo}>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement; 