// Importing necessary modules and components
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import './jobDetail.css'
import Navbar from '../../components/navbar/Navbar'
import Hello from '../../components/hello/Hello'
import LOGO from "../../assets/hRlogo2.png"
import HR_LOGO from "../../assets/hRlogo2.png"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { format } from "timeago.js"
import { useLocation, useNavigate } from 'react-router-dom'
import { getSingleJobSuccess } from '../../redux/singleJobSlice'
import { serverUrl } from '../../utils/appConstant'

// Component for displaying job details
const JobDetail = () => {
  // Setting up Redux dispatch function
  const dispatch = useDispatch()

  // Extracting single job and theme from Redux store
  const { singleJob } = useSelector(state => state.singleJob)
  const { bgTheme } = useSelector(state => state.bgTheme)
  const { jobsSearch, loading, error } = useSelector(state => state.jobsSearch)

  // Extracting job ID from URL path
  const location = useLocation()
  const jobId = location.pathname.split("/")[3]
  console.log("loca", jobId)
  console.log("singleJob", singleJob)

  const [isData, setIsData] = useState(false)
  const navigate = useNavigate()

  console.log('loading', loading)
  const [page, setPage] = useState(0)
  console.log("jobsSearch", jobsSearch.length)
  const [selectedPost, setSelectedPost] = useState(true)

  // Fetching job data from server
  const data = useFetch(`${serverUrl}/api/jobs/all?limit=10&pageNo=1&keyWord=&category=`, "jobsSearch")

  // Adding infinite scroll functionality to fetch more jobs on scroll
  useEffect(() => {
    const handleScroll = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const nextPage = page + 1
        console.log(nextPage)
        setPage((pre) => pre + 1)
      }

      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
    handleScroll()
  }, [])

  // Handler for selecting a single job
  const singleJobHandler = (postId) => {
    console.log("postId", postId)
    const post = jobsSearch.find((post) => post._id === postId)
    dispatch(getSingleJobSuccess(post))
    console.log(post)
    navigate(`/jobsearch/jid/${postId}`)
  }

  // Handler for cancelling single job view
  const cancelHandler = () => {
    navigate("/jobsearch")
  }

  // Rendering the JobDetail component
  return (
    <Container className={bgTheme ? 'jobsContainer1' : "jobsContainer2"}>
      <Box>
        <Hello jobs="jobs" />
      </Box>
      <Box>
        {loading && jobsSearch.length === 0 ? (
          <div className='loader'>
            <img className='svgLoader' src="https://hiringmine.com/assets/wave-bd174a8e.gif" alt="" />
            <img className='svgImg2' src={HR_LOGO} alt="" />
          </div>
        ) : (
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"} className='detailsJobsGrid'>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} order={{ xm: 1 }} style={{ cursor: "pointer" }}>
              <div className='hello'>
                {jobsSearch?.map((job, index) => (
                  <div className={bgTheme ? "LatestJobs2" : 'LatestJobs'} key={`${job._id}-${index}`}>
                    <div className="LatestJobsHeader">
                      <div className="LatestJobsTitles">
                        <p className="companyName">{job.companyName || "Anonymous"}</p>
                        <p className="designation">{job.designation}</p>
                        <p className="salary">{!job?.payRangeStart && !job?.payRangeEnd ? "No Salary Mentioned" : `${job?.payRangeStart} - ${job?.payRangeEnd}`}</p>
                      </div>
                      <div className="LatestJobsImg">
                        <img className='LatestJobsLogo' src={LOGO} alt="" />
                      </div>
                    </div>
                    <div className={bgTheme ? "LatestJobsInfo1" : "LatestJobsInfo"} dangerouslySetInnerHTML={{ __html: job.summary }} />
                    <div className="LatestJobsInfoPar">
                      <div className="LatestJobsBtnAndCountry">
                        <Button variant="contained" className="LatestJobsBtn" onClick={() => singleJobHandler(job._id)}>{job.jobFeseability}</Button>
                        <p className="LatestJobsCountry">Karachi, Pakistan</p>
                      </div>
                      <div className={bgTheme ? "LatestJobsInfoUser1" : "LatestJobsInfoUser"}>
                        <p className="hourInfo">{format(job.createdAt)}</p>
                        <p className="viewsInfo">{job.views} views</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} order={{ xm: 2 }} style={{ cursor: "pointer" }} className='helllo'>
              <div className={bgTheme ? "postCard1" : "postCard"}>
                <div className="postWrapper">
                  <div className="postHeader">
                    <img className='LatestJobsLogo' src={LOGO} alt="" />
                    <CloseOutlinedIcon onClick={cancelHandler} />
                  </div>
                  <div className="bottomWrapper">
                    <p className='designation'>{singleJob?.designation}</p>
                    <p className='locationWork'>{singleJob?.companyName || "Anonymous"}</p>
                    <div className="postBottom">
                      <p className='cityName'>{singleJob?.city && singleJob?.city + " ,"} {singleJob?.country}</p>
                      <p>{singleJob?.views} views</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="detailsContainer">
                  <div className="detailscardWrapper">
                    <div className="jobDetailWrapper">
                      <p className='designation'>Job Details</p>
                      <div className="salaryWrapper">
                        <p>Salary</p>
                        <p>{!singleJob?.payRangeStart && !singleJob?.payRangeEnd ? "No Salary Mentioned" : `${singleJob?.payRangeStart} - ${singleJob?.payRangeEnd}`}</p>
                      </div>
                      <div className="jobTypeWrapper">
                        <p>Job Type</p>
                        <p>{singleJob?.jobType}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="experience">
                      <div className="experienceWrapper">
                        <p>Experience</p>
                        <p>{singleJob?.experience} years</p>
                      </div>
                    </div>
                    <hr />
                    <div className="skills">
                      <div className="skillsWrapper">
                        <p>Skills</p>
                        <Stack direction="row" style={{ display: "flex", flexWrap: "wrap", gap: "16px", margin: "16px 0" }} spacing={2}>
                          {singleJob?.skill?.map((skill) => (
                            <Button variant="outlined" className="skillButton">{skill}</Button>
                          ))}
                        </Stack>
                      </div>
                    </div>
                    <hr />
                    <div className="fullJobDescription">
                      <p>Full Job Description</p>
                      <div className='jobDetailDanger' dangerouslySetInnerHTML={{ __html: singleJob?.summary }} />
                      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        {singleJob?.hashTags.map((val) => (
                          <Button variant="outlined" className="skillButton">{val}</Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  )
}

export default JobDetail
