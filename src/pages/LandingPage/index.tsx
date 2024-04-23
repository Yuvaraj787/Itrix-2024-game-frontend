import React, { useEffect } from 'react'
import "./custom.css"
import { useNavigate } from 'react-router-dom';
import RoomJpg from "./assets/room.jpg"


function Index({ isAuth }: { isAuth: any }) {
  const navigate = useNavigate()
  return (
    <div className='div-body h-100' style={{ height: "100vh", overflow: "hidden" }} >
      <div className="ripple-background" >
        <div className="circle1 xxlarge shade1"></div>
        <div className="circle1 xlarge shade2"></div>
        <div className="circle1 large shade3"></div>
        <div className="circle1 mediun shade4"></div>
        <div className="circle1 small shade5"></div>
      </div>

      <div className="total">

        <nav>
          <div className="menu">
            <div className="logo">
            </div>


            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/join_room">Auction</a></li>
              <li><a href="/usersLeaderBoard">LeaderBoard</a></li>
              <li><a href="http://itrix.istaceg.in/">About ITRIX</a></li>
            </ul>
            <div className="NavBtns">

              {
                isAuth ? <button style={{ color: "black" }} onClick={() => {

                  localStorage.removeItem("jwtToken")

                  window.location.reload()

                }}>Log out</button> : <button style={{ color: "black" }} onClick={() => {

                  navigate("/login")

                }}>Log in</button>
              }

            </div>
          </div>
        </nav>

        <div className="container">
          <div className="InnerDiv">
            <div className="center" style={{ zIndex: 9 }}>
              <p className="title">IPL Auction Mania</p>
              <br />
              <p className="sub">Time for IPL auction antics! Who'll snag the stars and who's stuck with the surprises? Let the bidding begin!</p>
              <br />

              <div className="buttons">
                <button onClick={() => navigate("/join_room")}>  Let's Play</button>
              </div>

              <br />

              {/* <ReactionCounter  /> */}
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