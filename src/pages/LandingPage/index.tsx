import React, { useEffect } from 'react'
import "./custom.css"
import { useNavigate } from 'react-router-dom';
import RoomJpg from "./assets/room.jpg"


function Index({ isAuth }: { isAuth: any }) {
  const navigate = useNavigate()
  return (
    <div
      className="div-body h-100"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div className="ripple-background">
        <div className="circle1 xxlarge shade1"></div>
        <div className="circle1 xlarge shade2"></div>
        <div className="circle1 large shade3"></div>
        <div className="circle1 mediun shade4"></div>
        <div className="circle1 small shade5"></div>
      </div>

      <div className="total">
        <div className="center p-4 flex flex-col gap-4" style={{ zIndex: 9 }}>
          <p className="title">IPL Auction Mania</p>

          <p className="sub">
            Time for IPL auction antics! Who'll snag the stars and who's stuck
            with the surprises? Let the bidding begin!
          </p>

          <div className="buttons">
            {isAuth ? (
              <button
                className="mt-2"
                onClick={() => {
                  localStorage.removeItem("jwtToken");

                  window.location.reload();
                }}
              >
                Log out
              </button>
            ) : (
              <button
                className="mt-2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </button>
            )}
          </div>

          <div className="buttons">
            <button onClick={() => navigate("/usersLeaderBoard")}>
              {" "}
              View Current Leader-Board{" "}
            </button>
          </div>

          <div className="buttons">
            <button onClick={() => navigate("/join_room")}> Let's Play</button>
          </div>

          {/* <ReactionCounter  /> */}
          <div className="buttons">
            <button onClick={() => navigate("/guide")}> How to play ? </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index