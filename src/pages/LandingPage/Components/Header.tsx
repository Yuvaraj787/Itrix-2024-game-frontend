import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate()

  return (
    <div className="flex justify-center gap-5 p-5">

      <button onClick={() => navigate("/")} className="p-2 py-2 rounded-lg shadow-md bg-black text-white"> <FontAwesomeIcon icon={faArrowLeft} /> Go back</button>
      <h1
        className="text-white text-4xl md:text-6xl"
      >
        Instructions
      </h1>
    </div>
  );
}

export default Header;
