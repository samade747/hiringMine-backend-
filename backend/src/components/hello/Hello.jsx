import { Box, Container, Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LOGO from "../../assets/HMLogo.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './hello.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

import Logo from "../../assets/HMLogo.png"
import { Children, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getbgThemeSuccess } from '../../redux/themeSlice';
import Dropdown from '../dropdown/Dropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getJobsSearchFailure, getJobsSearchPending, getJobsSearchSuccess } from '../../redux/jobsSearch';
import { getKeyWordSuccess } from '../../redux/keywordSlice';
import { serverUrl } from '../../utils/appConstant';



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));
const BootstrapTooltip = styled(({ className, ...props }) => (

  <Tooltip  arrow classes={{ popper: className }} {...props}/>
   

))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    cursor: "pointer",
  },
}

));

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

//Dropdown list
const MenuProps = {
  PaperProps: {
    style: {
      width: 200,
    },
  },
};

const names1 = [
  'Development',
  'Marketing & Sales',
  'Art & Illustration Tucker',
];
const names2 = [
  'Anytime',
  '1 months',
  'Last 7 days',
  'Past 24 hours'
];
const names3 = [
  'Full-Time',
  'Part-Time',
  'Contract',
];
const names4 = [
  'Mid-Level',
  'Senior-Level',
  'Associate',
  'Internship',
  'Fresher'

];
const names5 = [
  'Onsite',
  'Remote',
  'Hybrid',
];
const names6 = [
  '0 - 20,000 PKR',
  '20,000 - 50,000 PKR',
  '50,000 - 100,000 PKR',
  '100,000 - 200,000 PKR',
  '200,000 - 300,000 PKR',
  '300,000 - 500,000 PKR',
  '500,000 + PKR',

];
const names7 = [
  '0-1 Experience',
  '1-2 Experience',
  '2-3 Experience',
  '3-4 Experience',
  '4-5 Experience',

];
function Hello({ jobs, setKeywordName }) {
  const isTheme = localStorage.getItem("theme");
  const location = useLocation();
  const pagePath = location.pathname;
  console.log(pagePath);
  console.log("theme he kia",isTheme);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const { bgTheme } = useSelector(state => state.bgTheme);
  const { keyword } = useSelector(state => state.keyword);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [searchDesc, setSearchDesc] = useState("");

  //Typography
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  const handleClose = () => setOpen(false);
  const switchBgColor = () => {
    dispatch(getbgThemeSuccess(!bgTheme))
    localStorage.setItem("theme", !bgTheme)
    console.log(bgTheme);
    //  setBgColor(!bgColor)
    //  document.body.classList.toggle('dark-mode')
    //  const navbar = document.querySelector('.MuiPaper-root');
    // if (navbar) {
    //   navbar.classList.toggle('dark-navbar');
    // }
  }
  const jobsHandler = () => {
    navigate("/jobsearch")
  }


  // Dropdown 

  const [personName1, setPersonName1] = useState([]);
  const [personName2, setPersonName2] = useState([]);
  const [personName3, setPersonName3] = useState([]);
  const [personName4, setPersonName4] = useState([]);
  const [personName5, setPersonName5] = useState([]);
  const [personName6, setPersonName6] = useState([]);
  const [personName7, setPersonName7] = useState([]);

  const [isTrue1, setIsTrue1] = useState(false);
  const [isTrue2, setIsTrue2] = useState(false);
  const [isTrue3, setIsTrue3] = useState(false);
  const [isTrue4, setIsTrue4] = useState(false);
  const [isTrue5, setIsTrue5] = useState(false);
  const [isTrue6, setIsTrue6] = useState(false);
  const [isTrue7, setIsTrue7] = useState(false);


  const dropdownHandle1 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName1(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler1 = (e) => {
    setIsTrue1(true)
    e.stopPropagation()
  }

  const dropdownHandle2 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler2 = (e) => {
    setIsTrue2(true)
    e.stopPropagation()
  }
  const dropdownHandle3 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName3(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler3 = (e) => {
    setIsTrue3(true)
    e.stopPropagation()
  }
  const dropdownHandle4 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName4(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler4 = (e) => {
    setIsTrue4(true)
    e.stopPropagation()
  }
  const dropdownHandle5 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName5(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler5 = (e) => {
    setIsTrue5(true)
    e.stopPropagation()
  }
  const dropdownHandle6 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName6(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler6 = (e) => {
    setIsTrue6(true)
    e.stopPropagation()
  }
  const dropdownHandle7 = (event) => {
    event.stopPropagation(false)
    const {
      target: { value },
    } = event;
    setPersonName7(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const clickHandler7 = (e) => {
    setIsTrue7(true)
    e.stopPropagation()
  }

  const clearDropdownHandler1 = (e) => {
    e.stopPropagation()
    setIsTrue1(false)
    setPersonName1([])
  }
  const clearDropdownHandler2 = (e) => {
    e.stopPropagation()
    setIsTrue2(false)
    setPersonName2([])
  }
  const clearDropdownHandler3 = (e) => {
    e.stopPropagation()
    setIsTrue3(false)
    setPersonName3([])
  }
  const clearDropdownHandler4 = (e) => {
    e.stopPropagation()
    setIsTrue4(false)
    setPersonName4([])
  }
  const clearDropdownHandler5 = (e) => {
    e.stopPropagation()
    setIsTrue5(false)
    setPersonName5([])
  }
  const clearDropdownHandler6 = (e) => {
    e.stopPropagation()
    setIsTrue6(false)
    setPersonName6([])
  }
  const clearDropdownHandler7 = (e) => {
    e.stopPropagation()
    setIsTrue7(false)
    setPersonName7([])
  }
  //Search Jobs  According to categories vise
  const jobSearchHandler = async (e) => {
    e.preventDefault();
    // dispatch(getJobsSearchPending())
    const sQuery = searchDesc?.split(" ")[0]
    console.log("hello");
    // console.log(sQuery);
    try {
      console.log(personName2,
        personName3,
        personName4,
        personName5,
        personName6,
        personName7);
      console.log(personName6);
      console.log(personName4);
      const experience = personName7?.map((filterValue, i) => i > 0 ? "" : filterValue).filter(val => val !== "")
      const cvrtExperience = experience.length > 0 && experience[0]?.split(" ")[0]

      const salary = personName6?.map((single, i) => i > 0 ? "" : single).filter(val => val !== "");
      const cvrtSalary = salary.length > 0 && salary[0]?.split("-").map((val) => val.trim().replace(/,/g, '').replace(/PKR/g, '').trim());
      const pricetarget = cvrtSalary.length === 2 ? `${cvrtSalary[0]}-${cvrtSalary[1]}` : "";
      console.log(pricetarget);
      const jobFeaseability = personName5?.map((fb, index) => index > 0 ? "" : fb).filter((fil) => fil !== "")
      console.log(jobFeaseability);

      try {
        const response = await axios.get(`${serverUrl}/api/categories/filteration/all?price=${pricetarget}&type=${personName3[0] || ""}&keyword=${sQuery || ""}&level=${personName4[0] || ""}&jobfeaseability=&experience=${cvrtExperience || ""}&categories=${personName1[0] || ""}`);
        console.log("response", response.data);
        // const res = await axios.get(`${serverUrl}/api/jobs/all?limit=10&pageNo=1&keyWord=${sQuery}&category=`)
        // console.log("Running",res);

        dispatch(getJobsSearchSuccess(response.data))
        const searchInfo = {
          price: pricetarget,
          jobType: personName3[0] || "",
          keyword: sQuery || "",
          level: personName4[0] || "",
          experience: cvrtExperience || "",
          categories: personName1[0] || "",
        }
        dispatch(getKeyWordSuccess(searchInfo))
        setKeywordName(sQuery);
        navigate(`/jobsearch?keyword=${sQuery}&limit=10`)
        // setSearchDesc("")
        console.log(sQuery);
        setSearchDesc("")
      } catch (error) {
        console.log(error);
        dispatch(getJobsSearchFailure(error.response.data.message))
      }
    } catch (error) {

      const message = error.response.data.message
      // dispatch(getJobsSearchFailure(message))
      console.log(error);
    }


  }
  //Show Result Handlers

  const showResultHandler1 = async () => {
    navigate(`/jobsearch?keyword=&limit=10$categories=${personName1[0].toLowerCase()}`)
    const searchInfo = {
      categories: personName1[0] || ""
    }
    
    dispatch(getKeyWordSuccess(searchInfo))
    
    console.log(personName1[0]);
  }
  const jobTypeHandler = async()=>{
    navigate(`/jobsearch?keyword=&limit=10&type=${personName3[0].toLowerCase()}`)
    const searchInfo = {
      jobType: personName3[0] || ""
    }
    
    dispatch(getKeyWordSuccess(searchInfo))
    
    console.log(personName3[0]);
  }
  //Seniority Level Handler
  const seniorityLevelHandler = ()=>{
    navigate(`/jobsearch?keyword=&limit=10&level=${personName4[0].toLowerCase()}`)
    const searchInfo = {
      level: personName4[0] || ""
    }
    
    dispatch(getKeyWordSuccess(searchInfo))
    
    console.log(personName4[0]);

  }

  // Job Place Info Handler
  const jobPlaceInfoHandler = ()=>{
    navigate(`/jobsearch?keyword=&limit=10&jobfeaseability=${personName5[0].toLowerCase()}`)
    const searchInfo = {
      jobFeseability: personName5[0] || ""
    }
    
    dispatch(getKeyWordSuccess(searchInfo))
    
    console.log(personName5[0]);

  }
  //Salary Range Handler
  const salaryRangeSingleHandler = ()=>{
    console.log("Hello");
    const salary = personName6?.map((single, i) => i > 0 ? "" : single).filter(val => val !== "");
      const cvrtSalary = salary.length > 0 && salary[0]?.split("-").map((val) => val.trim().replace(/,/g, '').replace(/PKR/g, '').trim());
      const pricetarget = cvrtSalary.length === 2 ? `${cvrtSalary[0]}-${cvrtSalary[1]}` : "";
      console.log(pricetarget);
      navigate(`/jobsearch?keyword=&limit=10&price=${pricetarget}`)
      const searchInfo = {
        price: pricetarget || ""
      }
      
      dispatch(getKeyWordSuccess(searchInfo))
  }

  //Experience Handler
  const experienceBaseHandler = ()=>{
    console.log("Running");
    const experience = personName7?.map((filterValue, i) => i > 0 ? "" : filterValue).filter(val => val !== "")
    const cvrtExperience = experience.length > 0 && experience[0]?.split(" ")[0];
    console.log(cvrtExperience);
    navigate(`/jobsearch?keyword=&limit=10&experience=${cvrtExperience}`)
      const searchInfo = {
        experience: cvrtExperience || ""
      }
      
      dispatch(getKeyWordSuccess(searchInfo))
  }
  //Reset Button Handler
  const resetHandler = (e)=>{
    e.preventDefault()
    setPersonName1([])
setPersonName2([])
setPersonName3([])
setPersonName4([])
setPersonName5([])
setPersonName6([])
setPersonName7([])
setIsTrue1(false)
setIsTrue2(false)
setIsTrue3(false)
setIsTrue4(false)
setIsTrue5(false)
setIsTrue6(false)
setIsTrue7(false)

  }
  return (
    <>
      <div className={bgTheme ? "navbarPar1" : "navbarPar2"} >

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"


        >
          <Box sx={style2} className={bgTheme && "sideBar"}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img className="modalLogo" src={LOGO} alt="" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ul className="sliderUlPar">
                <li className="hiddenList">About Us</li>
                <li className="hiddenList">People</li>
                <Link to="/jobsearch" style={{textDecoration:"none",color:"inherit",listStyle:"none"}}><li className={bgTheme ? "bgWhite" : "bgBlack"} onClick={jobsHandler}>Jobs</li></Link>
                <Link to="/login" style={{textDecoration:"none",color:"inherit",listStyle:"none"}}><li className="hiddenList">Login</li></Link>
                <li style={{ color: "#3728B7" }}>Employee / Post Job</li>
                <li></li>
              </ul>
            </Typography>
          </Box>
        </Modal>
      </div>
      <Container className={bgTheme ? "navbarContainer1" : jobs ? 'navbarContainer2' : 'navbarContainer'}>
        <Box>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid item xs={8} sm={3} md={2} lg={2} order={{ xs: 1, sm: 1, md: 1 }} style={{display:"flex",alignItems:"center"}} className={jobs && 'middleNavbarGrid'}>
              <Item className='logoImg'>
                <Link to="/" style={{display:"flex",alignItems:"center"}}>
                  <img className={pagePath === "/jobsearch" ?'logo2':"logo"} src={Logo} alt="" />
                </Link>
              </Item>
            </Grid>
            {jobs ? <Grid item xs={12} sm={8} md={8} lg={8} order={{ xs: 3, sm: 2, md: 2 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className={jobs && 'middleNavbarGrid'}>
              <div className="formWrapper">
                <form className='jobsSearchBar'>
                  <button className={bgTheme ? 'jobbtn3' : "jobbtn1"}>Jobs</button>
                  <input className={bgTheme ? 'jobsInput1' : "jobsInput2"} type="text" value={searchDesc} placeholder='Search Job titles or companies' onChange={(e) => setSearchDesc(e.target.value)} />
                  <button className='jobbtn2' onClick={jobSearchHandler}><img src="https://hiringmine.com/assets/SearchIcon-5b485364.svg" alt="" /></button>
                </form>
              </div>

            </Grid> : <Grid item xs={12} sm={8} md={8} lg={8} order={{ xs: 3, sm: 2, md: 2 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ul className='navbarList' style={{ display: 'flex', alignItems: "end" }}>
                  <BootstrapTooltip className="navbarItem" title="Coming soon" >
                    About Us
                  </BootstrapTooltip>
                  <BootstrapTooltip className="navbarItem" title="Coming soon">
                    People
                  </BootstrapTooltip>
                  <li className={bgTheme ? "hello2" : "hello"} onClick={jobsHandler}>Jobs</li>
                  <Link to="/login" style={{textDecoration:"none",color:"inherit"}}><BootstrapTooltip className="navbarItem" >
                    Login
                  </BootstrapTooltip>
                  </Link>
                  <Link to="/signup" style={{textDecoration:"none",color:"inherit"}}>
                  <BootstrapTooltip className="navbarItem">
                    Join Now
                  </BootstrapTooltip>
                  </Link>
                  <li className="listEmp">Employee / Post Job</li>

                </ul>
              </Item>
            </Grid>}
            <Grid item xs={4} sm={1} md={2} lg={2} order={{ xs: 2, sm: 3, md: 3 }} className={jobs && 'middleNavbarGrid'}>
              <Item style={{ display: "flex", justifyContent: "end" }}>
                <Tooltip title="Open settings">
                  <>
                    {!jobs && <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpen}
                      color="inherit"
                      className={bgTheme ? "menuIcon1" : "menuIcon"}
                    >
                      <MenuIcon />
                    </IconButton>}

                    <FormControlLabel style={{ width: "50px" }}
                      control={<MaterialUISwitch checked={isTheme ? bgTheme : false} onClick={switchBgColor} />}

                    />

                  </>
                </Tooltip>
              </Item>
            </Grid>
            {jobs && <Grid item xs={12} sm={12} md={12} lg={12} order={{ xs: 4, sm: 4, md: 4 }} className={jobs && 'middleNavbarGrid4'}>
              <div className="outerWrapper">
                <div className="dropdownWrapper">
                  <div className="filterDropdown">
                    <div >
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>Category</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName1}
                          className='selectOptionsHey'
                          onChange={dropdownHandle1}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names1.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName1.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler1(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn' onClick={showResultHandler1}>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>Date Posted</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName2}
                          className='selectOptionsHey'
                          onChange={dropdownHandle2}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names2.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName2.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler2(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn'>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>Job Type</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName3}
                          className='selectOptionsHey'
                          onChange={dropdownHandle3}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names3.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName3.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler3(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn' onClick={jobTypeHandler}>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>Seniority Level</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName4}
                          className='selectOptionsHey'
                          onChange={dropdownHandle4}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names4.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName4.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler4(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn' onClick={seniorityLevelHandler}>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>On-Site/Remote</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName5}
                          className='selectOptionsHey'
                          onChange={dropdownHandle5}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names5.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName5.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler5(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn' onClick={jobPlaceInfoHandler}>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>Salary Range</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName6}
                          className='selectOptionsHey'
                          onChange={dropdownHandle6}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names6.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName6.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler6(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn' onClick={salaryRangeSingleHandler}>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40 }}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ width: '100%' }} ><i>Experience</i></InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName7}
                          className='selectOptionsHey'
                          onChange={dropdownHandle7}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names7.map((name) => (
                            <MenuItem key={name} value={name} className="customMenuItem">
                              <Checkbox checked={personName7.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                          <div className="bottomdropdown">
                            <p onClick={(e) => clearDropdownHandler7(e)}>Clear</p>
                            <Button variant="contained" className='resultBtn' onClick={experienceBaseHandler}>
                              Show results
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 150, height: 40}}>
                        <div style={{ display: 'flex', alignItems: 'center',gap:"10px",marginTop:"8px" }}>
                          <span style={{fontSize:"20px",color: "rgb(110, 109, 109)"}}>||</span>
                          <button className='resetBtn' onClick={resetHandler}>Reset</button>
                        </div>
                      </FormControl>
                      
                    </div>
                    
                  </div>

                </div>
              </div>
            </Grid>}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Hello