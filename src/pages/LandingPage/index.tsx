import React, { useEffect } from 'react'
import "./custom.css"
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate()
useEffect(() => {
  const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff",
  "#00ffff"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

},[])

  return (
     <div className='div-body bg-black h-100' style={{height:"100vh"}} >
      <div className="total">
	
  <nav>
    <div className="menu">
      <div className="logo">
      </div>
      
      
      <ul>
        <li>
          <div className="navbuttons">
            <button>Let's Play</button>
          </div>
        </li>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Auction</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">About ISTA</a></li>
      </ul>
    
      <div className="NavBtns">
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
    </div>
  </nav>
  
  <div className="container">
    <div className="InnerDiv">
      <div className="center">
        <p className="title">Auction Mania</p>
        <br />
        <p className="sub">Showcase your cricket knowledge and play with your friends</p>
        <br />

        <div className="buttons">
          <button onClick={() => navigate("/login")}>  Let's Play</button>
        </div>

        <br />

        <div className="buttons">
          <button onClick={() => navigate("/guide")}>  How to play ? </button>
        </div>
      </div>
    </div>
  </div>
  
</div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>
<div className="circle"></div>

     </div>
    )
}

export default Index