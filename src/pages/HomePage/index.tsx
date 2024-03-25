import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  const join_room = () => {
    var room_id = document.getElementById("roomid").value;
    navigate("./" + room_id)
  }
  const create_room = () => {
    var room_id = (Math.random() + 1).toString(36).substring(7).toUpperCase()
    navigate("./" + room_id+ "?host=1")
  }
  return (
    <div>
      <input type='text' id="roomid" placeholder='room id' />
      <button onClick={join_room}>Join room</button>
      <button onClick={create_room}>Create room</button>
    </div>
  )
}

export default HomePage