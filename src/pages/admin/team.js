import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchTeamMembers, addTeamMember, deleteTeamMember } from '../../services/adminApi';
import styles from '../../styles/AdminTeam.module.css';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const data = await fetchTeamMembers();
      setTeamMembers(data);
    } catch (error) {
      setError('Failed to load team members');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await addTeamMember(newMember);
      setTeamMembers([...teamMembers, data]);
      setNewMember({ name: '', role: '', image: '', description: '' });
      setSuccess('Team member added successfully!');
    } catch (error) {
      setError('Failed to add team member');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      await deleteTeamMember(id);
      setTeamMembers(teamMembers.filter(member => member.id !== id));
      setSuccess('Team member deleted successfully!');
    } catch (error) {
      setError('Failed to delete team member');
    }
  };

  return (
    <AdminLayout>
      <div className={styles.teamManagement}>
        <h1>Team Management</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleAddMember} className={styles.addMemberForm}>
          <h2>Add New Team Member</h2>
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => setNewMember({...newMember, role: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMember.image}
            onChange={(e) => setNewMember({...newMember, image: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={newMember.description}
            onChange={(e) => setNewMember({...newMember, description: e.target.value})}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Member'}
          </button>
        </form>

        <div className={styles.teamList}>
          <h2>Current Team Members</h2>
          {teamMembers.map(member => (
            <div key={member.id} className={styles.memberCard}>
              <img src={member.image} alt={member.name} />
              <div className={styles.memberInfo}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p className={styles.description}>{member.description}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
              </div>
            </div>
          ))}
          {teamMembers.length === 0 && (
            <p className={styles.noMembers}>No team members found</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement; 