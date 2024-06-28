// Importing createSlice function from Redux Toolkit to create a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state for the theme slice
const initialState = {
    bgTheme : false, // Initial background theme state set to false
}

// Creating the theme slice using createSlice function
const themeSlice = createSlice({
    name: "bgTheme",  // Name of the slice
    initialState,     // Initial state of the slice
    reducers:{        // Reducers to handle actions
        // Reducer to handle successful theme change
        getbgThemeSuccess: (state, {payload})=>{
            state.bgTheme = payload; // Updating the bgTheme state with the payload
        },
    }
});

// Destructuring actions and reducer from the created slice
const {actions, reducer} = themeSlice;

// Exporting the actions to be used in other parts of the application
export const {getbgThemePending, getbgThemeSuccess, getbgThemeFailure} = actions;

// Exporting the reducer to be used in the store
export default reducer;
