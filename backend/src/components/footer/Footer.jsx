import { Box, Container, Grid } from "@mui/material";
import "./footer.css";
import LOGO from "../../assets/Logo2.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Footer() {
  return (
    <>
      <Container className="footer">
        {/* Main container for the footer with padding */}
        <Box style={{ padding: "0 20px" }}>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"}>
            {/* First grid item for logo and social media links */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className="footerRight">
                {/* Company logo */}
                <img src={LOGO} style={{ color: "white" }} alt="HiringMine Logo" />
                {/* Description about the company */}
                <p className="footerRightPara1">HiringMine connects employer and job seekers, where employers are the source of the resources and the job seeker can find and apply for their targeted job.</p>
              </div>
              <p className="footerRightPara">Follow us</p>
              {/* Social media icons */}
              <div className="footerRightIocns">
                <img src="https://hiringmine.com/assets/FacebookIcon-d00bcd86.svg" alt="Facebook Icon" />
                <img src="https://hiringmine.com/assets/WhatsAppIcon-21b9cb15.svg" alt="WhatsApp Icon" />
                <img src="https://hiringmine.com/assets/IstagramIcon-cd882890.svg" alt="Instagram Icon" />
                <img src="https://hiringmine.com/assets/LinkedinIcon-95a0c942.svg" alt="LinkedIn Icon" />
              </div>
            </Grid>
            {/* Second grid item for contact information */}
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <div className="footerLeftInfoPar">
                <div className="footerLeftInfo">
                  <ul>
                    <li>Contact</li>
                  </ul>
                  {/* Email contact link */}
                  <a href="mailto:portal.hiringmine@gmail.com"><EmailOutlinedIcon />portal.hiringmine@gmail.com</a>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
        {/* Bottom section of the footer */}
        <Box>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"10px"}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="footerBottom">
                <p>Privacy Policy</p>
                <p>Copyright Hiringmine 2024. All Rights Reserved</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Footer;
