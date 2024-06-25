// Importing necessary CSS and MUI components
import "./navbar.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LOGO from "../../assets/HMLogo.png";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";
import { getbgThemeSuccess } from "../../redux/themeSlice";
import { Link } from "react-router-dom";

// Modal CSS styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Pages and settings for navigation
const pages = ['About Us', 'People', 'Jobs', "Login", "Join Now", "Employee/PostJobs"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// Custom tooltip styling
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    cursor: "pointer",
  },
}));

// Custom switch for dark/light theme
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Navbar = () => {
  // State to manage background color
  const [bgColor, setBgColor] = useState(false)
  const { bgTheme } = useSelector(state => state.bgTheme);
  const dispatch = useDispatch()
  console.log(bgTheme);

  // State to manage modal open/close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Modal CSS styles
  const style2 = {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50%', // Adjust the width as needed
    maxWidth: '300px', // Set a max-width if necessary
    height: "100%",
    maxHeight: '100vh', // Set a max-height if necessary
    overflow: 'auto', // Add overflow if content exceeds the height
    bgcolor: 'background.paper', // Use theme colors for background
    boxShadow: 24,
    p: 4,
  };

  // States for anchor elements
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Handlers for opening and closing menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Switch background color on toggle
  const switchBgColor = () => {
    dispatch(getbgThemeSuccess(!bgTheme))
    localStorage.setItem("theme", !bgTheme)
    setBgColor(!bgColor)
    document.body.classList.toggle('dark-mode')
    const navbar = document.querySelector('.MuiPaper-root');
    if (navbar) {
      navbar.classList.toggle('dark-navbar');
    }
  }

  return (
    <>
      <div className={bgColor ? "navbarPar1" : "navbarPar2"} >
        {/* Modal for mobile view menu */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img className="modalLogo" src={LOGO} alt="" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ul className="sliderUlPar">
                <li className="hiddenList">About Us</li>
                <li className="hiddenList">People</li>
                <li className={bgColor ? "bgWhite" : "bgBlack"}>Jobs</li>
                <li className="hiddenList">Login</li>
                <li style={{ color: "#3728B7" }}>Employee / Post Job</li>
                <li></li>
              </ul>
            </Typography>
          </Box>
        </Modal>
      </div>
      <>
        {/* AppBar for desktop view */}
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Link to={"/"}><img className="logo" src={LOGO} alt="" /></Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Navigation links */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} style={{ display: "flex", justifyContent: "center" }} className="navbarTitles">
                <ul className='navbarList'>
                  <BootstrapTooltip className="navbarItem" title="Coming soon">
                    About Us
                  </BootstrapTooltip>
                  <BootstrapTooltip className="navbarItem" title="Coming soon">
                    People
                  </BootstrapTooltip>
                  <li className={bgColor ? "hello2" : "hello"}>Jobs</li>
                  <BootstrapTooltip className="navbarItem" title="Coming soon">
                    Login
                  </BootstrapTooltip>
                  <BootstrapTooltip className="navbarItem" title="Coming soon">
                    Join Now
                  </BootstrapTooltip>
                  <li className="listEmp">Employee / Post Job</li>
                </ul>
              </Box>

              {/* User settings and theme switch */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpen}
                    color="inherit"
                  >
                    <MenuIcon className="menuIconHey" />
                  </IconButton>

                  <FormControlLabel
                    control={<MaterialUISwitch onClick={switchBgColor} />}
                  />
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </>
    </>
  );
}

export default Navbar;
