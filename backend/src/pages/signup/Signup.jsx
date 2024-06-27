// Importing necessary components and modules from MUI, React, react-toastify, react-router-dom, axios, and custom utilities
import { Box, Container, Grid } from '@mui/material'; // Importing MUI components for layout and styling
import { ToastContainer, toast } from "react-toastify"; // Importing toast container and toast function for notifications
import { Link, useNavigate } from "react-router-dom"; // Importing Link for navigation and useNavigate hook for redirection
import './signup.css'; // Importing CSS for the signup component
import axios from 'axios'; // Importing axios for making HTTP requests
import { useState } from 'react'; // Importing useState hook from React
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for react-toastify
import { serverUrl } from '../../utils/appConstant'; // Importing the server URL from custom utilities

// Signup component definition
function Signup() {
    const [firstNameVal, setFirstNameVal] = useState(""); // State for first name
    const [lastNameVal, setLastNameVal] = useState(""); // State for last name
    const [emailVal, setEmailVal] = useState(""); // State for email
    const [passwordVal, setPasswordVal] = useState(""); // State for password
    const [cPasswordVal, setcPasswordVal] = useState(""); // State for confirmed password
    const navigate = useNavigate(); // Defining the navigate function for redirection

    // Function to display a sample notification (not used in this code)
    const notify = () => {
        return toast('🦄 Wow so easy!', {
            position: "top-right", // Positioning the toast at the top-right
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false, // Showing the progress bar
            closeOnClick: true, // Allowing close on click
            pauseOnHover: true, // Pausing on hover
            draggable: true, // Allowing draggable
            progress: undefined, // Default progress
            theme: "red", // Setting the theme to red
            transition: Bounce, // Setting transition to bounce
        });
    }

    // Function to handle the signup process
    const signupHandler = async (e) => {
        e.preventDefault(); // Preventing the default form submission behavior
        try {
            // Sending a POST request to signup the user
            const res = await axios.post(`${serverUrl}/api/auth/signup`, {
                firstName: firstNameVal, // Sending first name
                lastName: lastNameVal, // Sending last name
                email: emailVal, // Sending email
                password: passwordVal, // Sending password
                cPassword: cPasswordVal, // Sending confirmed password
            });
            console.log(res);
            localStorage.setItem("dummyToken", res.data.token); // Storing the token in local storage
            // Displaying a success toast notification
            toast.success('Signup Successful!', {
                position: "top-right", // Positioning the toast at the top-right
                autoClose: 5000, // Auto close after 5 seconds
                hideProgressBar: false, // Showing the progress bar
                closeOnClick: true, // Allowing close on click
                pauseOnHover: true, // Pausing on hover
                draggable: true, // Allowing draggable
                progress: undefined, // Default progress
                theme: "light", // Setting the theme to light
            });
            // Redirecting to verify email page after a short delay
            setTimeout(() => {
                navigate("/verifyEmail");
            }, 2000);
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
    }

    // Rendering the signup component
    return (
        <div className='signupParent'>
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
            {/* Main container for the signup form */}
            <Container className='signupContainer'>
                <Box>
                    {/* Grid layout for the signup form */}
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"}>
                        <Grid item xs={12} sm={12} md={12} lg={12} order={{ xs: 4, sm: 4, md: 4 }} className="signUpGrid">
                            <div className='signup'>
                                <h4 className='signUpTitle'>LET’S GET STARTED</h4>
                                <p>Create an account to get recommended jobs that match your resume and apply to multiple jobs in seconds!</p>
                                <form className="inputWrappers">
                                    <div className="inputChilds">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder='First Name'
                                            className='firstName'
                                            id=""
                                            onChange={(e) => setFirstNameVal(e.currentTarget.value)} // Setting the first name state
                                        />
                                    </div>
                                    <div className="inputChilds">
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder='Last Name'
                                            className='lastName'
                                            id=""
                                            onChange={(e) => setLastNameVal(e.currentTarget.value)} // Setting the last name state
                                        />
                                    </div>
                                    <div className="inputChilds">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder='Enter Email Address'
                                            className='email'
                                            id=""
                                            onChange={(e) => setEmailVal(e.currentTarget.value)} // Setting the email state
                                        />
                                    </div>
                                    <div className="inputChilds">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder='Password'
                                            className='password'
                                            id=""
                                            onChange={(e) => setPasswordVal(e.currentTarget.value)} // Setting the password state
                                        />
                                    </div>
                                    <div className="inputChilds">
                                        <input
                                            type="password"
                                            name="cPassword"
                                            placeholder='Confirm Password'
                                            id=""
                                            className='cPassword'
                                            onChange={(e) => setcPasswordVal(e.currentTarget.value)} // Setting the confirmed password state
                                        />
                                    </div>
                                    <p>By clicking Agree & Join, you agree to the Hiring Mine User Agreement, Privacy Policy, and Cookie Policy.</p>
                                    <button className="signupButton" onClick={signupHandler}>Agree & Join</button>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                    <p className='haveAccount'>Already on Hiring Mine? <Link to="/login" style={{ textDecoration: "none", color: "#6851FF" }}>Login</Link></p>
                </Box>
            </Container>
        </div>
    )
}

export default Signup;
