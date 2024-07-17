import React from 'react';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

const Dashboard = () => {
    const role = 'student'; // This should be dynamically determined based on the logged-in user

    return (
        <div>
            <h1>Dashboard</h1>
            {role === 'student' && <StudentDashboard />}
            {role === 'teacher' && <TeacherDashboard />}
        </div>
    );
};

export default Dashboard;
