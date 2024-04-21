import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api_url from '@/OwnComponents/variables';

const cookie = new Cookies();

function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeRooms, setActiveRooms] = useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwtToken")
      async function fetchRooms() {
        let res = await axios({
          url: api_url + "/suggestRooms",
          method: "get",
          headers: { Authorization: "Bearer " + token }
        })
        console.log(res.data)
        setActiveRooms(res.data)
      }
      fetchRooms()
    } catch (err) {
      console.log("Error in fetching active rooms", err.message)
    }
  }, [])

  async function verifyRoomExist(room_id) {
    try {
      const token = localStorage.getItem("jwtToken")
      const res = await axios({
        url: api_url + "/roomExist",
        method: "post",
        params: { room_id },
        headers: { Authorization: "Bearer " + token }
      })
      console.log(res.data)
      return res.data.exist
    } catch (err) {
      console.log("Error in checking room exist : " + err.message);
      return false;
    }
  }

  const join_room = async () => {
    var room_id = document.getElementById("roomid").value;
    if (!(await verifyRoomExist(room_id))) {
      toast.warn("No Room exist with this id!", { position: "top-center" });
      return;
    }
    cookie.set("count", 0);
    navigate("./" + room_id);
  };

  const create_room = () => {
    var room_id = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    if (navigator.clipboard) navigator.clipboard.writeText(room_id)
    cookie.set("count", 0);
    navigate("./" + room_id + "?host=1");
  };

  useEffect(() => {
    let setToken = searchParams.get("setToken")
    if (setToken) {
      cookie.set("token", setToken);
    }
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Join or Create a Room</h1>

        <div className="mb-4">
          <label htmlFor="roomid" className="block text-gray-300 mb-2">Room ID</label>
          <input
            type="text"
            id="roomid"
            placeholder="Enter Room ID"
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
          />
        </div>

        <button
          type="button"
          onClick={join_room}
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md px-4 py-2 mb-4"
        >
          Join Room
        </button>

        {activeRooms.length > 0 && <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Active Rooms</h2>
          <div className="space-y-2">
            {activeRooms.map((room) => (
              <div key={room.roomid} className="flex items-center py-2">
                <span className="mr-2 font-medium"><span className='cursor-pointer underline text-green-300 hover:text-white' onClick={() => navigate("./"+room.roomid)}>{room.roomid}</span></span>
                <span className="text-gray-500 mr-2">created by</span>
                <span>{room.host}</span>
              </div>
            ))}
          </div>
        </div>}

        <button
          type="button"
          onClick={create_room}
          className="w-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 rounded-md px-4 py-2"
        >
          Create Room
        </button>
      </div>
    </div>
  );
}

export default HomePage;
