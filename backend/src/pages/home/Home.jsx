// Importing necessary components and assets
import Header from '../../components/header/Header'; // Importing Header component
import Navbar from '../../components/navbar/Navbar'; // Importing Navbar component
import './home.css'; // Importing CSS for Home component
import BG_IMG from "../../assets/hiringMineBg.png"; // Importing background image
import GetJobs from '../../components/getJobs/GetJobs'; // Importing GetJobs component
import DreamJobs from '../../components/dreamJobs/DreamJobs'; // Importing DreamJobs component
import LatestJobs from '../../components/latestJobs/LatestJobs'; // Importing LatestJobs component
import Layer from '../../layer/Layer'; // Importing Layer component
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import Footer from '../../components/footer/Footer'; // Importing Footer component
import Hello from '../../components/hello/Hello'; // Importing Hello component

// Defining the Home component
function Home() {
  // Getting the theme from localStorage
  const isTheme = localStorage.getItem("theme");
  // Getting the bgTheme state from Redux store
  const { bgTheme } = useSelector(state => state.bgTheme);
  // Logging the bgTheme to the console for debugging
  console.log("isTheme", bgTheme);

  // Returning the JSX for Home component
  return (
    <>
      {/* Main container with dynamic class based on bgTheme */}
      <div className={bgTheme ? "home1" : "home2"}>
        {/* Rendering Hello component */}
        <Hello />
        {/* Inner container with padding */}
        <div style={{ padding: "0 10px" }}>
          {/* Rendering Header component */}
          <Header />
          {/* Background image container */}
          <div className='bgImage'>
            {/* Rendering background image */}
            <img className='img' src={BG_IMG} alt="" />
          </div>
          {/* Rendering GetJobs component */}
          <GetJobs />
          {/* Rendering DreamJobs component */}
          <DreamJobs />
          {/* Rendering LatestJobs component */}
          <LatestJobs />
          {/* Rendering Layer component */}
          <Layer />
        </div>
        {/* Footer container */}
        <div className='footerParentDev'>
          {/* Rendering Footer component */}
          <Footer />
        </div>
      </div>
    </>
  );
}

// Exporting the Home component as default export
export default Home;
