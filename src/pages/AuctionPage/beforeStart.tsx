import React, { useState, useEffect, useContext, createContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Cookies } from 'react-cookie';
import AfterStart from './afterStart';

const cookie = new Cookies();
const name = cookie.get("name");

const room_id = window.location.pathname.split('/')[2];
const socket = io("http://localhost:3000", {
  query: { name, room_id },
  transports: ['websocket'],
  upgrade: false
});

const SocketContext = createContext(null);

function BeforeStart() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [queryParams] = useSearchParams();
  const [start, setStart] = useState(false);
  const [isHost, setHost] = useState(queryParams.get("host"));

  useEffect(() => {
    socket.on("users_added", (s_users) => {
      console.log(s_users);
      setUsers(s_users.members);
    });

    socket.on("auction-started", () => {
      setStart(true);
    });

  }, []);

  const startAuction = () => {
    socket.emit('start-auction', "start");
    setStart(true);
  };

  return (
    <SocketContext.Provider value={socket}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 shadow-md rounded-md p-8 max-w-md w-full">
          {start ? (
            <AfterStart />
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">List of Players</h1>
              <div className="mb-4">
                {users.map((user, index) => (
                  <p key={index} className="text-lg">{user} <span>{user == name  && " ( You ) "}</span></p>
                ))}
              </div>
              {isHost == 1 ? (
                <button onClick={startAuction} className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md px-4 py-2 mb-4">Start Auction</button>
              ) : (
                <h2 className="text-lg">Auction will be started only by host</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export { socket, SocketContext };
export default BeforeStart;
