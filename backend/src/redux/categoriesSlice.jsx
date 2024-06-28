// Importing createSlice function from Redux Toolkit to create a slice of the Redux state
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the categories slice, defining default values for categories, loading, and error
const initialState = {
    categories: null,  // Initial state for categories is set to null
    loading: false,    // Initial state for loading is set to false
    error: false       // Initial state for error is set to false
}

// Creating a slice named 'categories' using createSlice
const categoriesSlice = createSlice({
    name: "categories",   // Name of the slice
    initialState,         // Initial state defined above
    reducers: {           // Reducers to handle actions
        // Reducer to handle the pending state of fetching categories
        getcategoriesPending: (state) => {
            state.loading = true;  // Set loading to true when fetching starts
        },
        // Reducer to handle the success state of fetching categories
        getcategoriesSuccess: (state, { payload }) => {
            state.categories = payload;  // Set categories to the payload received from the action
            state.loading = false;       // Set loading to false when fetching is successful
            state.error = false;         // Set error to false
        },
        // Reducer to handle the failure state of fetching categories
        getcategoriesFailure: (state, { payload }) => {
            state.loading = false;       // Set loading to false when fetching fails
            state.error = payload;       // Set error to the payload received from the action
        },
    }
});

// Extracting actions and reducer from the slice
const { actions, reducer } = categoriesSlice;

// Exporting actions to be used in components and thunks
export const { getcategoriesPending, getcategoriesSuccess, getcategoriesFailure } = actions;

// Exporting the reducer to be used in the store
export default reducer;
