import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const cookie = new Cookies();

function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const join_room = () => {
    var room_id = document.getElementById("roomid").value;
    cookie.set("count", 0);
    navigate("./" + room_id);
  };

  const create_room = () => {
    var room_id = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    navigator.clipboard.writeText(room_id)
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
      <div className="bg-gray-800 shadow-md rounded-md p-8 max-w-md w-full">
        <input type='text' id="roomid" placeholder='Enter Room ID' className="w-full border border-gray-300 rounded-md p-3 mb-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white" />
        <button onClick={join_room} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md px-4 py-2 mb-4">Join Room</button>
        <button onClick={create_room} className="w-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 rounded-md px-4 py-2">Create Room</button>
      </div>
    </div>
  );
}

export default HomePage;
