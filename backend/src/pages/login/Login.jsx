// Importing necessary components and modules from MUI, React, react-toastify, react-router-dom, and axios
import { Box, Container, Grid } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './login.css'; // Importing the CSS for the login component
import { useState } from 'react'; // Importing useState hook for state management
import { Link, useNavigate } from 'react-router-dom'; // Importing Link for navigation and useNavigate for redirecting
import axios from 'axios'; // Importing axios for HTTP requests
import { serverUrl } from '../../utils/appConstant'; // Importing server URL constant

// Login component definition
const Login = () => {
    // Defining state variables for email and password
    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    // Defining the navigate function for redirection
    const navigate = useNavigate();

    // Function to handle login when the form is submitted
    const loginHandler = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            // Sending a POST request to the server for authentication
            const res = await axios.post(`${serverUrl}/api/auth/login`, {
                email: emailVal, // Passing the email value
                password: passwordVal, // Passing the password value
            });
            console.log(res); // Logging the server response
            // Storing the token received from the server in local storage
            localStorage.setItem("dummyToken", res.data.token);
            // Displaying a success toast notification
            toast.success('Login Successful!', {
                position: "top-right", // Positioning the toast at the top-right
                autoClose: 5000, // Auto close after 5 seconds
                hideProgressBar: false, // Showing the progress bar
                closeOnClick: true, // Allowing close on click
                pauseOnHover: true, // Pausing on hover
                draggable: true, // Allowing draggable
                progress: undefined, // Default progress
                theme: "light", // Setting the theme to light
            });
            // Navigating to the users page after a short delay
            setTimeout(() => {
                navigate("/users");
            }, 1000);
        } catch (error) {
            // Handling errors and displaying error toast notifications
            let message = error?.response?.data.message; // Getting error message from the server response
            console.log(message); // Logging the error message
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

    // Rendering the login component
    return (
        <div className="loginParent">
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
            <Container className='loginContainer'>
                <Box>
                    {/* Grid container for layout */}
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"}>
                        <Grid item xs={12} sm={12} md={12} lg={12} order={{ xs: 4, sm: 4, md: 4 }} className="loginGrid">
                            <div className='login'>
                                {/* Login form title */}
                                <h4 className='loginTitle'>WELCOME BACK</h4>
                                <p>Login to access your personalized job recommendations and apply to jobs quickly!</p>
                                {/* Login form */}
                                <form className="inputWrappers">
                                    <div className="inputChilds">
                                        {/* Email input field */}
                                        <input type="email" name="email" placeholder='Enter Email Address' className='email' id="" onChange={(e) => setEmailVal((e.currentTarget.value))} />
                                    </div>
                                    <div className="inputChilds">
                                        {/* Password input field */}
                                        <input type="password" name="password" placeholder='Password' className='password' id="" onChange={(e) => setPasswordVal(e.currentTarget.value)} />
                                    </div>
                                    {/* Link to forget password page */}
                                    <Link to="/forget_password" className='forgetPassword'><span>Forgotten Password</span></Link>
                                    {/* Login button */}
                                    <button className="signupButton" onClick={loginHandler}>Login</button>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                    {/* Link to signup page */}
                    <p className='haveAccount'>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#6851FF" }}>Register Now</Link></p>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
