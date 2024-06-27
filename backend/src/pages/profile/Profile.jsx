// Importing necessary components and modules from MUI, React, react-toastify, react-router-dom
import { Box, Container, Modal, Typography } from '@mui/material';
import './profile.css'; // Importing the CSS for the profile component
import LOgo from "../../assets/HMLogo.png"; // Importing the logo image
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'; // Importing the menu icon from Material UI
import LOGO from "../../assets/HMLogo.png"; // Importing the same logo image again (consider using a single import)
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; // Importing the logout icon from Material UI
import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for redirection
import { ToastContainer, toast } from "react-toastify"; // Importing toast container and toast function for notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for react-toastify

// Defining custom styles for the Modal component
const style2 = {
  position: 'absolute',
  left: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '50%', // Adjusting the width as needed
  maxWidth: '300px', // Setting a max-width
  height: "100%",
  maxHeight: '100vh', // Setting a max-height
  overflow: 'auto', // Adding overflow if content exceeds the height
  bgcolor: 'background.paper', // Using theme colors for background
  boxShadow: 24, // Adding box shadow for better visibility
  p: 4, // Adding padding
};

// Profile component definition
const Profile = () => {
  const navigate = useNavigate(); // Defining the navigate function for redirection
  const [open, setOpen] = useState(false); // State for modal open/close
  const handleOpen = () => setOpen(true); // Function to open the modal
  const handleClose = () => setOpen(false); // Function to close the modal

  // Function to handle logout
  const logOutHandler = () => {
    console.log("Running");
    // Displaying a success toast notification
    toast.success('LogOut Successful!', {
      position: "top-right", // Positioning the toast at the top-right
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: false, // Showing the progress bar
      closeOnClick: true, // Allowing close on click
      pauseOnHover: true, // Pausing on hover
      draggable: true, // Allowing draggable
      progress: undefined, // Default progress
      theme: "light", // Setting the theme to light
    });
    // Removing the token from local storage
    localStorage.removeItem("dummyToken");
    // Closing the modal after a short delay
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  // Effect hook to check if user is logged in
  useEffect(() => {
    function isUser() {
      let dummyToken = localStorage.getItem("dummyToken"); // Getting the token from local storage
      if (!dummyToken) {
        navigate("/login"); // Redirecting to login if no token found
      }
    }
    isUser(); // Calling the function to check user authentication
  }, [open, navigate]); // Dependencies for the useEffect

  // Rendering the profile component
  return (
    <>
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
      {/* Modal component for logout */}
      <Modal
        open={open} // Controlling the modal open/close state
        onClose={handleClose} // Function to close the modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ border: "none", outline: "none" }}
      >
        {/* Box component inside the modal for content */}
        <Box sx={style2} >
          {/* Typography component for displaying logo */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img className="profileLogo" src={LOGO} alt="" />
          </Typography>
          {/* Typography component for logout action */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='logoutParent' onClick={logOutHandler}>
              <LogoutOutlinedIcon />
              LogOut
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* Main profile layout */}
      <div className='profilePar'>
        <Container className='profile'>
          <Box>
            {/* Header section of the profile page */}
            <div className="headerProfile">
              <div className="logoProfile">
                <img src={LOgo} alt="" />
              </div>
              <div className="itemsProfile">
                <input type="text" />
                <button>Search</button>
              </div>
              <div className="logoutProfile">
                <MenuOutlinedIcon fontSize='large' onClick={handleOpen} />
              </div>
            </div>
          </Box>
        </Container>
      </div>
      {/* Placeholder content indicating that the page is under construction */}
      <Container>
        <Box>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h1>Welcome to an Under Constructed Land</h1>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
