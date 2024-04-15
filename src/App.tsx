import { useState, useEffect } from 'react'
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
import Instructions from "./pages/LandingPage/instructions"
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
    path: "/guest",
    element: <Guest />
  },
  {
    path: "/guide",
    element: <Instructions />
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
  useEffect(() => {
    const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");
  
  const colors = [
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff",
    "#00ffff"
  ];
  
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });
  
  window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
    
  });
  
  function animateCircles() {
    
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";
      
      circle.style.scale = (circles.length - index) / circles.length;
      
      circle.x = x;
      circle.y = y;
  
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });
   
    requestAnimationFrame(animateCircles);
  }
  
  animateCircles();
  
  },[])
  return (
    <div>
      <RouterProvider router={router} />   
      <Toaster />
      <div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
    </div>
  )
}

export default App
