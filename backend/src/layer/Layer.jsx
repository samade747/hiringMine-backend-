// Importing necessary components and modules from Material-UI and React
import { Container, Grid } from '@mui/material';
import React from 'react';
import './layer.css'; // Importing CSS file for styling
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Importing images used in the cards
import LayerLeftImg from "../assets/Frame-1.png";
import LayerRightImg from "../assets/Frame-2.png";
// Importing useSelector hook from react-redux to access Redux state
import { useSelector } from 'react-redux';

// Defining a functional component named Layer
function Layer() {
    // Using useSelector hook to access the bgTheme state from Redux store
    const { bgTheme } = useSelector(state => state.bgTheme);
    console.log("bgTheme", bgTheme); // Logging the bgTheme value

    // Returning the JSX for rendering the component
    return (
        // Container component for the main layout
        <Container className='comingSoonContainer'>
            {/* Grid component to layout the content in a grid format */}
            <Grid 
                container 
                rowSpacing={3} 
                columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                marginTop={"20px"} 
                display={"flex"} 
                alignItems={"center"}
            >
                {/* Grid item for the first card */}
                <Grid 
                    item 
                    xs={5} 
                    sm={5} 
                    md={5} 
                    lg={5} 
                    xl={4} 
                    style={{ cursor: "pointer" }} 
                    className='layerCard'
                >
                    {/* Card component to display the first card */}
                    <Card sx={{ maxWidth: 450 }} className='cardItems'>
                        {/* CardMedia component to display the image */}
                        <CardMedia
                            sx={{ height: 270 }}
                            image={LayerLeftImg}
                            title="green iguana"
                        />
                        {/* CardContent component to display the content */}
                        <CardContent>
                            {/* Typography component for the title */}
                            <Typography 
                                gutterBottom  
                                component="div" 
                                className={bgTheme ? "layerTitle2" : 'layerTitle'}
                            >
                                <h3>Connect With People <span>Who Can Help</span></h3>
                            </Typography>
                        </CardContent>
                        {/* CardActions component for the button */}
                        <CardActions>
                            <Button variant="outlined" className='cmBtn'>Coming Soon</Button>
                        </CardActions>
                    </Card>
                </Grid>
                
                {/* Grid item for the middle border */}
                <Grid 
                    item 
                    xs={2} 
                    sm={2} 
                    md={2} 
                    lg={2} 
                    xl={4} 
                    style={{ cursor: "pointer", paddingLeft: "0" }}
                >
                    {/* Div elements for styling the middle border */}
                    <div className='middleBorder1'>
                        <div className='middleBorder'>
                            <div className="middleBorder3"></div>
                        </div>
                    </div>
                </Grid>
                
                {/* Grid item for the second card */}
                <Grid 
                    item 
                    xs={5} 
                    sm={5} 
                    md={5} 
                    lg={5} 
                    xl={4} 
                    style={{ cursor: "pointer" }} 
                    className='layerCard'
                >
                    {/* Card component to display the second card */}
                    <Card sx={{ maxWidth: 450 }} className='cardItems'>
                        {/* CardMedia component to display the image */}
                        <CardMedia
                            sx={{ height: 270 }}
                            image={LayerRightImg}
                            title="green iguana"
                        />
                        {/* CardContent component to display the content */}
                        <CardContent>
                            {/* Typography component for the title */}
                            <Typography 
                                gutterBottom  
                                component="div" 
                                className={bgTheme ? "layerTitle2" : 'layerTitle'}
                            >
                                <h3><span>Post Your Job </span>For People To See</h3>
                            </Typography>
                        </CardContent>
                        {/* CardActions component for the button */}
                        <CardActions>
                            <Button variant="outlined" className='cmBtn'>Coming Soon</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

// Exporting the Layer component as the default export
export default Layer;
