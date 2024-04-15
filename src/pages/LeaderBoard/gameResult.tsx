// import gold from "./medals/gold.png"
import "./custom.css"

const UserBox = ({ userData, name }) => {
  let rankColor = '';
  let medal = null;
  switch (userData.rank) {
    case 1:
      rankColor = '#F4AE32';
      medal = <img src={""} alt="Gold Medal" className="absolute top-0 left-0 w-12 h-12" />;
      break;
    case 2:
      rankColor = 'silver';
      medal = <img src="silver-medal.png" alt="Silver Medal" className="absolute top-0 left-0 w-12 h-12" />;
      break;
    case 3:
      rankColor = 'bronze';
      medal = <img src="bronze-medal.png" alt="Bronze Medal" className="absolute top-0 left-0 w-12 h-12" />;
      break;
    default:
      rankColor = 'gray';
  }

  return (
    <div style={{ backgroundColor: rankColor }} className={`p-4 m-2 w-1/4 rounded-lg h-auto shadow-lg ${rankColor} transform hover:scale-105 transition duration-300 ease-in-out`}>
      {/* {medal} */}
      <h2 className="text-2xl font-bold font-serif text-black">{userData.rank}. {name}</h2>
      <div className="mt-4">
        <div className="flex justify-between">
          <div className="score-box">
            <p className="font-medium text-lg">Batting Score:</p>
            <strong className="font-medium text-lg">{userData.batting_score}</strong>
          </div>
          <div className="score-box">
            <p className="font-medium text-lg">Bowling Score:</p>
            <strong className="font-medium text-lg">{userData.bowling_score}</strong>
          </div>
          <div className="score-box">
            <p className="font-medium text-lg">Overall Score:</p>
            <strong className="font-medium text-lg">{userData.overall_score}</strong>
          </div>
        </div>
        <div>
        <p className="font-medium text-xl mt-4">Players:</p>
        <ul className="pl-4">
          {userData.players.map((player, index) => (
            <li key={index} className="font-medium">{player}</li>
          ))}
        </ul>
        </div>
        <p className="font-medium">Justification: {userData.justification}</p>
      </div>
    </div>
  );
};



const App = () => {
  
var scoreData = JSON.parse(localStorage.getItem("scores")) || {};
var userNames = Object.keys(scoreData)
var scoreArray = userNames.map((un)=> {
  return {...scoreData[un], name: un}
})

scoreArray.sort((a, b) => a.rank - b.rank)

  return (
    <div className="bg-gray-800 h-screen p-4">
      <h1 style={{ textAlign: "center" }} className='text-3xl font-bold mb-8 text-white'>Game Results</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center bg-gray-800">
        {scoreArray.map((score) => (
          <UserBox key={score.name} userData={score} name={score.name} />
        ))}
      </div>
    </div>
  );
};

export default App;
