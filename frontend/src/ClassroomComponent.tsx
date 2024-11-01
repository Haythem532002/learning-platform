
import { Classroom } from './types/props';
import styles from './ClassroomComponent.module.css'
import Timer from './Timer';
import { useState } from 'react';
interface classroomProps{
    classroom:Classroom
}
export default function ClassroomComponent(props:classroomProps){
    const classroom=props.classroom
    const [days,setDays]=useState<number>(0)
    const [hours,setHours]=useState<number>(0)
    const [minutes,setMinutes]=useState<number>(0)
    const [seconds,setSeconds]=useState<number>(0)
    const [status,setStatus]=useState<boolean>(false)
    

    return (
        
      <div className={styles.container+" column"} style={{backgroundColor:status?"rgb(33, 190, 59) ":"rgb(151, 143, 143)"}} >
      <h3>{classroom.title}</h3>
      <div id={styles.description}>{classroom.description}</div>
      <p>{classroom.startingDate.toDateString()}</p>
      
        {status?
        <p>Room Is Open</p>
        :
        <Timer deadLine={classroom.startingDate} 
        setDays={setDays}
        setMinutes={setMinutes}
        setHours={setHours}
        setSeconds={setSeconds}
        days={days}
        minutes={minutes}
        hours={hours}
        seconds={seconds}
        setStatus={setStatus}
        />}
      
      </div>
    )
}