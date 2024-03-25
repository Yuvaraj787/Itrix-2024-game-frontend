import React, { useContext, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client'
import { socket, SocketContext } from './beforeStart';
const cookie = new Cookies();


const user = cookie.get("name")
function AfterStart() {
  const params = useParams()
  const socket = useContext(SocketContext)
  const [unsold, setUnsold] = useState(false)
  const [bid, setBid] = useState({status: false, details: {}})
  const [gameData, setGameData] = useState([])
  const [purseData, setPurseData] = useState({})
  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    age: 0,
    category:"",
    basePrice: 0,
    currentPrice: 0,
    picture: "",
    id: ""
  })
  const [sold, setSold] = useState({
    status: false,
    username: "",
    player: currentPlayer
  })
  const [counter, setCounter] = useState(10)
  useEffect(() => {

    socket.on("counter", (msg) => {
      setCounter(msg);
    })

    socket.on("start-bidding", ([player, purse]) => {
      setPurseData(purse)
      setCurrentPlayer(player)
    })

    socket.on("inc-bid-amount", (bidDetails) => {
      setBid({status: true, details: bidDetails})
      setTimeout(() => {
      setBid({status: false, details: bidDetails})
      }, 2000)
      setCurrentPlayer(bidDetails.player)
    })

    socket.on("sold", ([lastbid, game_data, purse_detail]) => {
      setSold({
        status: true,
        username: lastbid.username,
        player: lastbid.player
      })
      setGameData(game_data)
      setPurseData(purse_detail)
      setTimeout(() => {
        setSold({
          status: false,
          username: lastbid.username,
          player: lastbid.player
        })
      }, 2000)
    })

    socket.on("unsold", (lastbid:any) => {
      setUnsold(true)
      setTimeout(() => {
        setUnsold(false)
      }, 2000)
    })

    
  }, [socket])

  useEffect(() => {
    console.log("logging the purse data")
    console.log(purseData)
    console.log(Object.keys(purseData))
  }, [purseData])

  useEffect(() => {
    document.title = "IPL | Auction Room"
  }, [])


  const bidPlayer = () => {
    var str = "bid"+currentPlayer.id
    var copy = currentPlayer
    if (copy.currentPrice == 0) {
      copy.currentPrice = copy.basePrice
    } else {
      copy.currentPrice += 5   
    }
    const sendData = {
      username : user, player : copy
    };
    console.log(sendData)
    socket.emit(str, sendData)
  }
  return (
    <div>
      <h1>Auction</h1>
      <h2>Currently bidding player</h2>
      <div>
          <h2>Name : {currentPlayer.name}</h2>
          <h2>Age : {currentPlayer.age}</h2>
          <h2>Category : {currentPlayer.category}</h2>
          <h2>Baseprice : Rs. {currentPlayer.basePrice}</h2>
          <h1>currentprice : Rs. {currentPlayer.currentPrice}</h1>
      </div>
      {bid.status && <h2>Client {bid.details.username} bidded for this player +5</h2>}
      {unsold && <h1>Player Unsold</h1>}
      {sold.status && <h1>Player {sold.player.name} sold to user {sold.username} for Rs: {sold.player.currentprice}</h1>}
      <button onClick={bidPlayer}><h1>Bid for him</h1></button>
      <h1>Time Remaining : {counter}</h1>
      <h2>Here the list of the players sold : </h2>
      {gameData.map(data => {
        return <div><h3>name : {data.player.name} bought by {data.username} at the price of {data.player.currentPrice}</h3></div>
      })}
      <h2>Purse details of all users</h2>
      {Object.keys(purseData).map(u_name => {
        return <h2>{u_name} : Rs. {purseData[u_name]}</h2>
      })}
    </div>
  )
}

export default AfterStart