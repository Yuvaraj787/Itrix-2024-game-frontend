import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import './rules.css';
function Rules() {
  let arr: string[] = [
    "One user (host) creates a room and shares the room ID with friends.",
    "Only the host can start the game after all friends join the room.",
    "Players periodically bid for available players.",
    "The highest bidder gets the player, with a 7-second time limit for bids.",
    "If no bid is placed within the time limit, the player goes unsold.",
    "Each user must pick 5 players with an initial purse of 70 lakhs.",
    "The game ends after all users have picked 5 players.",
    "Results and winners are decided by Google's Gemini Pro AI model.",
    "Scores are based on the overall balance of the team."
  ];

  const [cins, setCins] = useState(0);

  const changeSlideNext = () => {
    if (cins >= 24) {
      setCins(24);
      return;
    }
    let i = cins;
    setCins(i + 6);
  };

  const changeSlidePrev = () => {
    if (cins <= 0) {
      setCins(0);
      return;
    }
    let i = cins;
    setCins(i - 6);
  };

  return (
    <div
      id="rules"
      style={{
        backgroundColor: "rgba(255, 255, 250, 0.1)",
      }}
      className="flex justify-center rounded-xl  w-[58rem] h-[29rem] ml-[16.5rem] mt-3 relative w-full h-screen"
    >
      <div
        id="la"
        style={{
          color: "rgba(255, 255, 250, 0.5)",
        }}
        className="text-white text-2xl absolute left-7 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
        onClick={changeSlidePrev}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div
        id="ra"
        style={{
          color: "rgba(255, 255, 250, 0.5)",
        }}
        className="text-white text-2xl absolute right-7 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
        onClick={changeSlideNext}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div
        id="content"
        className="flex font-bold flex-col text-white p-12 font-sans text-xl"
        style={{ fontFamily: "Aldrich, sans-serif" }}
      >
        <div className="mb-9 mt-5">{arr[cins]}</div>
        <div className="mb-9">{arr[cins + 1]}</div>
        <div className="mb-9">{arr[cins + 2]}</div>
        <div className="mb-9">{arr[cins + 3]}</div>
        <div className="mb-9">{arr[cins + 4]}</div>
        <div className="mb-1">{arr[cins + 5]}</div>
      </div>
    </div>
  );
}

export default Rules;