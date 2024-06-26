import { Container } from '@mui/material';
import "./getJobs.css";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import { useSelector } from 'react-redux';

// Styled component for the Paper element
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function GetJobs() {
  // Getting bgTheme from the Redux store
  const { bgTheme } = useSelector(state => state.bgTheme);

  return (
    <Container className='jobsCon'>
      {/* Title section */}
      <div className={bgTheme ? "title1" : "title"}>
        <h3>Get Hired In 4 <span>Quick Easy Steps (Coming Soon)</span></h3>
        <p>The quickest and the most effective way to get hired by the top firm.</p>
      </div>
      {/* Main content section */}
      <Box sx={{ width: '100%', marginTop: "60px" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* Grid item for the first step */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item className={bgTheme ? "cardsItem1" : 'cardsItem2'}>
              <div className='jobsCard'>
                <PortraitOutlinedIcon className='jobsUserIcon' />
                <p className='jobsCardp-1'>Create an Account</p>
                <p className={bgTheme ? "jobscardp-3" : 'jobscardp-2'}>
                  Join our vibrant community. Create your account and unlock boundless opportunities.
                </p>
              </div>
            </Item>
          </Grid>
          {/* Grid item for the second step */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item className={bgTheme ? "cardsItem1" : 'cardsItem2'}>
              <div className='jobsCard'>
                <SearchOutlinedIcon className='jobsUserIcon' />
                <p className='jobsCardp-1'>Search a Job</p>
                <p className={bgTheme ? "jobscardp-3" : 'jobscardp-2'}>
                  Discover your ideal job. Our intuitive search feature makes job hunting effortless.
                </p>
              </div>
            </Item>
          </Grid>
          {/* Grid item for the third step */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item className={bgTheme ? "cardsItem1" : 'cardsItem2'}>
              <div className='jobsCard'>
                <UploadFileOutlinedIcon className='jobsUserIcon' />
                <p className='jobsCardp-1'>Get a Job</p>
                <p className={bgTheme ? "jobscardp-3" : 'jobscardp-2'}>
                  Achieve your career goals. Apply for jobs and embark on your next adventure.
                </p>
              </div>
            </Item>
          </Grid>
          {/* Grid item for the fourth step */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item className={bgTheme ? "cardsItem1" : 'cardsItem2'}>
              <div className='jobsCard'>
                <CardTravelOutlinedIcon className='jobsUserIcon' />
                <p className='jobsCardp-1'>Get a Job</p>
                <p className={bgTheme ? "jobscardp-3" : 'jobscardp-2'}>
                  Achieve your career goals. Apply for jobs and embark on your next adventure.
                </p>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default GetJobs;
