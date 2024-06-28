// Importing createSlice function from Redux Toolkit to create a slice of the Redux state
import { createSlice } from "@reduxjs/toolkit"

// Initial state for the jobs slice, defining default values for jobs, loading, and error
const initialState = {
    jobs: [],     // Initial state for jobs is an empty array
    loading: false, // Initial state for loading is set to false
    error: false   // Initial state for error is set to false
}

// Creating a slice named 'jobs' using createSlice
const jobsSlice = createSlice({
    name: "jobs",   // Name of the slice
    initialState,   // Initial state defined above
    reducers: {     // Reducers to handle actions
        // Reducer to handle the pending state of fetching jobs
        getJobsPending: (state) => {
            state.loading = true;  // Set loading to true when fetching starts
        },
        // Reducer to handle the success state of fetching jobs
        getJobsSuccess: (state, { payload }) => {
            state.jobs = payload;   // Update jobs state with the payload (fetched jobs data)
            state.loading = false;  // Set loading to false when fetching is successful
            state.error = false;    // Set error to false
        },
        // Reducer to handle the failure state of fetching jobs
        getJobsFailure: (state, { payload }) => {
            state.loading = false;  // Set loading to false when fetching fails
            state.error = payload;  // Set error to the payload received from the action (error message)
        },
    }
});

// Extracting actions and reducer from the slice
const { actions, reducer } = jobsSlice;

// Exporting actions to be used in components and thunks
export const { getJobsPending, getJobsSuccess, getJobsFailure } = actions;

// Exporting the reducer to be used in the store
export default reducer;
