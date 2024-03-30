import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

const cookie = new Cookies();

function Login() {
  const [guest, setGuest] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Continue();
    }
  };

  const Continue = () => {
    if (guest === "") return;
    cookie.set("name", guest);
    navigate("/join_room");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Login</h1>
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-gray-700">Or</h2>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Continue as guest</h1>
        </div>
        <Input
          type='text'
          onChange={(e) => setGuest(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Guest username'
          className="w-full mb-4 border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <Button onClick={Continue} className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-300 rounded-md">Continue</Button>
      </div>
    </div>
  );
}

export default Login;
