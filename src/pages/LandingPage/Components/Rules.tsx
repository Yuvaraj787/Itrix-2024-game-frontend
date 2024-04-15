import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import './rules.css';
function Rules() {
  let arr: string[] = [
    "User can create a public room and anyone can join the room and play the game.",
    "Each game lasts 7 minutes, with 1 minute over time",
    "The normal gametime will be 7 minutes and will be given an overtime of 1 minute, if a result has not arrived within that.",
    "If a result is not produced in the overtime as well, the player who has a higher aggregate will be declared the winner.",
    "Players will be provided with an initial cash of 1000.",
    "Each player will have to fill 5 player slots and the drafted team should confirm to the below given rules:",
    "Total: 50 pts",
    "2 foreign cricketer 10 pts",
    "3 Indian cricketers 10 pts",
    "2 batsmen 10 pts",
    "2 bowlers minimum 1 pure bowler 10 pts",
    "The chosen 5 players must satisfy the above criteria for getting the maximum points.",
    "A player’s aggregate is calculated by : (cricket player points aggregate + (no of rules satisfied)*10)",
    "This aggregate is the number of points a player receives in a game.",
    "Each cricketer is shown on the screen for 30 seconds.Players can bid for the cricketer by raising their paddle within 5 seconds.",
    "If a player doesn't raise their paddle in time, the other player gets the cricketer.",
    "If there's still a bidding war after 30 seconds, the player who raised their paddle last wins the cricketer.",
    "During the overtime period, bidding for a cricket player lasts 15 seconds, with each player having only 3 seconds to raise their paddle.",
    "If both the players have the same aggregate at the end, the player who used minimum budget will get an extra of 25 points.",
    "The game can also end, if a player goes bankrupt in the middle.",
    "Cricket Players – Categories:",
    "30 pts – (Base Price : 150)",
    "20 pts - (Base Price : 100)",
    "15 pts – (Base Price : 75)",
    "Increments on a player’s auction price on paddle raise:",
    "Until 100 : +5",
    "Until 150 : +10",
    "Above 150 : +20",
    "The ultimate winner of this game is decided by the leaderboard.",
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
        className="flex h-full font-bold flex-col text-white p-12"
        style={{ fontFamily: "Aldrich, sans-serif" }}
      >
        <div className="my-4">{arr[cins]}</div>
        <div className="my-4">{arr[cins + 1]}</div>
        <div className="my-4">{arr[cins + 2]}</div>
        <div className="my-4">{arr[cins + 3]}</div>
        <div className="my-4">{arr[cins + 4]}</div>
        <div className="my-4">{arr[cins + 5]}</div>
      </div>
    </div>
  );
}

export default Rules;
