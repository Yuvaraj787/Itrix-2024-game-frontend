import React, { useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as changeCase from "change-case";
import { SocketContext } from './beforeStart';
import { Button } from "@/components/ui/button"
import { TimeComponent } from "../../OwnComponents/TimeComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Hand } from 'lucide-react';


import "./custom.css"

const cookie = new Cookies();
const user = cookie.get("name");


const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2S2faj8R_GwZQc5X4XbrHemH7FHzaKgVE5cpv3U26xQ&s"
function IndividualCard({ soldPlayers, username, purseLeft, slotsLeft }) {
  const [het, setHet] = useState("0px")
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-2 mb-2">
      <div onClick={() => setHet((prev) => prev == "0px" ? "auto" : "0px")} className="col-span-2 cursor-pointer flex flex-row items-center justify-between">
          <span className="text-2xl font-semibold text-left text-gray-800">{username}</span>
          {het == "0px" ?
          <svg style={{display:"inline"}} enable-background="new 0 0 32 32" height="22px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z" fill="#515151"/></svg>
          :
          <svg enable-background="new 0 0 32 32" height="22px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14.77,23.795L5.185,14.21c-0.879-0.879-0.879-2.317,0-3.195l0.8-0.801c0.877-0.878,2.316-0.878,3.194,0  l7.315,7.315l7.316-7.315c0.878-0.878,2.317-0.878,3.194,0l0.8,0.801c0.879,0.878,0.879,2.316,0,3.195l-9.587,9.585  c-0.471,0.472-1.104,0.682-1.723,0.647C15.875,24.477,15.243,24.267,14.77,23.795z" fill="#515151"/></svg>
          }
          </div>
      <hr />
      <div className="grid grid-cols-2 gap-4 drop-down" style={{height: het, overflowY: "hidden", transition:"height 1s"}}>
        
          <div className='w-full'>
            <p className="text-gray-600 font-medium">Amount Left <p className="text-green-600">Rs. {purseLeft} Lakhs</p></p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Slots Left: <span className="text-blue-600">{slotsLeft}</span></p>
          </div>
          {soldPlayers.map((player, index) => {
            if (player.username !== username) return null;
            return (
              <div key={index} className="bg-white p-2 rounded-lg shadow-md">
                <p className="text-lg font-semibold text-gray-800">{player.player.fullname}</p>
                <p className="text-gray-700"><p className="text-gray-900 font-semibold">Rs. {player.player.currentPrice} Lakhs</p></p>
              </div>
            );
          })}
      </div>
    </div>
  );
}


function PlayerCard({ currentPlayer }) {
  console.log(currentPlayer)
  return (
    currentPlayer.fullname ? 
    <Card className="mt-4 mb-4">
      <CardHeader>
        <CardTitle>{currentPlayer.fullname}</CardTitle>
        <CardDescription>Player details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='gap-x-4 w-full rounded-lg backdrop-blur-lg bg-cover bg-image' style={{ display: "flex", flexDirection: "row", backgroundImage: "url(" + currentPlayer.flagUrl + ")" }}>
          <div className='in-image' style={{ width: "60%" }}><img className='rounded-2xl bg-contain ' style={{ width: "90%", padding: "3%", backgroundBlendMode: "color-burn" }} src={currentPlayer.image_path} /></div>
          <div className='flex in-img flex-col align-center justify-between gap-y-2 gap-x-2 p-1' >
            <div className='flex flex-col border-4 rounded-lg p-4 pt-1 pb-1 bg-gray-800 text-white'>Age : {2024 - parseInt(currentPlayer.dateofbirth.slice(0,4))} </div>
            <div className='flex flex-col border-4 rounded-lg p-4 pt-1 pb-1 bg-gray-800 text-white'><p className='text-center text'>{currentPlayer.countryName}</p></div>
            <div className='flex flex-col border-4 rounded-lg p-4 pt-1 pb-1 bg-gray-800 text-white'><p className='text-center'>{currentPlayer.position.name}</p></div>
          </div>
        </div>
        <div className='mt-2'>
          {currentPlayer.bowlingstyle && <div><p className='text-lg font-bold border-2 rounded-lg bg-gray-300 p-2'>{changeCase.capitalCase(currentPlayer.battingstyle)} </p></div>}
          {currentPlayer.bowlingstyle && <div><p className='text-lg font-bold border-2 rounded-lg bg-gray-300 p-2'>{changeCase.capitalCase(currentPlayer.bowlingstyle)}</p></div>}
          <div className='flex flex-row w-full mt-2 border-2 p-2 gap-x-2 rounded-2xl'>
            <div className='flex-1 text-rcenter border-4 rounded-xl bg-gray-200'>
              <p>Base Price</p>
              <p className='font-bold text-lg'>₹ {currentPlayer.basePrice} lakhs</p>
            </div>
            <div className='flex-1 text-center border-4 rounded-xl bg-gray-200'>
              <p>Current price</p>
              <p className='font-bold text-lg'>₹ {currentPlayer.currentPrice} lakhs</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card> : <div>
      <h1>Waiting for the other players to load</h1>
    </div>
  )
}

