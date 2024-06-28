
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "../src/pages/home/Home"
import Categories from './pages/categories/Categories'
import { Provider, useSelector } from 'react-redux'
import Jobs from './pages/jobs/Jobs'
import JobDetail from './pages/jobDetail/JobDetail'
import Signup from './pages/signup/Signup'
import VerifyEmail from './pages/verify/VerifyEmail'
import Login from './pages/login/Login'
import ForgetPassword from './pages/forgetpassword/ForgetPassword'
import ResetPassword from './pages/resetPassword/ResetPassword'
import { useState } from 'react'
import Profile from './pages/profile/Profile'

function App() {
  const { bgTheme } = useSelector(state => state.bgTheme);
  console.log("bgTheme he ok",bgTheme);

  

  return (
    <div className={bgTheme? "showTheme":"notShowTheme"}>
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<Profile/>}/>

        <Route path='/reset_password/:id/:token' element={<ResetPassword/>}/>

        <Route path='/forget_password' element={<ForgetPassword/>}/>
        <Route path='/verifyEmail' element={<VerifyEmail/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route exact path='/jobsearch' element={<Jobs />}/>
        <Route path='/jobsearch/jid/:id' element={<JobDetail/>}/>

     </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
