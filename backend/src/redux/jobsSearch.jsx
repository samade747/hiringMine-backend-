import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    jobsSearch : [],
    loading: false,
    error: false
}

const jobsSearch = createSlice({
    name: "jobsSearch",
    initialState,
    reducers:{
        getJobsSearchPending: (state)=>{
            state.loading = true;
        },
        getJobsSearchSuccess: (state, {payload})=>{
            const uniqueJobs = payload.filter(newJob => !state.jobsSearch.some(existingJob => existingJob._id === newJob._id));
           // const uniqueJobs = payload.filter(newJob => !state.jobsSearch.some(existingJob => existingJob._id === newJob._id));
            state.jobsSearch = [...state.jobsSearch, ...uniqueJobs];
            state.loading = false;
            state.error = false;
        },
        getJobsSearchFailure: (state,{payload})=>{
            state.loading = false;
            state.error = payload;
            
        },
        resetJobsSearch: (state) => {
            state.jobsSearch = [];
            state.loading = false;
            state.error = null;
        }
    }
});

const {actions, reducer} = jobsSearch;
export const {getJobsSearchPending, getJobsSearchSuccess, getJobsSearchFailure,resetJobsSearch} = actions;
export default reducer;