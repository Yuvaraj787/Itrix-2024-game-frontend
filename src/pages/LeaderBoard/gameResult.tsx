// import gold from "./medals/gold.png"
import "./custom.css"

const UserBox = ({ obj }) => {
  let rankColor = '';
  let medal = null;
  switch (obj.rank) {
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
      <h2 className="text-2xl font-bold font-serif text-black">{obj.rank}. {obj.username}</h2>
      <div className="mt-4">
        <div className="flex justify-between">
          <div className="score-box">
            <p className="font-medium text-lg">Batting Score:</p>
            <strong className="font-medium text-lg">{obj.batting_score}</strong>
          </div>
          <div className="score-box">
            <p className="font-medium text-lg">Bowling Score:</p>
            <strong className="font-medium text-lg">{obj.bowling_score}</strong>
          </div>
          <div className="score-box">
            <p className="font-medium text-lg">Overall Score:</p>
            <strong className="font-medium text-lg">{obj.overall_score}</strong>
          </div>
        </div>
        <div>
        <p className="font-medium text-xl mt-4">Players:</p>
        <ul className="pl-4">
          {obj.players.map((player, index) => (
            <li key={index} className="font-medium">{player}</li>
          ))}
        </ul>
        </div>
        <p className="font-medium">Justification: {obj.justification}</p>
      </div>
    </div>
  );
};



const App = () => {
  
var scoreData = JSON.parse(localStorage.getItem("scores")) 
// var scoreData = [
//   {
//     username: 'Raju',
//     batting_score: 8,
//     bowling_score: 5,
//     overall_score: 7,
//     rank: 1,
//     players: [
//       'David Willey',
//       'Dhananjaya de Silva',
//       'Suresh Raina',
//       "D'Arcy Short",
//       'Reeza Hendricks'
//     ],
//     justification: 'Excellent balance of batting and bowling. Has a top-class captain and wicket-keeper.'
//   },
//   {
//     username: 'yuvarajv',
//     batting_score: 7,
//     bowling_score: 6,
//     overall_score: 6,
//     rank: 2,
//     players: [
//       'Marnus Labuschagne',
//       'Ambati Rayudu',
//       'Aaron Finch',
//       'Adam Zampa',
//       'Nathan Coulter-Nile'
//     ],
//     justication: 'Marnus Labuschagne and Aaron Finch are good batsmen. Adam Zampa and Nathan Coulter-Nile are good bowlers.'
//   }
// ];

  return (
    <div className="bg-gray-800 h-screen p-4">
      <h1 style={{ textAlign: "center" }} className='text-3xl font-bold mb-8 text-white'>Game Results</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center bg-gray-800">
        {scoreData.map((score) => (
          <UserBox obj={score} />
        ))}
      </div>
    </div>
  );
};

export default App;
