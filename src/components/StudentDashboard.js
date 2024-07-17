import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const StudentDashboard = () => {
    const [qrCode, setQrCode] = useState('');
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [lectureId, setLectureId] = useState(''); // The ID of the current lecture

    useEffect(() => {
        // Fetch the QR code for the current lecture (you can adjust the endpoint as needed)
        const fetchQrCode = async () => {
            try {
                const response = await axios.get(`/api/qr/generate/${lectureId}`);
                setQrCode(response.data.qrCode);
            } catch (error) {
                console.error(error);
            }
        };

        if (lectureId) {
            fetchQrCode();
        }
    }, [lectureId]);

    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleCheckIn = async () => {
        fetchLocation();
        try {
            const response = await axios.post('/api/attendance/checkin', {
                lectureId,
                location: `${location.latitude},${location.longitude}`,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Check-in successful!');
        } catch (error) {
            console.error(error);
            alert('Check-in failed');
        }
    };

    const handleCheckOut = async () => {
        fetchLocation();
        try {
            const response = await axios.post('/api/attendance/checkout', {
                lectureId,
                location: `${location.latitude},${location.longitude}`,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Check-out successful!');
        } catch (error) {
            console.error(error);
            alert('Check-out failed');
        }
    };

    const handlePhoneUsage = () => {
        const data = {
            userId: localStorage.getItem('userId'), // Assume userId is stored in localStorage
            lectureId,
            timestamp: new Date(),
        };
        socket.emit('phone-usage', data);
    };

    useEffect(() => {
        window.addEventListener('focus', handlePhoneUsage);

        return () => {
            window.removeEventListener('focus', handlePhoneUsage);
        };
    }, [lectureId]);

    return (
        <div>
            <h2>Student Dashboard</h2>
            <input
                type="text"
                placeholder="Lecture ID"
                value={lectureId}
                onChange={(e) => setLectureId(e.target.value)}
            />
            <button onClick={handleCheckIn}>Check In</button>
            <button onClick={handleCheckOut}>Check Out</button>
            {qrCode ? (
                <img src={qrCode} alt="Lecture QR Code" />
            ) : (
                <p>Loading QR code...</p>
            )}
        </div>
    );
};

export default StudentDashboard;
