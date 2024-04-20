// import { useCallback, useState } from 'react'
// import BeforeStart from './pages/AuctionPage/beforeStart';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import AfterStart from './pages/AuctionPage/afterStart';
// import Index from './pages/LandingPage';
// import Guest from './pages/LandingPage/guest';
// import Login from "./pages/LandingPage/login"
// import SignUp from './pages/LandingPage/signup';
// import Profile from './pages/Profile/profile';
// import HomePage from './pages/HomePage/index';
// import GameResult from './pages/LeaderBoard/gameResult';
// import UsersLeaderBoard from './pages/LeaderBoard/usersLeaderBoard';
// import TeamLeaderBoard from './pages/LeaderBoard/teamLeaderBoard';
// import { Toaster } from "@/components/ui/toaster"




// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Index />
//   },
//   {
//     path: "/join_room",
//     element: <HomePage />
//   },
//   {
//     path: "/join_room/:room_id",
//     element: <BeforeStart />
//   },
//   {
//     path: "/join_room/:room_id/start",
//     element: <AfterStart />
//   },
//   {
//     path: "/guestLogin",
//     element: <Guest />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/signup",
//     element: <SignUp />
//   },
//   {
//     path: "/profile/:userid",
//     element: <Profile />
//   },
//   {
//     path: "/gameResult",
//     element: <GameResult />
//   },
//   {
//     path: "/usersLeaderBoard",
//     element: <UsersLeaderBoard />
//   },
//   {
//     path: "/teamLeadersBoard",
//     element: <TeamLeaderBoard />
//   }
// ]);

// function App() {

//   const [token, setToken] = useState(null)



//   }, []);

//   return (
//     <div>
//       {/* <audio src="/game_music.mp3" autoPlay></audio> */}
//       <GoogleReCaptchaProvider reCaptchaKey="6LdUsrgpAAAAAIbJ6RrFUtalGsC2CDQrhgQI0ILX">
//         <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha}>

//         </GoogleReCaptcha>

//         <RouterProvider router={router} />
//       </GoogleReCaptchaProvider>

//       <Toaster />
//     </div>
//   )
// }

import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from "axios"
import CustomRouter from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import { jwtTokenHandler } from "./services/Auth.service"
import { ColorRing } from "react-loader-spinner"
import {Circles, animateThem} from "./OwnComponents/animateScript"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomContext = createContext({
  data: {},
  isAuth: false,
  changeAuth: null,
  setData: null
})


const Loader = () => {

  return (<ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />)
}

function App() {

  const [isLoading, changeLoading] = useState<Boolean>(true);

  const [isAuth, changeAuth] = useState<Boolean>(false);

  const [data, setData] = useState({}) // for storing users data 

  useEffect(() => {

    (async () => {

      const res = await jwtTokenHandler()

      if (res) {
        changeAuth(true)
      }
      else {
        changeLoading(false)
      }

    })()
    animateThem();
  }, [])

  useEffect(() => {
    if (isAuth) {
      changeLoading(false)
    }
  }, [isAuth])


  return (
    <div className="App">
      <CustomContext.Provider value={{
        isAuth: isAuth, changeAuth
          : changeAuth, data: data,
        setData: setData
      }}>


        {

          isLoading ? <div className="main-loader">
            <Loader />
          </div> : <CustomRouter isAuth={isAuth} />

        }
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"

        />

        <ToastContainer />
      </CustomContext.Provider>
      <Circles />
    </div>
  );
}

export default App;

