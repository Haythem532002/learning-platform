import { useEffect, useState,useRef } from 'react'
import './App.css'
import axios from 'axios'
import Peer from "peerjs"
import expand from './assets/expand.png'
import minimize from './assets/minimize.png'
import forward from './assets/backward.png'
import backward from './assets/forward.png'
import ConfirmationPanel from './confirmationPanel/confirmationPanel'
import printer from 'html2pdf.js'
import downloadIcon from './assets/download.png'


export default function JamBaord() {
  const board=useRef(null)
  const [X,setX]=useState(0)
  const [Y,setY]=useState(0)
  const [drawing,setDrawing]=useState(false)
  const [click,setClick]=useState(false)
  const [color,setColor]=useState("black")
  const [erase,setErase]=useState(false)
  const [width,setWidth]=useState(null)
  const [socket,setSocket]=useState(null)
  const [darkMode,setDarkMode]=useState(false)
  const [fullscreen,setFullscreen]=useState(null)
  const [history,setHistory]=useState([])
  const [clearedHistory,setClearedHistory]=useState([])
  const [params,setParams]=useState([])
  const [message,setMessage]=useState([])
  const [acceptAction,setAcceptAction]=useState([])
  const [panelState,setPanelState]=useState(false)
  const boardContainer=useRef(null)
  const canvasBoard=useRef(null)

  


  function forceMove(currentX,currentY,x,y){

    const context=board.current.getContext('2d')
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(currentX,currentY);
    context.stroke();
  
    setX(currentX)
    setY(currentY)
  
  
  
  }
  useEffect(()=>{/*
  const sk=io('http://localhost:3001')
  setSocket(sk)*/
    setWidth(board.current.lineWidth)
    if(localStorage.getItem('boardHistory')){
      const context=board.current.getContext('2d')
      let hist=JSON.parse(localStorage.getItem('boardHistory'))
      /*
      context.strokeStyle="red"
      changeWidth(2°/******************************************FIX */

      setTimeout(()=>{
        
    let lastColor='black'
    let lastWidth=1

    for(let k=0;k<hist.length;k++){
      //console.log("s")
      let e=hist[k]
      console.log("element")
      //console.log(e)
      lastColor=e.color
      lastWidth=e.width
      context.strokeStyle=e.color
      context.lineWidth=e.width
      context.beginPath();
      context.moveTo(e.X,e.Y);
      context.lineTo(e.currentX,e.currentY);
      context.stroke();

    }
    setColor(lastColor)
    setWidth(lastWidth)
    setHistory((pre)=>[...hist])
    
      },100)
    }
    if(localStorage.getItem('darkMode')=="true"){
      setDarkMode(true)
    }

  },[])
  useEffect(()=>{
    if(darkMode)localStorage.setItem('darkMode',"true")
      else localStorage.setItem('darkMode',"false")
  },[darkMode])

  useEffect(()=>{
    if(history.length)
    localStorage.setItem('boardHistory',JSON.stringify(history))
  else
  localStorage.setItem('boardHistory','')
  },[history])


  useEffect(()=>{
    if(socket){
/*
    socket.on('receive draw',(data)=>{
      changeColor(data.color)
      changeWidth(data.width)
      setColor(data.color)
      setWidth(data.width)
      forceMove(data.currentX,data.currentY,data.x,data.y)
    })*/

    }
  },[socket])

function draw(e){
  if(drawing){
  setClick(true)
  setX(e.nativeEvent.offsetX)
  setY(e.nativeEvent.offsetY)
  }
}

function move(e){
  if(click){
   
    const currentX=e.nativeEvent.offsetX
    const currentY=e.nativeEvent.offsetY
    const context=board.current.getContext('2d')
    context.beginPath();
    context.moveTo(X,Y);
    context.lineTo(currentX,currentY);
    context.stroke();
    console.log(color)
    console.log(width)
    setHistory((prev)=>{
      return [...prev,{width:width,X:X,Y:Y,currentX:currentX,currentY:currentY,color:color}]
    })
    setClearedHistory([])
    setX(currentX)
    setY(currentY)
    if(socket);
   // socket.emit('draw',{x:X,y:Y,currentX:currentX,currentY:currentY,color:color,width:width})





  }
}
function shiftBack(){
    let historyCache=[...history]
    let clearedcache=[...clearedHistory]
    const context=board.current.getContext('2d')
    
    reset()
    let lastColor='black'
    let lastWidth=1
     for(let p =0;p<historyCache.length-Math.min(historyCache.length,10);p++){
      let element=historyCache[p]
      context.lineWidth=element.width
      context.strokeStyle=element.color
      lastColor=element.color
      lastWidth=element.width
      context.beginPath();
      context.moveTo(element.currentX,element.currentY);
      context.lineTo(element.X,element.Y);
      context.stroke();
     }
     clearedcache.unshift(...historyCache.slice(historyCache.length-Math.min(historyCache.length,10)))
     setClearedHistory([...clearedcache])
     setHistory(historyCache.slice(0,historyCache.length-Math.min(historyCache.length,10)))
     setColor(lastColor)
     setWidth(lastWidth)

    
  
}

function shiftForward(){
 // console.log(history)
  //console.log(history.length)
  let historyCache=[...clearedHistory]
  let hCache=[...history]
  
  const context=board.current.getContext('2d')
  reset()
  let lastColor='black'
  let lastWidth=1
  for(let p=0;p<hCache.length;p++){
    let element=hCache[p]
    lastColor=element.color
    lastWidth=element.width
    context.lineWidth=element.width
    context.strokeStyle=element.color
    context.beginPath();
    context.moveTo(element.currentX,element.currentY);
    context.lineTo(element.X,element.Y);
    context.stroke();

  }
   for(let p =0;p<Math.min(historyCache.length,10);p++){
    let element=historyCache[p]
    lastColor=element.color
    lastWidth=element.width
    context.lineWidth=element.width
    context.strokeStyle=element.color
    context.beginPath();
    context.moveTo(element.currentX,element.currentY);
    context.lineTo(element.X,element.Y);
    context.stroke();

   }
   setClearedHistory(historyCache.slice(Math.min(historyCache.length,10)))
   setHistory([...hCache,...historyCache.slice(0,Math.min(historyCache.length,10))]) 
   setColor(lastColor)
   setWidth(lastWidth)


  

}
function start(){
  setDrawing(true)
}

function reset(){
  const context=board.current.getContext('2d')
  context.reset()
  setColor((prev)=>'black')
  setWidth((prev)=>1)
  setHistory((prev)=>[])
  setClearedHistory((prev)=>[])


}


function stop(){
  setDrawing(false)
}




function off(){
  setClick(false)
}
function changeColor(color){
  const context=board.current.getContext('2d')
  context.strokeStyle=color
  setColor(color)
}
function changeWidth(width){
  const context=board.current.getContext('2d')
  context.lineWidth=width
  setWidth(width)

}

function eraseNow(){
  changeColor((darkMode)? "rgb(43, 42, 42)" :"white")
  setErase(true)


}
useEffect(()=>{
  if(color=="white"||(color=="rgb(43, 42, 42)"&&darkMode)){
      changeWidth("100")
      setErase(true)
  }
  else if(erase) {
    setErase(false)
    changeWidth("3")
  }
},[color])

useEffect(()=>{
    reset()
  
},[darkMode])

function fullScreenOn(){
let fullscreen=document.fullscreenElement
setFullscreen(!fullscreen)
let screen=document.documentElement
if(!fullscreen){
if(screen.requestFullscreen)screen.requestFullscreen();
else if(screen.mozRequestFullscreen)screen.mozRequestFullscreen();
else if(screen.webkitRequestFullscreen)screen.webkitRequestFullscreen();
else if(screen.msRequestFullscreen)screen.msRequestFullscreen();


}
else{
  if(document.exitFullscreen)document.exitFullscreen();
  else if(document.mozCancelFullscreen)document.mozCancelFullscreen();
  else if(document.webkitExitFullscreen)document.webkitExitFullscreen();
  else if(document.msExitFullscreen)document.msExitFullscreen();

}

}
function launchChoice(){/*
  setMessage('')
  setTimeout(()=>{
    setMessage('Proceeding To Dark Mode Will Reset The JamBoard')},1000)*/
   setPanelState(true)
    setMessage('Proceeding To Dark Mode Will Reset The JamBoard')
  setAcceptAction(()=>{
    return ()=>setDarkMode((prev)=>!prev)
  })
}


function download(){
  let downloadableBoard=canvasBoard.current
  const options={
      margin:1,
      filename:"JamBoard.pdf",
      image:{type:'jpeg',quality:"0.98"},
      html2canvas:{scale:5},
      jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a3' }

  }
  printer().from(downloadableBoard).set(options).save()

}
  return(
    <div id='jam-board' ref={boardContainer}>
      <ConfirmationPanel key={panelState} message={message} setMessage={setMessage} acceptAction={acceptAction} setState={setPanelState} state={panelState} params={params}/>
      <div id='controls'>
        <button style={{backgroundImage:`url(${downloadIcon})` }} onClick={download} className='board-download-control'></button>
        <button style={{backgroundImage:`url(${backward})`,opacity:(history.length)?'100%':"50%"}} className='board-history-control' disabled={!history.length} onClick={shiftBack}></button>
        <button style={{backgroundImage:`url(${forward})`,opacity:(clearedHistory.length)?'100%':"50%"}} className='board-history-control' disabled={!clearedHistory.length} onClick={shiftForward}></button>
        <button id='board-fullscreen-btn' style={{backgroundImage:`url(${(!fullscreen)?expand:minimize})`}} className='board-dark-btn' onClick={fullScreenOn}></button>
        <button className='board-dark-btn' onClick={launchChoice}>Dark</button>
        <button style={{backgroundColor:(erase)? "rgba(255, 255, 255, 0.784)":"transparent"}} onClick={eraseNow} id='board-eraser'></button>
        <button id='board-reset-btn'  onClick={reset}>Reset</button>
        <button style={{backgroundColor:"red" , opacity:!(color=='red')?'50%':"90%"}} className='color-btn' onClick={()=>changeColor('red')}></button>
        <button style={{backgroundColor:"blue",opacity:!(color=='blue')?'50%':"90%"}} className='color-btn' onClick={()=>changeColor('blue')}></button>
        <button style={{backgroundColor:"yellow",opacity:!(color=='yellow')?'50%':"90%"}} className='color-btn' onClick={()=>changeColor('yellow')}></button>
        <button style={{backgroundColor:"black",opacity:!(color=='black')?'50%':"90%"}} className='color-btn' onClick={()=>changeColor('black')}></button>
        <div id='board-line-width-container'>
          <h5>Pen Width</h5>
          <ul>
            <li><button style={{opacity:(width==5)?'50%':"100%"}} onClick={()=>changeWidth(5)} id='board-width-1'></button></li>
            <li><button style={{opacity:(width==4)?'50%':"100%"}} onClick={()=>changeWidth(4)} id='board-width-2'></button></li>
            <li><button style={{opacity:(width==3)?'50%':"100%"}} onClick={()=>changeWidth(3)} id='board-width-3'></button></li>
            <li><button style={{opacity:(width==2)?'50%':"100%"}} onClick={()=>changeWidth(2)} id='board-width-4'></button></li>
            <li><button style={{opacity:(width==1)?'50%':"100%"}} onClick={()=>changeWidth(1)} id='board-width-5'></button></li>
          </ul>
        </div>
      </div>
      <div ref={canvasBoard} style={{display:"flex",flexDirection:'column', border:"0.08em solid black",borderRadius:'1em', justifyContent:"center",alignItems:"center"}}>
        <h4>Jam Board</h4>
      <canvas ref={board} id='board'
      
      className={(darkMode)?"dark":""}
      onMouseDown={draw}
      onMouseMove={move}
      onMouseUp={off}
      onMouseLeave={stop}
      onMouseEnter={start}
      width={1500}
      height={1000}
      ></canvas>

      </div>
    </div>
  )
}
