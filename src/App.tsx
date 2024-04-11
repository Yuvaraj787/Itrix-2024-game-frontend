import { useState } from 'react'
import BeforeStart from './pages/AuctionPage/beforeStart';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AfterStart from './pages/AuctionPage/afterStart';
import Index from './pages/LandingPage';
import Guest from './pages/LandingPage/guest';
import Login from "./pages/LandingPage/login"
import SignUp from './pages/LandingPage/signup';
import Profile from './pages/Profile/profile';
import HomePage from './pages/HomePage/index';
import GameResult from './pages/LeaderBoard/gameResult';
import UsersLeaderBoard from './pages/LeaderBoard/usersLeaderBoard';
import TeamLeaderBoard from './pages/LeaderBoard/teamLeaderBoard';
import { Toaster } from "@/components/ui/toaster"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path:"/join_room",
    element: <HomePage />
  },
  {
    path: "/join_room/:room_id",
    element: <BeforeStart />
  },
  {
    path: "/join_room/:room_id/start",
    element: <AfterStart />
  },
  {
    path: "/guestLogin",
    element: <Guest />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path:"/profile/:userid",
    element: <Profile />
  },
  {
    path: "/gameResult",
    element : <GameResult />
  },
  {
    path:"/usersLeaderBoard",
    element: <UsersLeaderBoard />
  },
  {
    path: "/teamLeadersBoard",
    element: <TeamLeaderBoard />
  }
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />   
      <Toaster />
    </div>
  )
}

export default App
