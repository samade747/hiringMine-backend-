// Importing configureStore function from Redux Toolkit to create a Redux store
import { configureStore } from "@reduxjs/toolkit";

// Importing slices to be used in the Redux store
import categoriesSlice from "./categoriesSlice";
import jobsSlice from "./jobsSlice";
import jobsSearch from "./jobsSearch";
import singleJobSlice from "./singleJobSlice";
import keywordSlice from "./keywordSlice";
import themeSlice from "./themeSlice";

// Configuring the Redux store by combining multiple slices
export const store = configureStore({
    reducer: {                 // Defining the reducers for the store
        categories: categoriesSlice, // Reducer for categories slice
        jobs: jobsSlice,             // Reducer for jobs slice
        bgTheme: themeSlice,         // Reducer for theme slice
        jobsSearch: jobsSearch,      // Reducer for jobsSearch slice
        singleJob: singleJobSlice,   // Reducer for singleJob slice
        keyword: keywordSlice        // Reducer for keyword slice
    },
});
