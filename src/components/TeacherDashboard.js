import React, { useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
    const [lectureId, setLectureId] = useState('');
    const [qrCode, setQrCode] = useState('');

    const generateQrCode = async () => {
        try {
            const response = await axios.get(`/api/qr/generate/${lectureId}`);
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Teacher Dashboard</h2>
            <input
                type="text"
                placeholder="Lecture ID"
                value={lectureId}
                onChange={(e) => setLectureId(e.target.value)}
            />
            <button onClick={generateQrCode}>Generate QR Code</button>
            {qrCode && <img src={qrCode} alt="Generated QR Code" />}
        </div>
    );
};

export default TeacherDashboard;
