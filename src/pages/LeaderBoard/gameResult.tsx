// import gold from "./medals/gold.png"
import { useEffect, useState } from "react";
import "./custom.css"
import Confetti from 'react-confetti'
import Modal from 'react-modal';


let scoreData = [
  {
    username: 'Raju',
    batting_score: 8,
    bowling_score: 5,
    overall_score: 7,
    rank: 1,
    players: [
      'David Willey',
      'Dhananjaya de Silva',
      'Suresh Raina',
      "D'Arcy Short",
      'Reeza Hendricks'
    ],
    justification: 'Excellent balance of batting and bowling. Has a top-class captain and wicket-keeper.'
  },
  {
    username: 'yuvarajv',
    batting_score: 7,
    bowling_score: 6,
    overall_score: 6,
    rank: 2,
    players: [
      'Marnus Labuschagne',
      'Ambati Rayudu',
      'Aaron Finch',
      'Adam Zampa',
      'Nathan Coulter-Nile'
    ],
    justification: 'Marnus Labuschagne and Aaron Finch are good batsmen. Adam Zampa and Nathan Coulter-Nile are good bowlers.'
  },
  {
    username: 'kumaran',
    batting_score: 8,
    bowling_score: 5,
    overall_score: 7,
    rank: 3,
    players: [
      'David Willey',
      'Dhananjaya de Silva',
      'Suresh Raina',
      "D'Arcy Short",
      'Reeza Hendricks'
    ],
    justification: 'Excellent balance of batting and bowling. Has a top-class captain and wicket-keeper.'
  },
  {
    username: 'Virat',
    batting_score: 8,
    bowling_score: 5,
    overall_score: 7,
    rank: 4,
    players: [
      'David Willey',
      'Dhananjaya de Silva',
      'Suresh Raina',
      "D'Arcy Short",
      'Reeza Hendricks'
    ],
    justification: 'Excellent balance of batting and bowling. Has a top-class captain and wicket-keeper.'
  },
];


const Box = ({ data }: { data: any }) => {


  return (
    <div className={"flex temp flex-col items-center gap-4 h-max text-white w-max bg-red-100 p-8 rounded-lg shadow-md " + (data.rank === 1 ? "border border-yellow-300 border-2" : "mb-6")}>
      <div className="flex flex-col items-center">
        {data.rank === 1 && <img style={{ height: "5rem" }} src="crown.svg"></img>}

        <img style={{ height: "5rem" }} src={`https://avatar.iran.liara.run/username?username=${data.username}`}></img>
        {
          data.rank === 1 && <picture>
            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" type="image/webp" />
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.gif" alt="🌟" width="32" height="32" />
          </picture>

        }
      </div>
      <p className="font-extrabold capitalize text-lg">{data.username}</p>
      <div className="text-5xl">
        {data.rank === 1 && "🥇"}
        {data.rank === 2 && "🥈"}
        {data.rank === 3 && "🥉"}

      </div>
      <div className="flex gap-4 items-center font-bold">
        <p>Overall </p>
        <p>{data.overall_score}</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-1 flex-col items-center">
          <p>Batting 🏏</p>
          <p>{data.batting_score}</p>
        </div>
        <div className="flex gap-1 flex-col items-center" >
          <p>Bowling ⚾</p>
          <p>{data.bowling_score}</p>
        </div>
      </div>

    </div>
  )
}

const Tab = (data: any) => {

}


