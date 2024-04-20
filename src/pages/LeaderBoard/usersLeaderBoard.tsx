
export default function Scoreboard() {
  const list=[
    {rank : 1, name: "Yuvaraj", wins: 3, matchplayed: 5},
    {rank : 2, name: "Muthu", wins: 2, matchplayed: 3},
    {rank : 3, name: "kumaran", wins: 1, matchplayed: 2},
    {rank : 4, name: "nancy", wins: 0, matchplayed: 2}
  ];
  const listItems = list.map((p, index) => (
    <tr key={index} className='bg-neutral-800 cursor-pointer duration-300 border-2 border-neutral-950 shadow-inner hover:shadow-teal-500 hover:border-teal-400 relative'>
      <td className='py-3 px-6'>{p.rank}</td>
      <td className='py-3 px-6'>{p.name}</td>
      <td className='py-3 px-6'>{p.wins}</td>
      <td className='py-3 px-6'>{p.matchplayed}</td>
      <td className='py-3 px-6'>{((p.wins / p.matchplayed) * 100).toFixed(2)}%</td>
      <td className='absolute inset-0 border-t-0 border-neutral-950 shadow-inner hover:shadow-teal-500 hover:border-teal-400 hover:border-t-2'></td>
    </tr>
  ));

  return (
    <div className='m-0 h-screen bg-neutral-900 '>
      
        <h3 className='text-teal-500 py-7 text-center text-4xl'>Overall Leaderboard</h3>

      <div className='h-screen bg-neutral-900 flex justify-center items-start'>
    
        <table className='border-2 my-5 border-neutral-950 w-9/12 border-collapse'>
          <thead className=' text-teal-500'>
            <tr>
              <th className='py-3 bg-neutral-950'>RANK</th>
              <th className='py-3 bg-neutral-950'>USER NAME</th>
              <th className='py-3 bg-neutral-950'>NO OF WINS</th>
              <th className='py-3 bg-neutral-950'>MATCHES PLAYED</th>
              <th className='py-3 bg-neutral-950'>WIN %</th>
            </tr>
          </thead>
          <tbody className='text-neutral-200 text-center'>{listItems}</tbody>
          </table>
      </div>
    </div>
  )
}
