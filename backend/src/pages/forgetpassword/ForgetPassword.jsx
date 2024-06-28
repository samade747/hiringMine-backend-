// Importing necessary components and libraries
import { Box, Container, Grid } from '@mui/material'; // Importing Box, Container, and Grid components from Material-UI
import { ToastContainer, toast } from "react-toastify"; // Importing ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing react-toastify CSS
import './forgetpassword.css'; // Importing CSS for ForgetPassword component
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation
import { useState } from 'react'; // Importing useState hook from React
import Button from '@mui/material/Button'; // Importing Button component from Material-UI
import Typography from '@mui/material/Typography'; // Importing Typography component from Material-UI
import Modal from '@mui/material/Modal'; // Importing Modal component from Material-UI
import axios from 'axios'; // Importing axios for making HTTP requests
import { serverUrl } from '../../utils/appConstant'; // Importing serverUrl from app constants

// Defining style for the Modal component
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #7b7979',
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
};

// Defining the ForgetPassword component
const ForgetPassword = () => {
    // State to manage the open/close state of the modal
    const [open, setOpen] = useState(false);
    // Function to open the modal
    const handleOpen = () => setOpen(true);
    // Function to close the modal
    const handleClose = () => setOpen(false);
    // State to manage the email input value
    const [emailVal, setEmailVal] = useState("");

    // Handler function for the forget password action
    const forgetPasswordHandler = async (e) => {
        e.preventDefault(); // Preventing the default form submission behavior
        try {
            // Sending POST request to the server for forgot password
            const res = await axios.post(`${serverUrl}/api/auth/forgotPassword`, {
                email: emailVal
            });
            if (res.data.status) { // If request is successful
                handleOpen(); // Open the modal
                localStorage.setItem("dummyToken", res.data.token); // Store the token in localStorage
            }
        } catch (error) { // Handling errors
            let message = error?.response?.data.message; // Extracting error message
            console.log(message); // Logging the error message
            // Displaying error toast notification
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    // Returning the JSX for ForgetPassword component
    return (
        <div>
            {/* ToastContainer for displaying toast notifications */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div>
                {/* Modal component for email verification request */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Email Verification Request
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            We have sent a verification request to <span className='userEmail'>{emailVal}</span>. Please check your email and click on the link to verify.
                        </Typography>
                    </Box>
                </Modal>
            </div>
            {/* Container for the forget password form */}
            <Container className='loginContainer'>
                <Box>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"}>
                        <Grid item xs={12} sm={12} md={12} lg={12} order={{ xs: 4, sm: 4, md: 4 }} className="forgetGrid">
                            <div className='forgetPassword'>
                                <h4 className='forgetTitle'>FORGET PASSWORD</h4>
                                <form className="inputWrappers">
                                    <div className="inputChilds">
                                        {/* Email input field */}
                                        <input type="email" name="email" placeholder='Enter Email Address' className='email' id="" onChange={(e) => setEmailVal((e.currentTarget.value))} />
                                    </div>
                                    {/* Forget Password button */}
                                    <button className="signupButton" onClick={forgetPasswordHandler}>Forget Password</button>
                                </form>
                                <div style={{ textAlign: "end", margin: "10px 0" }}>
                                    {/* Link to Login page */}
                                    <Link to="/login" style={{ textDecoration: "none", color: "grey" }}>
                                        Go to
                                        <span style={{ color: "rgb(104, 81, 255)" }} className='loginLinkInForgetPassword'> Login?</span>
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

// Exporting the ForgetPassword component as default export
export default ForgetPassword;