const App = () => {

  const DesktopOrder = [4, 3, 1, 2]

  const [desktopData, setDesktopData] = useState<any[]>([])

  const phoneOrder = [1, 2, 3, 4]

  const [mobileData, setMobileData] = useState<any[]>([])

  const [data, setData] = useState(scoreData)

  const [modalIsOpen, setOpen] = useState(false)

  const [viewData, setViewData] = useState({})

  const closeModal = () => {
    setOpen(false)
  }


  function handleWindowSizeChange(temp1: any, temp2: any) {

    if (window.innerWidth < 1000) {
      setData(temp2)
      console.log(mobileData)
    }
    else {
      setData(temp1)
      console.log(desktopData)
    }
  }

  useEffect(() => {

    let temp1: any[] = [], temp2: any[] = []

    DesktopOrder.map((item: any) => {

      for (let i = 0; i < scoreData.length; i++) {
        if (scoreData[i].rank == item) {
          temp1.push(scoreData[i])
        }
      }

    })

    phoneOrder.map((item: any) => {

      for (let i = 0; i < scoreData.length; i++) {
        if (scoreData[i].rank == item) {
          temp2.push(scoreData[i])
        }
      }

    })


    if (window.innerWidth < 1000) {
      setData(temp2)
    }
    else {
      setData(temp1)
    }

    window.addEventListener('resize', () => { handleWindowSizeChange(temp1, temp2) });
    return () => {
      window.removeEventListener('resize', () => { handleWindowSizeChange(temp1, temp2) });
    }

  }, [])

  useEffect(() => {
    if (modalIsOpen)
      setViewData(data.filter((item: any) => {
        return item.rank == 1
      }))
  }, [modalIsOpen])


  return (
    <div className="bg-gray-800 p-4 min-h-screen min-w-screen overflow-hidden flex flex-col p-4 gap-4 pt-8 items-center">
      <Confetti
        width={window.innerWidth - 10}
        height={window.innerHeight - 10}
      />

      <h3 className="text-3xl flex gap-2 font-bold text-white">
        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp" type="image/webp" />
          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif" alt="🔥" width="32" height="32" />
        </picture> Auction Final Results <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp" type="image/webp" />
          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif" alt="🔥" width="32" height="32" />
        </picture> </h3>
      <div>
        <button onClick={() => setOpen(true)} className="bg-red-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-lg p-2 ">View Player-wise Team</button>
      </div>
      <div className="flex gap-4 items-end lg:flex-row flex-col">
        {
          data.length > 0 && data.map((item: any) => {
            return (
              <Box data={item}></Box>
            )
          })
        }
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        style={
          {
            content: {
              width: "max-content",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              height: "80vh",
              maxWidth: "90vw",
            }
          }
        }
        contentLabel="Example Modal"
      >
        <button className="bg-black p-2 text-white" onClick={closeModal}>Go Back</button>

        <div className="flex flex-wrap gap-4 my-8">
          {
            data.length > 0 && data.map((item: any) => {
              return (

                <button className={"p-2 flex items-center gap-4 capitalize border-black border-2 shadow-lg rounded-full " + (Object.keys(viewData).length && (item.rank == viewData[0].rank ? "bg-black text-white" : ""))} onClick={() => setViewData(() => {
                  return data.filter((item2) => {
                    return item.rank == item2.rank
                  })
                })}>
                  <img style={{ height: "1rem" }} src={`https://avatar.iran.liara.run/username?username=${item.username}`}></img>

                  {item.username}</button>
              )
            })
          }
        </div>
        <div className="flex flex-col gap-4">
          {
            Object.keys(viewData).length && <div>
              <h2 className="font-bold">{viewData[0].username}</h2>
              <h3>{viewData[0].justification}</h3>

              <div className="bg-yellow-200 p-4 rounded-lg my-4">
                {
                  viewData[0].players.map((item: any) => {
                    return (
                      <div className="font-bold capitalize">{item}</div>
                    )
                  })
                }
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg gap-4 bg-slate-300">
                <p className="font-bold">Scores:</p>
                <div className="flex gap-4 items-center font-bold">
                  <p>Overall </p>
                  <p>{viewData[0].overall_score}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 flex-col items-center">
                    <p>Batting 🏏</p>
                    <p>{viewData[0].batting_score}</p>
                  </div>
                  <div className="flex gap-1 flex-col items-center" >
                    <p>Bowling ⚾</p>
                    <p>{viewData[0].bowling_score}</p>
                  </div>
                </div>

              </div>

            </div>
          }
        </div>



      </Modal>

    </div>
  );
};

export default App;