import LoadImage from "./Question-mark-face.jpg"

function LoadingScreen({ counter }) {
  return (
    <Card className="mt-4 mb-4">
      <CardHeader>
        <CardTitle>Next Player Coming in {counter}</CardTitle>
        {/* <CardDescription>Player details</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className='gap-x-4 w-full rounded-lg backdrop-blur-lg bg-cover bg-image' style={{ display: "flex", flexDirection: "row" }}>
          <div className='in-image' style={{ width: "60%" }}><img className='rounded-2xl bg-contain ' style={{ width: "90%", padding: "3%", backgroundBlendMode: "color-burn" }} src={LoadImage} /></div>
          <div className='flex in-img flex-col align-center justify-between gap-y-2 gap-x-2 p-1' >
          </div>
        </div>
        <div className='mt-2'>
        
        </div>
      </CardContent>
    </Card>
  )
}


function AfterStart({start}) {
  const params = useParams();
  const socket = useContext(SocketContext);
  const [unsold, setUnsold] = useState(false);
  const navigate = useNavigate()
  const { toast } = useToast()
  const [bid, setBid] = useState({ status: false, details: {} });
  const [gameData, setGameData] = useState([]);
  const [purseData, setPurseData] = useState({
    Yuvaraj: { amountLeft: 80, slotsLeft: 2 },
    Muthu: { amountLeft: 70, slotsLeft: 3 }
  });
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [counter, setCounter] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "IPL | Auction Room";
  }, []);

  useEffect(() => {
    socket.on("counter", (msg) => {
      setLoading(false)
      setCounter(msg);
    });

    socket.on("waiting counter", (msg) => {
      setLoading(true)
      setCounter(msg);
    })

    socket.on("start-bidding", ([player, purse]) => {
      console.log("got the player")
      setPurseData(purse);
      setCurrentPlayer(player);
    });

    socket.on("inc-bid-amount", (bidDetails) => {

      toast({
        title: "Bid Placed",
        description: `Bid placed by ${bidDetails.username} for Rs. ${bidDetails.player.currentPrice}`,
      })
      setCurrentPlayer(bidDetails.player);
    });

    socket.on("sold", ([lastbid, game_data, purse_detail]) => {
      // setSold({
      //   status: true,
      //   username: lastbid.username,
      //   player: lastbid.player
      // });
      setGameData(game_data);
      setPurseData(purse_detail);

      
      toast({
        title: "Player Sold",
        description: `Player ${lastbid.player.fullname} sold to user ${lastbid.username} for Rs. ${lastbid.player.currentPrice}`,
      })

    });

    socket.on("unsold", (lastbid: any) => {
      toast({
        title: "Player Unsold",
        description: `Player ${lastbid.player.fullname} unsold !`,
      })
      
    });

    socket.on("scores", (scoreData) => {
      localStorage.setItem("scores", JSON.stringify(scoreData))
      navigate("/gameResult")
    })

  }, [socket]);


  const bidPlayer = () => {
    const str = "bid" + currentPlayer.id;
    let copy = { ...currentPlayer };
    if (purseData[user] < (copy.currentPrice + 5)) {
      alert("You don't that much amount left in your purse to bid")
      return;
    }
    if (copy.currentPrice === undefined || copy.currentPrice === 0) {
      copy.currentPrice = copy.basePrice;
    } else {
      copy.currentPrice += 5;
    }
    const sendData = {
      username: user,
      player: copy
    };
    socket.emit(str, sendData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-md rounded-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Auction</h1>
        <h2 className="text-xl">Currently Bidding Player</h2>
       {loading ? <LoadingScreen counter={counter} /> : <PlayerCard currentPlayer={currentPlayer} />}
        {!loading && <TimeComponent value={counter} />}
        {!loading && <Button onClick={bidPlayer} className="w-full text-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md px-4 py-2 mt-4">
            <Hand  className="mr-2 h-6 w-6" />
          Bid for Player
          </Button>}
        {Object.keys(purseData).map(u_name => {
          return <IndividualCard username={u_name} soldPlayers={gameData} slotsLeft={purseData[u_name].slotsLeft} purseLeft={purseData[u_name].amountLeft} />
        })}
      </div>
    </div>
  );
}

export default AfterStart;
