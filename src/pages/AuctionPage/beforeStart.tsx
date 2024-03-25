import React, { useState, useEffect, useContext, createContext } from 'react'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import { Cookies } from 'react-cookie';
import AfterStart from './afterStart';
import { Socket } from 'socket.io';




const cookie = new Cookies();
var name = cookie.get("name")

var room_id = window.location.pathname.split('/')[2];
var socket = io("http://localhost:3000", {
      query: {name  , room_id},
      transports: ['websocket'], upgrade: false
})

const SocketContext = createContext(null)
function BeforeStart() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [queryParams] = useSearchParams();
  const [start, setStart] = useState(false);

  const [isHost, setHost] = useState(queryParams.get("host"))



  useEffect(() => {
    socket.on("users_added", (s_users) => {
      console.log(s_users);
      setUsers(s_users.members)
    })

    socket.on("auction-started", () => {
      setStart(true)
    })

  }, [socket])

  const startAuction = () => {
    socket.emit('start-auction',"start")
    setStart(true)
  }

  return (
    <SocketContext.Provider value={socket}>
    {start ?
    <AfterStart /> :
    <div>
      <h1>List of players</h1>
      {users.map(user => {
        return <h1>{user}</h1>
      })}
      {(isHost == 1) ? <button onClick={startAuction}>Start Auction</button>: <h2>Auction will be started only by host</h2>}
    </div> }
    </SocketContext.Provider>
  )
}

export { socket, SocketContext }
export default BeforeStart