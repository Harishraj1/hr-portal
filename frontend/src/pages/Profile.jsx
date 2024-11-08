import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../components/utils';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        address: ''
    });

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${baseURL}/accounts/profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserDetails(response.data);
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response?.data?.message || 'Failed to fetch user details'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(
                `${baseURL}/accounts/profile/update/`,
                userDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setAlert({
                type: 'success',
                message: 'Profile updated successfully'
            });
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
            
            {alert.message && (
                <div className={`p-4 mb-4 rounded ${
                    alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {alert.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userDetails.username}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={userDetails.first_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={userDetails.last_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={userDetails.phone_number}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <textarea
                        name="address"
                        value={userDetails.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default Profile;