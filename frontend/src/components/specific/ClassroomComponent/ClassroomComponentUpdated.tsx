import viewClassroom from "../ViewClassroom/viewClassroom.module.css";
import courseImg from "./assets/courseImg.png";
import { Classroom } from "../../../types/props";
import { useState } from "react";
import Timer from "../../common/Timer/Timer";

const ClassroomComponentUpdated = (props: Classroom) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(false);

  console.log(props);
  return (
    <div className={viewClassroom.container}>
      <div className={viewClassroom.image}></div>
      <div className={viewClassroom.content}>
        <h3>Title {props.title}</h3>
        <p>Description : {props.description}</p>
      </div>
      <div className={viewClassroom.info}>
        <p>{props.startTime}</p>

        {status ? (
          <p>Room Is Open</p>
        ) : (
          <Timer
            deadLine={props.startTime}
            setDays={setDays}
            setMinutes={setMinutes}
            setHours={setHours}
            setSeconds={setSeconds}
            days={days}
            minutes={minutes}
            hours={hours}
            seconds={seconds}
            setStatus={setStatus}
          />
        )}
        <p>
          <strong>{!props.isPrivate ? "Public" : "Private"}</strong>
        </p>
      </div>
    </div>
  );
};

export default ClassroomComponentUpdated;
