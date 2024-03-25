import React, { useState } from 'react'
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const cookie = new Cookies()

function Login() {
  const [guest, setGuest] = useState("")
  const navigate = useNavigate()
  const Continue = () => {
    if (guest == "") return;
    cookie.set("name",guest)
    navigate("/join_room")
  }
  return (
    <div>
      <h1>Login</h1>
      <h2>Or</h2>
      <h1>Continue as guest</h1>
      <input type='text' onChange={(e) => setGuest(e.target.value)} placeholder='guest user name' />
      <button onClick={Continue}>Continue</button>
    </div>
  )
}

export default Login