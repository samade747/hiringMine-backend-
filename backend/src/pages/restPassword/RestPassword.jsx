// Importing necessary components and modules from MUI, React, react-toastify, react-router-dom, axios, and custom utilities
import { Box, Container, Grid } from '@mui/material'; // Importing MUI components
import { ToastContainer, toast } from "react-toastify"; // Importing toast container and toast function for notifications

import './resetpassword.css'; // Importing the CSS for the reset password component
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for react-toastify
import { Link, useNavigate, useParams } from 'react-router-dom'; // Importing Link, useNavigate, and useParams hooks from react-router-dom
import { useState } from 'react'; // Importing useState hook from React
import axios from 'axios'; // Importing axios for making HTTP requests
import { serverUrl } from '../../utils/appConstant'; // Importing the server URL from custom utilities

// ResetPassword component definition
const ResetPassword = () => {
    const navigate = useNavigate(); // Defining the navigate function for redirection
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [confirmNewPassword, setConfirmNewPassword] = useState(""); // State for confirming new password
    const { id, token } = useParams(); // Extracting parameters (id, token) from the URL

    // Function to handle password reset
    const resetPasswordHandler = async (e) => {
        e.preventDefault(); // Preventing the default form submission behavior
        try {
            console.log("running");
            console.log("new", newPassword);
            console.log("confirmnew", confirmNewPassword);

            // Sending a PUT request to reset the password
            const res = await axios.put(`${serverUrl}/api/auth/resetPassword`, {
                newPassword, // Sending new password
                confirmNewPassword, // Sending confirmed new password
                token // Sending token from URL
            });
            const msg = res.data.message; // Extracting message from response
            if (res.data.status) {
                // Displaying a success toast notification
                toast.success(msg, {
                    position: "top-right", // Positioning the toast at the top-right
                    autoClose: 5000, // Auto close after 5 seconds
                    hideProgressBar: false, // Showing the progress bar
                    closeOnClick: true, // Allowing close on click
                    pauseOnHover: true, // Pausing on hover
                    draggable: true, // Allowing draggable
                    progress: undefined, // Default progress
                    theme: "light", // Setting the theme to light
                });
                // Redirecting to login page after a short delay
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            let message = error?.response?.data.message; // Extracting error message from response
            console.log(message);
            // Displaying an error toast notification
            toast.error(message, {
                position: "top-right", // Positioning the toast at the top-right
                autoClose: 5000, // Auto close after 5 seconds
                hideProgressBar: false, // Showing the progress bar
                closeOnClick: true, // Allowing close on click
                pauseOnHover: true, // Pausing on hover
                draggable: true, // Allowing draggable
                progress: undefined, // Default progress
                theme: "light", // Setting the theme to light
            });
        }
    };

    // Rendering the reset password component
    return (
        <div>
            {/* Toast container for displaying notifications */}
            <ToastContainer
                position="top-right" // Positioning the toast container at the top-right
                autoClose={5000} // Auto close after 5 seconds
                hideProgressBar={false} // Showing the progress bar
                newestOnTop={false} // Not keeping the newest toast on top
                closeOnClick // Allowing close on click
                rtl={false} // Not using right-to-left layout
                pauseOnFocusLoss // Pausing on focus loss
                draggable // Allowing draggable
                pauseOnHover // Pausing on hover
                theme="light" // Setting the theme to light
            />
            {/* Main container for the reset password form */}
            <Container className='loginContainer'>
                <Box>
                    {/* Grid layout for the reset password form */}
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"}>
                        <Grid item xs={12} sm={12} md={12} lg={12} order={{ xs: 4, sm: 4, md: 4 }} className="loginGrid">
                            <div className='login'>
                                <h4 className='loginTitle'>RESET PASSWORD</h4>
                                <form className="inputWrappers">
                                    <div className="inputChilds">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder='New Password'
                                            className='password'
                                            id=""
                                            onChange={(e) => setNewPassword(e.currentTarget.value)} // Setting the new password state
                                        />
                                    </div>
                                    <div className="inputChilds">
                                        <input
                                            type="password"
                                            name="cPassword"
                                            placeholder='Confirm new Password'
                                            id=""
                                            className='cPassword'
                                            onChange={(e) => setConfirmNewPassword(e.currentTarget.value)} // Setting the confirm new password state
                                        />
                                    </div>
                                    <button className="signupButton" onClick={resetPasswordHandler}>Reset Password</button>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                    <p className='haveAccount'>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#6851FF" }}>Register Now</Link></p>
                </Box>
            </Container>
        </div>
    );
};

export default ResetPassword;
