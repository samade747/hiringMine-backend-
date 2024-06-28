// Importing createSlice function from Redux Toolkit to create a slice of the Redux state
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the keyword slice, defining default values for keyword, loading, and error
const initialState = {
    keyword: {},   // Initial state for keyword is an empty object
    loading: false, // Initial state for loading is set to false
    error: false   // Initial state for error is set to false
};

// Creating a slice named 'keyword' using createSlice
const keywordSlice = createSlice({
    name: "keyword",   // Name of the slice
    initialState,      // Initial state defined above
    reducers: {        // Reducers to handle actions
        // Reducer to handle the pending state of fetching keyword
        getKeyWordPending: (state) => {
            state.loading = true;  // Set loading to true when fetching starts
        },
        // Reducer to handle the success state of fetching keyword
        getKeyWordSuccess: (state, { payload }) => {
            state.keyword = payload;  // Update keyword state with the payload (fetched keyword data)
            state.loading = false;    // Set loading to false when fetching is successful
            state.error = false;      // Set error to false
        },
        // Reducer to handle the failure state of fetching keyword
        getKeyWordFailure: (state, { payload }) => {
            state.loading = false;    // Set loading to false when fetching fails
            state.error = payload;    // Set error to the payload received from the action (error message)
        },
    }
});

// Extracting actions and reducer from the slice
const { actions, reducer } = keywordSlice;

// Exporting actions to be used in components and thunks
export const { getKeyWordPending, getKeyWordSuccess, getKeyWordFailure } = actions;

// Exporting the reducer to be used in the store
export default reducer;
