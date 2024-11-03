import { useEffect,useState,useRef, useContext } from "react"
import './confirmationPanel.css'





export default function ConfirmationPanel({acceptAction=()=>console.log("defaut"),message='',setMessage,params=[],state,setState}){
  
   const container=useRef(null)
  
   useEffect(()=>{
    let id=null;
    if(!state){
        container.current.className="confirmation-panel"
         id=setTimeout(()=>{
            container.current.style.display='none';
        },200)


    }
    else{
        
        container.current.style.display='flex'
         id=setTimeout(()=>{
            container.current.className="confirmation-panel popPanel"},200)
    }
    return(()=>clearTimeout(id))
   },[state])
    return(
        <div ref={container} className="confirmation-panel">
         <div className="confirmation-message">{message}</div>
         <div className="confirmation-controls">
            <button disabled={!state}  onClick={()=>{setState(false);acceptAction(...params)}} className="confirmation-yes">YES</button>
            <button disabled={!state} onClick={()=>setState(false)} className="confirmation-no">NO</button>
         </div>
        </div>
    )
}