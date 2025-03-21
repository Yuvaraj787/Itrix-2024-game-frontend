import React, { useEffect, useState } from 'react';
import "./custom.css";
import { useNavigate } from 'react-router-dom';
import RoomJpg from "./assets/room.jpg";

function Index({ isAuth }: { isAuth: any }) {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Function to calculate time remaining until 8:30 PM today
  const calculateTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(20, 30, 0, 0); // Set to 8:30 PM today

    // If current time is past 8:30 PM, move endTime to tomorrow
    if (now > endTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    const diffMs = endTime.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `Ends in ${diffHours}h : ${diffMinutes < 10 ? '0' : ''}${diffMinutes}mins : ${diffSeconds < 10 ? '0' : ''}${diffSeconds}s`;
  };

  useEffect(() => {
    // Animate title, preamble, and subtitle on mount
    document.querySelector('.preamble')?.classList.add('animate-preamble');
    document.querySelector('.title')?.classList.add('animate-title');
    document.querySelector('.sub')?.classList.add('animate-sub');

    // Set initial time and update every second
    setTimeRemaining(calculateTimeRemaining());
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="div-body h-100 epic-container"
      style={{
        height: "100vh",
        overflow: "hidden",
        background: `linear-gradient(135deg, #ffd700, #1e90ff, #ff4500)`, // Yellow, Blue, Red gradient
        position: "relative",
      }}
    >
      {/* Animated Background Particles */}
      <div className="particles"></div>

      <div className="total epic-overlay">
        <div className="center p-4 flex flex-col gap-6" style={{ zIndex: 10 }}>
          {/* Preamble */}
          <p className="preamble text-lg font-bold text-yellow-300 drop-shadow-md">
            ISTA's Itrix'25 Presents
          </p>

          {/* Main Title with Party Mode Energy */}
          <h1 className="title text-3xl font-extrabold text-white drop-shadow-lg" style={{ lineHeight: "4rem" }}>
            IPL Auction Mania: Edition 2 is ON!
          </h1>

          {/* Subtitle with Typing Animation */}
          <p className="sub text-base text-yellow-200 font-semibold max-w-md mx-auto">
            The blockbuster is BACK! Bigger bids, wilder surprises, and epic rivalries—ready to dominate the auction floor?
          </p>

          {/* Real-time Countdown Timer */}
          <div className="timer text-base font-bold text-white px-3 py-1 rounded-lg shadow-lg">
            {timeRemaining}
          </div>



          {/* Dynamic Button Section */}
          <div className="buttons flex flex-col gap-2">



            <button
              className="epic-btn play-btn"
              onClick={() => navigate("/join_room")}
            >
              <span>Get into the Auction!</span>
            </button>

            <button
              className="epic-btn leaderboard-btn"
              onClick={() => navigate("/usersLeaderBoard")}
            >
              <span>Legends Leaderboard</span>
            </button>


            <button
              className="epic-btn guide-btn"
              onClick={() => navigate("/guide")}
            >
              <span>Instructions</span>
            </button>

            {isAuth ? (
              <button
                className="epic-btn logout-btn mt-1"
                onClick={() => {
                  localStorage.removeItem("jwtToken");
                  window.location.reload();
                }}
              >
                <span>Exit the Arena</span>
              </button>
            ) : (
              <button
                className="epic-btn login-btn mt-1"
                onClick={() => navigate("/login")}
              >
                <span>Join the Madness</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;