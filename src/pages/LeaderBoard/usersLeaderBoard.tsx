import api_url from "@/OwnComponents/variables";
import axios from "axios";
import { useEffect, useState } from "react";
import Index from './../LandingPage/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Scoreboard() {
  const [list, setList] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios({
          url: api_url + "/scores",
          method: "get",
        });

        let data = res.data;

        data = data.map((item: any) => {
          if (!item["matches_won"]) {
            item["matches_won"] = 0;
          }
          if (!item["matches_played"]) {
            item["matches_played"] = 0.1;
          }

          return item;
        });

        console.log(res.data);
        setList(data);
        console.log("scores", res.data);
      } catch (err) {
        console.log(
          "Error in fetching score data from backend : " + err.message
        );
      }
    }
    fetch();
  }, []);

  const listItems = list.map((p, index) => (
    <tr
      key={index}
      className="bg-neutral-800 rounded-md shadow-lg cursor-pointer duration-300 border-2 border-neutral-950 shadow-inner hover:shadow-teal-500 hover:border-teal-400 relative"
    >
      <td className="py-3 px-6">{index + 1}</td>
      <td className="py-3 px-6">{p.username}</td>
      <td className="py-3 px-6">{p.scores ? p.scores : 0}</td>
      <td className="py-3 px-6">
        {p.matches_played ? Math.round(p.matches_played) : 0}
      </td>
      <td className="py-3 px-6">
        {((Number(p.matches_won) / Number(p.matches_played)) * 100).toFixed(2)
          ? ((Number(p.matches_won) / Number(p.matches_played)) * 100).toFixed(
              2
            )
          : 0}
        %
      </td>
      <td className="absolute inset-0 border-t-0 border-neutral-950 shadow-inner hover:shadow-teal-500 hover:border-teal-400 hover:border-t-2"></td>
    </tr>
  ));

  return (
    <div className='m-0 h-screen bg-neutral-900 '>

      <h3 className='text-teal-500 py-7 text-center text-4xl'>Overall Leaderboard</h3>

      <div className='bg-neutral-900 flex justify-center items-start'>
      <div style={{height:"90vh", overflowY:"scroll"}}>
        <table className='border-2 border-neutral-950 border-collapse'>
          <thead className=' text-teal-500'>
            <tr>
              <th className="py-3 bg-neutral-950">Rank</th>
              <th className="py-3 bg-neutral-950">Username</th>
              <th className="py-3 bg-neutral-950">Total Score</th>
              <th className="py-3 bg-neutral-950">Matches Played</th>
              <th className="py-3 bg-neutral-950">win %</th>
            </tr>
          </thead>
          <tbody className="text-neutral-200 text-center">{listItems}</tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
