import { useEffect, useState,useRef } from 'react'
import './App.css'
import axios from 'axios'
import Peer from "peerjs"
import Stream from './stream'
function App() {

  
  return (
    <div>
      <Stream/>
    </div>
  )
}

export default App
