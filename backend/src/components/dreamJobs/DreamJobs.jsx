// Importing necessary components and libraries from MUI and other sources
import { CircularProgress, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import './dreamJobs.css'; // Importing custom CSS for styling
import Job_Image from "../../assets/DreamJob.png"; // Importing image asset
import useFetch from '../../hook/useFetch'; // Custom hook for fetching data
import { useSelector } from 'react-redux'; // Hook to access Redux store
import { serverUrl } from '../../utils/appConstant'; // Server URL constant
import axios from 'axios'; // Library for making HTTP requests
import { Link, useNavigate } from 'react-router-dom'; // Navigation hooks from React Router

// Styling the Paper component from MUI using the styled function
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', // Background color based on theme
  ...theme.typography.body2, // Applying typography settings
  padding: theme.spacing(1), // Adding padding
  textAlign: 'center', // Center aligning text
  color: theme.palette.text.secondary, // Setting text color
}));

function DreamJobs() {
  // Accessing categories, loading state, and error state from Redux store
  const { categories, loading, error } = useSelector(state => state.categories);
  // Accessing background theme state from Redux store
  const { bgTheme } = useSelector(state => state.bgTheme);
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Fetching categories data from server
  const data = useFetch(`${serverUrl}/api/categories/all`, "categories");
  console.log("cat", categories); // Logging categories data

  // Handler to navigate to the specific jobs page
  const specificJobsHandler = async () => {
    navigate("/categories");
  };

  // Handler to navigate to the job search page
  const navigateJobSearchHandler = () => {
    navigate("/categories");
  };

  return (
    // Container component to center and constrain content
    <Container className={bgTheme ? "header1" : 'header'}>
      {/* Header section with title and description */}
      <Box className={bgTheme ? "title1" : "title"}>
        <h3>Find Your Dream Job <span>Super Fast Ever.</span></h3>
        <p className={bgTheme ? "dreamJobsPara1" : 'dreamJobsPara'}>
          We are here to help jobseekers connect with organizers and companies. 
          We provide the best opportunities to professional people.
        </p>
      </Box>
      
      {/* Image section */}
      <Box className='imgPar'>
        <img src={Job_Image} alt="JobsImg" />
      </Box>
      
      {/* Subheader section */}
      <Box className={bgTheme ? "title1" : "title"} style={{ marginTop: "50px" }}>
        <h3><span>Countless Career Options </span>Are Waiting For You To Explore</h3>
      </Box>
      
      {/* Job categories section */}
      <Box className="jobCategories">
        <div>
          {/* Grid container for displaying job categories */}
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {loading ? 
              // Display loader if data is still loading
              <div className='loaderDreamJob'>
                <CircularProgress />
              </div> :
              // Mapping through categories and displaying them
              categories?.slice(0, 8)?.map((data) => (
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={data._id} style={{ cursor: "pointer" }} onClick={specificJobsHandler}>
                  <Item className={bgTheme ? "cards1" : 'cards'}>
                    <div className={bgTheme ? "jobsCard1" : 'jobsCard'}>
                      <img className='jobsUserIcon' src="https://hiringmine.com/assets/ArtIcon-abc0c65a.svg" alt="" />
                      <p className='jobsCardp-1'>{data.name.toUpperCase()}</p>
                      <p className='jobscardp-2'>{data.jobsCount} Jobs</p>
                    </div>
                  </Item>
                </Grid>
              ))
            }
          </Grid>
        </div>
        
        {/* Button to view all job categories */}
        <div className='viewAllBtn' onClick={navigateJobSearchHandler}>
          <p>View All <span><ArrowRightAltOutlinedIcon /></span></p>
        </div>
      </Box>
    </Container>
  );
}

// Exporting the component to be used in other parts of the application
export default DreamJobs;
