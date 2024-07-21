
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <div>
                <h1>Welcome to the Attendance System</h1>
                <Link to="/register">Register</Link>
                <br />
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Home;
