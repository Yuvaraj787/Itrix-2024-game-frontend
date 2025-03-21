import React, { useState, useEffect, useContext, createContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Cookies } from 'react-cookie';
import { Button } from "@/components/ui/button"
import AfterStart from './afterStart';
import ApiUrl from "../../OwnComponents/variables"
import { Share2, UserRound, Play, LogOut } from 'lucide-react';
const cookie = new Cookies()
import { toast } from "react-toastify"

const name = localStorage.getItem("username");
const token = localStorage.getItem("jwtToken");

const SocketContext = createContext(null);


var socket = io(ApiUrl, {
  query: { token, room_id:window.location.pathname.split('/')[2] },
  transports: ['websocket'],
});

function BeforeStart() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [queryParams] = useSearchParams();
  const [start, setStart] = useState(false);
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const [isHost, setHost] = useState("");
  var [room_id, setRoomId] = useState("FFFFF");
  // var socket;
  


  useEffect(() => {
    
    setRoomId(window.location.pathname.split('/')[2]);

   
    if (cookie.get("count") == 0) {
      window.location.reload();
      cookie.set("count", 1) 
    }
    socket.connect()
    socket.on("users_added", (s_users) => {
      console.log(s_users);
      setUsers(s_users.members);
    });

    socket.on("already-started", (msg) => {
      setAlreadyStarted(true)
    })

    socket.on("auction-started", async (callback) => {
      setStart(true);
      console.log("I approved for the start of the game")
      callback();
    });

    socket.emit("who-is-host", setHost)

    socket.on("accept-host", (h_name) => {
      setHost(h_name)
    })

  }, []);

  const startAuction = () => {
    if (users.length < 3) {
      toast.info("Need atleast three members to start the auction. Call your friends !");
      return;
    }
    socket.emit('start-auction', "start");
    setStart(true);
  };

  const shareRoom = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wanna play IPL Auction",
          text: "Come join us in the auction room by clicking the button below",
          url: "./" + window.location.pathname.split("/")[2]
        })
      } catch (err) {
        console.log(`Error in sharing this room ${err.message}`)
      }
    }
  }

  const leaveRoom = () => {
    socket.disconnect();
    navigate("../")
  }

  return (
    <SocketContext.Provider value={socket}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 shadow-md rounded-md p-8 max-w-md w-full">
          {start ? (
            <AfterStart />
          ) : (
            alreadyStarted ? 
            <div>
              <h1 className="text-3xl font-bold mb-4">Sorry Dude !</h1>
              <div className="mb-4">
                Your friend started the auction without you
              </div>
            </div> : 
            <div>
              <div className='flex flex-row justify-center align-center gap-10 mb-5'>
              <span className='m-auto ml-0 mr-0'>ROOM ID : {room_id}</span>
              <Button onClick={shareRoom} className='bg-green-500 text-bold'><Share2 className="mr-2 h-4 w-4" /> Share this room</Button>
              </div>
              <h1 className="text-3xl font-bold mb-4">List of Players</h1>
              <div className="mb-4">
                {users.map((user, index) => (
                  <p key={index} className="text-lg flex flex-row align-center gap-3 m-3"><UserRound /> {user} <span>{user == name  && " ( You ) "}</span>  <span>{user == isHost  && " ( Host ) "}</span></p>
                ))}
              </div>
              <div className='w-full flex justify-center flex-row gap-2'>

              {(isHost == name) ? (
                <Button onClick={startAuction} className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md px-4 py-2 m-auto text-lg text-bold"><Play className="mr-2 h-6 w-6" />Start Auction</Button>
              ) : (
                <h2 className="text-lg m-auto">Auction will be started only by host</h2>
              )}
               <Button onClick={leaveRoom} className="bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md px-4 py-2 m-auto text-lg text-bold">
                <LogOut className="mr-2 h-6 w-6" />
                Leave Room</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export { SocketContext };
export default BeforeStart;
