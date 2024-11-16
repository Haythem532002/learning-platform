import viewClassroom from "../ViewClassroom/viewClassroom.module.css";
import courseImg from "./assets/courseImg.png";
import { Classroom } from "../../../types/props";
import { useState } from "react";
import Timer from "../../common/Timer/Timer";
import ClassroomDetails from "../ClassroomDetails";

interface propsInterface {
  setDisplayed: any;
  classroom: Classroom;
}

const ClassroomComponentUpdated = (props: propsInterface) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(false);

  console.log("from classroom updated", props);
  const handleMouseDown = () => {
    console.log("clicked");
    // console.log(displayed);
    props.setDisplayed(props.classroom);
    // setDisplayed(!props.se);
  };
  return (
    <>
      <div onClick={handleMouseDown} className={viewClassroom.container}>
        <div className={viewClassroom.image}></div>
        <div className={viewClassroom.content}>
          <h3>Title {props.classroom.title}</h3>
          <p>Description : {props.classroom.description}</p>
        </div>
        <div className={viewClassroom.info}>
          <p>{props.classroom.startTime.toString()}</p>

          {status ? (
            <p>Room Is Open</p>
          ) : (
            <Timer
              deadLine={props.classroom.startTime}
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
            <strong>{!props.classroom.private ? "Public" : "Private"}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default ClassroomComponentUpdated;
