import { useEffect,useState } from "react"
import { newDate } from "react-datepicker/dist/date_utils"
import styles from './Timer.module.css'

interface TimerProps{
    deadLine:Date
    setDays:any,
    setMinutes:any,
    setHours:any,
    setSeconds:any,
    setStatus:any,
    days:number,
    minutes:number,
    hours:number,
    seconds:number,
}


const Timer:React.FC<TimerProps>=({deadLine,setDays,setMinutes,setSeconds,setStatus,setHours,days,seconds,minutes,hours})=>{
function timer(limit:Date){

    let left=parseInt((limit.getTime()/1000).toString())-parseInt((new Date().getTime()/1000).toString())
    const alldays=parseInt((left/(3600*24)).toString())
    left-=alldays*(3600*24)
    const allhours=parseInt((left/3600).toString())
    left-=allhours*(3600)
    const allminutes=parseInt((left/60).toString())
    left-=allminutes*(60)
    const allseconds=left
    setSeconds(allseconds)
    setHours(allhours)
    setMinutes(allminutes)
    setDays(alldays)


}
useEffect(()=>{
    
const id=setInterval(()=>{


    let left=parseInt((deadLine.getTime()/1000).toString())-parseInt((new Date().getTime()/1000).toString())
    
if(left>-1)
    timer(deadLine)
else{
    clearInterval(id)
    setStatus(true)
}
},1000)


return (()=>{
    clearInterval(id)
})



},[])


    return (

        <div id={styles.container} className="spanner">
            <div>
                <h5>Days</h5>
                <p>{(days<10&&"0")}{days}</p>
            </div>
            <div>
                <h5>Hours</h5>
                <p>{(hours<10&&"0")}{hours}</p>
            </div>
            <div>
                <h5>Minutes</h5>
                <p>{(minutes<10&&"0")}{minutes}</p>
            </div>
            <div>
                <h5>Seconds</h5>
                <p>{(seconds<10&&"0")}{seconds}</p>
            </div>
        </div>

    )
}
export default Timer