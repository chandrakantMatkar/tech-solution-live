import React, { useState,useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            // Extract the query parameter from the URL
            const urlSearchParams = new URLSearchParams(window.location.search);
            setToken(urlSearchParams.get('token'));
        }
        fetchData();
    }, [])


    const handleResetPassword = async() => {
        if (password === confirmPassword) {
            const toastId = toast.loading(`Resetting password...`);
            try {
                // Perform API call here
                const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, password }),
                });

                if (response.ok) {
                    // Handle successful login
                    toast.success(`Password updated successfully.`,{id: toastId});
                    console.log('Password updated successfully.');
                    navigate('/login');
                } else {
                    // Handle login failure
                    const data = await response.json();
                    console.log(data.error)   
                    toast.error(`Password reset failed. ${data.error}`,{id: toastId});
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error(`Error during login: ${error}`,{id: toastId})
            }
        } else {
            setPasswordMatchError('Passwords do not match');
            toast.custom(`Passwords do not match`);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Clear the password match error when the user types in the password field
        setPasswordMatchError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Clear the password match error when the user types in the confirm password field
        setPasswordMatchError('');
    };


    return (
        <div className="reset-password-container">
            <Toaster reverseOrder={false}/>
            <h2 className="reset-password-header">Reset Password</h2>
            <div className="reset-password-form">
                <label className="reset-password-label">New Password:</label>
                <input
                    type="password"
                    className="reset-password-input"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className="reset-password-label">Confirm Password:</label>
                <input
                    type="password"
                    className="reset-password-input"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {passwordMatchError && (
                    <p className="reset-password-error">{passwordMatchError}</p>
                )}

                <button className="reset-password-button" onClick={handleResetPassword}>
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
