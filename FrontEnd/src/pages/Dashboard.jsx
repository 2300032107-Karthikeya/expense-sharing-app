// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Keep this import
import Navbar from '../components/Navbar';
import apiClient from '../services/api';

const Dashboard = () => {
  // State for the create group form
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [message, setMessage] = useState('');
  
  // State to hold the list of groups
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // This function was missing its body in the previous step. It's now restored.
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/groups');
      setGroups(response.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      setMessage("Failed to load groups.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to fetch groups when the component loads
  useEffect(() => {
    fetchGroups();
  }, []);

  // This function was also missing its body. It's now restored.
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await apiClient.post('/groups', {
        name: groupName,
        description: groupDescription
      });
      setMessage(`Group '${response.data.name}' created successfully!`);
      setGroupName('');
      setGroupDescription('');
      fetchGroups(); // Refresh the group list
    } catch (error) {
      setMessage(error.response?.data || 'Error creating group.');
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Column for creating a group */}
          <div className="col-md-4">
            <h2>Create a New Group</h2>
            <form onSubmit={handleCreateGroup}>
              {message && <div className="alert alert-info">{message}</div>}
              <div className="form-group mb-3">
                <label>Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Group Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Group</button>
            </form>
          </div>

          {/* Column for displaying groups */}
          <div className="col-md-8">
            <h2>My Groups</h2>
            {loading ? (
              <p>Loading groups...</p>
            ) : (
              <div className="list-group">
                {groups.length > 0 ? (
                  groups.map(group => (
                    <Link 
                      key={group.id} 
                      to={`/group/${group.id}`} 
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{group.name}</h5>
                      </div>
                      <p className="mb-1">{group.description}</p>
                    </Link>
                  ))
                ) : (
                  <p>No groups found. Create one to get started!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;