import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [newLecture, setNewLecture] = useState('');

    useEffect(() => {
        // Fetch users
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch lectures
        const fetchLectures = async () => {
            try {
                const response = await axios.get('/api/admin/lectures', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setLectures(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
        fetchLectures();
    }, []);

    const handleCreateLecture = async () => {
        try {
            const response = await axios.post('/api/admin/lectures', { name: newLecture }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setLectures([...lectures, response.data]);
            setNewLecture('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.username} - {user.role}</li>
                ))}
            </ul>
            <h3>Lectures</h3>
            <ul>
                {lectures.map((lecture) => (
                    <li key={lecture._id}>{lecture.name}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="New Lecture"
                value={newLecture}
                onChange={(e) => setNewLecture(e.target.value)}
            />
            <button onClick={handleCreateLecture}>Create Lecture</button>
        </div>
    );
};

export default AdminDashboard;
