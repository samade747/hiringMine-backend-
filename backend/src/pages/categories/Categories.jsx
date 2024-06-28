// Importing necessary components and libraries
import { Container } from '@mui/material'; // Importing Container component from Material-UI
import "./categories.css"; // Importing CSS for Categories component
import Grid from '@mui/material/Grid'; // Importing Grid component from Material-UI
import Paper from '@mui/material/Paper'; // Importing Paper component from Material-UI
import { styled } from '@mui/material/styles'; // Importing styled function from Material-UI
import Box from '@mui/material/Box'; // Importing Box component from Material-UI
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined'; // Importing PortraitOutlinedIcon from Material-UI icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'; // Importing SearchOutlinedIcon from Material-UI icons
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'; // Importing UploadFileOutlinedIcon from Material-UI icons
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined'; // Importing CardTravelOutlinedIcon from Material-UI icons
import Navbar from '../../components/navbar/Navbar'; // Importing Navbar component
import useFetch from '../../hook/useFetch'; // Importing custom hook useFetch
import HR_LOGO from "../../assets/hRlogo2.png"; // Importing HR logo
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import { serverUrl } from '../../utils/appConstant'; // Importing serverUrl from app constants
import Hello from '../../components/hello/Hello'; // Importing Hello component

// Styling the Paper component using styled function
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Defining the Categories component
function Categories() {
  // Getting categories, loading, and error states from Redux store
  const {categories,loading,error}= useSelector(state=> state.categories);
  // Getting bgTheme state from Redux store
  const {bgTheme} = useSelector(state=> state.bgTheme);
  console.log("cate", categories); // Logging categories to console

  // Fetching categories data using custom hook
  const data = useFetch(`${serverUrl}/api/categories/all`, "categories");
    
  // Returning the JSX for Categories component
  return (
    <>
      {/* Hello component */}
      <div>
        <Hello/>
      </div>
      {/* Container for the categories */}
      <Container className='jobsCon'>
        <div className="title">
          <h3><span>Categories</span></h3>
        </div>
        {/* Box component for layout */}
        <Box sx={{ width: '100%', marginTop:"40px" }}>
          {loading ? ( // If loading is true, show loader
            <div style={{height:"300px"}}>
              <div className='loader'>
                <img className='svgLoader' src="https://hiringmine.com/assets/wave-bd174a8e.gif" alt=""/> {/* Loading GIF */}
                <img className='svgImg2' src={HR_LOGO} alt="" /> {/* HR logo */}
              </div>
            </div>
          ) : ( // If loading is false, show categories
            <>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {categories?.map((data) => ( // Mapping through categories
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={data._id}> {/* Grid item for each category */}
                    <Item className={bgTheme ? "cards1" : 'cards'}>
                      <div className='jobsCard'>
                        <img className='jobsUserIcon' src="https://hiringmine.com/assets/ArtIcon-abc0c65a.svg" alt=""/> {/* Category icon */}
                        <p className='jobsCardp-1'>{data.name}</p> {/* Category name */}
                        <p className={bgTheme ? "jobscardp-3" : 'jobscardp-2'}>{data.jobsCount} Jobs</p> {/* Number of jobs */}
                      </div>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

// Exporting the Categories component as default export
export default Categories;
