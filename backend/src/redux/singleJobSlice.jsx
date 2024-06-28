// Importing createSlice function from Redux Toolkit to create a slice of the Redux state
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the singleJob slice, defining default values for singleJob, loading, and error
const initialState = {
    singleJob: undefined, // Initial state for singleJob is set to undefined
    loading: false,       // Initial state for loading is set to false
    error: false          // Initial state for error is set to false
};

// Creating a slice named 'singleJob' using createSlice
const singleJobSlice = createSlice({
    name: "singleJob",    // Name of the slice
    initialState,         // Initial state defined above
    reducers: {           // Reducers to handle actions
        // Reducer to handle the pending state of fetching a single job
        getSingleJobPending: (state) => {
            state.loading = true;  // Set loading to true when fetching starts
        },
        // Reducer to handle the success state of fetching a single job
        getSingleJobSuccess: (state, { payload }) => {
            state.singleJob = payload;  // Update singleJob state with the payload (fetched job data)
            state.loading = false;      // Set loading to false when fetching is successful
            state.error = false;        // Set error to false
        },
        // Reducer to handle the failure state of fetching a single job
        getSingleJobFailure: (state, { payload }) => {
            state.loading = false;      // Set loading to false when fetching fails
            state.error = payload;      // Set error to the payload received from the action (error message)
        },
    }
});

// Extracting actions and reducer from the slice
const { actions, reducer } = singleJobSlice;

// Exporting actions to be used in components and thunks
export const { getSingleJobPending, getSingleJobSuccess, getSingleJobFailure } = actions;

// Exporting the reducer to be used in the store
export default reducer;
