// Importing axios for making HTTP requests
import axios from "axios";
// Importing useEffect and useState hooks from React
import { useEffect, useState } from "react";
// Importing action creators from the categoriesSlice Redux slice
import { getcategoriesFailure, getcategoriesPending, getcategoriesSuccess } from "../redux/categoriesSlice";
// Importing useDispatch and useSelector hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
// Importing action creators from the jobsSlice Redux slice
import { getJobsPending, getJobsSuccess } from "../redux/jobsSlice";
// Importing action creators from the jobsSearch Redux slice
import { getJobsSearchFailure, getJobsSearchPending, getJobsSearchSuccess, resetJobsSearch } from "../redux/jobsSearch";

// Defining a custom hook named useFetch that takes a URL and a title as parameters
const useFetch = (url, title) => {

  // Using useDispatch hook to get the dispatch function from Redux
  const dispatch = useDispatch();
  // Using useState hook to create a state variable for data and a function to update it
  const [data, setData] = useState([]);
  // Using useState hook to create a state variable for jobs and a function to update it
  const [jobs, setJobs] = useState([]);

  // Defining an async function to fetch data from the provided URL
  const fetchData = async (url) => {
    // Dispatching different actions based on the title parameter
    if (title === "categories") {
      dispatch(getcategoriesPending()); // Dispatching pending action for categories
    } else if (title === "jobs") {
      dispatch(getJobsPending()); // Dispatching pending action for jobs
    } else if (title === "jobsSearch") {
      dispatch(getJobsSearchPending()); // Dispatching pending action for job search
    } else if (title === "jobsSearch2") {
      dispatch(resetJobsSearch()); // Resetting job search
      dispatch(getJobsSearchPending()); // Dispatching pending action for job search
    }

    // Try block to handle the HTTP request and response
    try {
      // Handling different cases based on the title parameter
      if (title === "categories") {
        const res = await axios.get(url); // Making GET request to the URL
        console.log("res", res); // Logging the response
        res && dispatch(getcategoriesSuccess(res.data)); // Dispatching success action with response data
        return; // Exiting the function
      } else if (title === "jobs") {
        const response = await axios.get(url); // Making GET request to the URL
        response && dispatch(getJobsSuccess(response.data)); // Dispatching success action with response data
      } else if (title === "jobsSearch") {
        const response = await axios.get(url); // Making GET request to the URL
        response && dispatch(getJobsSearchSuccess(response.data)); // Dispatching success action with response data
        console.log("Jobsearch is running"); // Logging a message
      } else if (title === "jobsSearch2") {
        const response = await axios.get(url); // Making GET request to the URL
        response && dispatch(getJobsSearchSuccess(response.data)); // Dispatching success action with response data
        console.log("Jobsearch2 is running"); // Logging a message
        setData(response.data.data); // Updating the data state variable
      }
    } catch (err) {
      // Catch block to handle errors
      const message = err.response.data.message; // Extracting error message
      console.log(err.response.data.message); // Logging the error message
      dispatch(getJobsSearchFailure(message)); // Dispatching failure action with error message
    }
  };

  // Using useEffect hook to fetch data when the component mounts or the URL changes
  useEffect(() => {
    fetchData(url); // Calling fetchData with the provided URL
  }, [url]); // Dependency array with URL to re-run the effect when URL changes

  console.log(data); // Logging the data state variable
};

// Exporting the useFetch hook as the default export
export default useFetch;
