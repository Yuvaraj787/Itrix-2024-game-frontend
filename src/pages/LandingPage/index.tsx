import React, { useEffect } from 'react'
import "./custom.css"
import { useNavigate } from 'react-router-dom';
import RoomJpg from "./assets/room.jpg"

function Index() {
  const navigate = useNavigate()
  return (
     <div className='div-body bg-black h-100' style={{height:"100vh"}} >
      <div className="total">
	
  <nav>
    <div className="menu">
      <div className="logo">
      </div>
      
      
      <ul>
        <li>
          <div className="navbuttons">
            <button>Let's Play</button>
          </div>
        </li>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Auction</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">About ISTA</a></li>
      </ul>
    
      <div className="NavBtns">
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
    </div>
  </nav>
  
  <div className="container">
    <div className="InnerDiv">
      <div className="center">
        <p className="title">Auction Mania</p>
        <br />
        <p className="sub">Showcase your cricket knowledge and play with your friends</p>
        <br />

        <div className="buttons">
          <button onClick={() => navigate("/join_room")}>  Let's Play</button>
        </div>

        <br />

        <div className="buttons">
          <button onClick={() => navigate("/guide")}>  How to play ? </button>
        </div>
      </div>
    </div>
  </div>
  
</div>
     </div>
    )
}

export default Index