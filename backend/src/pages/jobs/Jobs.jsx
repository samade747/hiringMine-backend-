// Importing necessary modules and components
import { Box, Button, Container, Grid } from '@mui/material'
import './jobs.css'
import Navbar from '../../components/navbar/Navbar'
import Hello from '../../components/hello/Hello'
import LOGO from "../../assets/hRlogo2.png"
import HR_LOGO from "../../assets/hRlogo2.png"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { format } from "timeago.js"
import { useNavigate, useLocation } from 'react-router-dom'
import { getSingleJobSuccess } from '../../redux/singleJobSlice'
import { serverUrl } from '../../utils/appConstant'
import axios from 'axios'
import { getJobsSearchSuccess } from '../../redux/jobsSearch'

function Jobs() {
  // Getting the current theme and keyword from Redux store
  const { bgTheme } = useSelector(state => state.bgTheme)
  const { keyword } = useSelector(state => state.keyword)
  console.log("keyword=>>>>", keyword)
  const [keywordName, setKeywordName] = useState("")

  const { jobsSearch, loading, error } = useSelector(state => state.jobsSearch)
  console.log("error", error)
  const [isData, setIsData] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const searchDesg = location.search.split("&")[0].split("=")[1]
  console.log(searchDesg)
  console.log("jobs chl rha")

  console.log('loading', loading)
  const [page, setPage] = useState(0)
  console.log("page", page)
  console.log("jobsSearch", jobsSearch.length)
  const [selectedPost, setSelectedPost] = useState(true)

  const navigate = useNavigate()

  // Determining the API endpoint based on the presence of search filters
  const check = !keyword.keyword && !keyword.categories && !keyword.experience && !keyword.price && !keyword.jobType && !keyword.level && !keyword.jobFeseability ?
    useFetch(`${serverUrl}/api/jobs/all?limit=10&pageNo=${page}&keyWord=&category=`, "jobsSearch")
    :
    useFetch(`${serverUrl}/api/categories/filteration/all?price=${keyword.price || ""}&type=${keyword.jobType || ""}&keyword=${keyword.keyword || ""}&level=${keyword.level || ""}&jobfeaseability=${keyword.jobFeseability || ""}&experience=${keyword.experience || ""}&categories=${keyword.categories || ""}`, "jobsSearch2")
  console.log(check)

  console.log("err", error)

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
    setSelectedPost(!selectedPost)
    console.log(post)
    navigate(`/jobsearch/jid/${postId}`)
    dispatch(getSingleJobSuccess(post))
  }

  // Rendering the Jobs component
  return (
    <Container className={bgTheme ? 'jobsContainer1' : "jobsContainer2"}>
      <Box>
        <Hello jobs="jobs" setKeywordName={setKeywordName} />
      </Box>
      <Box>
        {error ? (
          <div className={bgTheme ? "errorResposne1" : "errorResposne2"}>
            <div className='suggestionParent'>
              <p>{error}</p>
              <p>Suggestions:</p>
              <ul>
                <li>Make sure all keywords are spelled correctly.</li>
                <li>Try different keywords that mean the same thing.</li>
                <li>Try more general keywords.</li>
              </ul>
            </div>
          </div>
        ) : loading && jobsSearch.length === 0 ? (
          <div style={{ height: "100vh" }}>
            <div className='loader'>
              <img className='svgLoader' src="https://hiringmine.com/assets/wave-bd174a8e.gif" alt="" />
              <img className='svgImg2' src={HR_LOGO} alt="" />
            </div>
          </div>
        ) : (
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"20px"}>
            {jobsSearch?.map((job, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ cursor: "pointer" }} key={`${job._id}-${index}`}>
                <div className={bgTheme ? "LatestJobs2" : 'LatestJobs'}>
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
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  )
}

export default Jobs
