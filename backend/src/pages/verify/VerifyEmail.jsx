// Importing necessary hooks and modules from React, MUI, axios, react-toastify, and react-router-dom
import { useEffect, useRef, useState } from 'react';
import './verifyEmail.css';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { serverUrl } from '../../utils/appConstant';
import { useNavigate } from 'react-router-dom';

// VerifyEmail component definition
const VerifyEmail = ({ length = 6 }) => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const [otp, setOtp] = useState(Array(length).fill('')); // State to store the OTP values
  const inputRefs = useRef([]); // Ref to store references to the input fields

  useEffect(() => {
    // Focus on the first input field when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handler for input field changes
  const handleChange = (e, index) => {
    const { value } = e.target;
    // Allowing only alphanumeric characters
    if (value.match(/^[a-zA-Z0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if it exists
      if (index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handler for key down events
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to the previous input field if it exists
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  console.log("otp", otp); // Logging OTP values for debugging

  // Handler for verifying the OTP
  const verifyButtonHandler = async () => {
    const token = localStorage.getItem("dummyToken"); // Getting token from local storage
    console.log(token);
    try {
      const otpValues = otp.join(""); // Joining OTP values into a single string
      console.log("otp", otpValues);
      if (!otpValues) {
        // Showing warning toast if OTP is not entered
        toast.warn("Please enter the OTP before proceeding.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Sending OTP for verification
        const res = await axios.post(`${serverUrl}/api/auth/verifyEmail`, {
          otp: otpValues
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(res);
        if (res.data.status) {
          // Showing success toast and navigating to login page
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          // Showing error toast if verification fails
          toast.error(res.data.message, {
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
      }
    } catch (error) {
      // Showing error toast if request fails
      let message = error?.response?.data.message;
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

  // Handler for requesting a new OTP
  const requestOtpHandler = async () => {
    const token = localStorage.getItem("dummyToken"); // Getting token from local storage
    console.log(token);
    const res = await axios.put(`${serverUrl}/api/auth/user`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("res", res);
    if (res.data.status) {
      // Showing success toast if OTP request is successful
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Showing error toast if OTP request fails
      toast.error(res.data.message, {
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

  // Rendering the VerifyEmail component
  return (
    <div className="verify">
      {/* Toast container for displaying notifications */}
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
        transition="Bounce"
      />
      <ToastContainer />
      {/* Main container for the verify email form */}
      <Container className='verifyContainer'>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={10} sm={6} md={6} lg={6} className='childGrid'>
            <div className="inputContainer">
              <h4>Verify</h4>
              <p>Your code was sent to you via email</p>
              {/* Form for OTP inputs */}
              <form className="otpInputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleChange(e, index)} // Handling input changes
                    onKeyDown={(e) => handleKeyDown(e, index)} // Handling key down events
                    ref={(el) => (inputRefs.current[index] = el)} // Setting input refs
                    maxLength="1" // Limiting input length to 1 character
                  />
                ))}
              </form>
              <button className='verifyBtn' onClick={verifyButtonHandler}>Verify</button>
              <p>Don't receive code? <span className='requestOtp' onClick={requestOtpHandler}>Request again</span></p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default VerifyEmail;
