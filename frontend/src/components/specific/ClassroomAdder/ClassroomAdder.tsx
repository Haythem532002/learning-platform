import React, { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./ClassroomAdder.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Classroom } from "../../../types/props";
import PickerComponent from "../../common/PickerComponent/PickerComponent";
import MaterialComponent from "../MaterialComponent/MaterialComponent";
import { post } from "../../../services/api";
import axiosInstance from "../../../services/auth/axiosInstance";
import { formateDateToLocal } from "../../../utils/utils";
function ClassroomAdder() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [materials, setMaterials] = useState<File[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const privateButton = useRef<HTMLButtonElement | null>(null);
  const publicButton = useRef<HTMLButtonElement | null>(null);
  const passwordContainer = useRef<HTMLSpanElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const clearButton = useRef<HTMLButtonElement | null>(null);
  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const adderForm = useRef<HTMLFormElement | null>(null);
  const hourOtions = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const minuteOptions = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];
  const [fileMapper, setFileMapper] = useState<{ [key: string]: boolean }>({});

  function handleTitle(e: any) {
    setTitle(e.target.value);
  }
  function handlePassword(e: any) {
    setPassword(e.target.value);
  }
  function handleDescription(e: any) {
    setDescription(e.target.value);
  }
  function handleVisibiltyPublic() {
    if (isPublic) return;
    setIsPrivate(isPublic);
    setIsPublic((prev) => !prev);
  }
  function handleVisibiltyPrivate() {
    if (isPrivate) return;
    setIsPublic(isPrivate);
    setIsPrivate((prev) => !prev);
  }
  function handleFiles(e: any) {
    if (e.target.files) {
      const file: File = e.target.files[0];
      console.log(fileMapper.hasOwnProperty(file.name));
      if (
        !fileMapper.hasOwnProperty(file.name) ||
        fileMapper[file.name] == false
      ) {
        //we add
        setMaterials((prev) => {
          return [...prev, file];
        });
        setFileMapper((prev) => {
          return { ...prev, [file.name]: true };
        });
      } else {
        //notify user added
      }
    }
  }

  function closeForm() {
    if (adderForm.current) adderForm.current.style.opacity = "0%";
    setTimeout(() => {
      if (adderForm.current) adderForm.current.style.display = "none";
    }, 200);
  }
  function openForm() {
    if (adderForm.current) adderForm.current.style.display = "flex";
    setTimeout(() => {
      if (adderForm.current) adderForm.current.style.opacity = "100%";
    }, 200);
  }
  function pickFile() {
    if (hiddenInput.current) {
      hiddenInput.current.click();
    }
  }
  function popUp(state: boolean) {
    const stateClass = state ? "password-visible" : "";
    if (passwordContainer.current)
      passwordContainer.current.style.display = "flex";
    setTimeout(() => {
      if (passwordContainer.current)
        passwordContainer.current.className = stateClass + " column";
    }, 100);
  }

  function removeMaterial(fileName: string) {
    setMaterials((prev: File[]) => {
      return prev.filter((p: File) => p.name != fileName);
    });
    setFileMapper((prev) => {
      return { ...prev, [fileName]: false };
    });
  }
  function checkRoomData() {
    return title.length && description.length;
  }
  async function addClassroom() {
    if (!checkRoomData()) {
      console.log("no");
      return;
    }

    console.log(classrooms);
    //parse to reacl exact date

    let newDate = new Date(startDate.toDateString());

    newDate.setMinutes(minute);
    newDate.setHours(hour);
    console.log(newDate);
    if (newDate.getTime() < new Date().getTime()) {
      //notify user
      console.log("invalid");
    } else {
      console.log(newDate);

      //realtime add
      const fd = new FormData();
      fd.append("title", title);
      fd.append("password", title);
      fd.append("description", description);
      fd.append("isPrivate", isPrivate.toString());
      fd.append("password", password);
      fd.append("date", formateDateToLocal(startDate, newDate.getMinutes(), 0));
      // console.log(fd);
      if (materials.length) {
        materials.forEach((m) => {
          if (m) fd.append("files", m);
        });
      } else {
        const emptyFile = new File([""], "empty.txt", { type: "text/plain" });
        fd.append("files", emptyFile);
      }
      console.log("`${key}:`, value");
      fd.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      console.log(fd);

      post("http://localhost:8060/classroom", fd)
        .then((res: AxiosResponse) => {
          if (res.status == 200) {
            setClassrooms((prev) => {
              const classroom: Classroom = {
                title: title,
                description: description,
                startTime: newDate,
                private: isPrivate,
                id: 0,
                password: password,
                streamId: "",
                active: false,
                materials: materials,
              };
              setTitle("");
              setDescription("");
              setStartDate(new Date());
              setHour(0);
              setMinute(0);

              if (prev) return [...prev, classroom];
              else return [classroom];
            });
          } else {
            console.log("failed to add classroom");
          }
        })
        .catch((e: AxiosError) => console.log(e.message));
      //await post('http://localhost:3000/addClassroom',)
    }
  }
  function makeVisible(status: boolean) {
    if (passwordInput.current)
      passwordInput.current.type = status ? "text" : "password";
    if (clearButton.current)
      clearButton.current.style.opacity = status ? "100%" : "50%";
  }

  function handleDate(date: Date | null) {
    if (date) {
      setStartDate(date);
    }
  }
  useEffect(() => {
    if (isPrivate) {
      if (privateButton.current)
        privateButton.current.className = "checked-visibility";
      //popup password

      popUp(true);
    } else {
      //hide password
      popUp(false);

      if (privateButton.current) privateButton.current.className = "";
    }
    if (isPublic) {
      if (publicButton.current)
        publicButton.current.className = "checked-visibility";
    } else {
      if (publicButton.current) publicButton.current.className = "";
    }
  }, [isPrivate, isPublic]);

  useEffect(() => {
    try {
      // const fetchRooms=async()=>{const data= await get('http://localhost:3000/addClassroom');return data}
      //  const data:any=fetchRooms()
      // setClassrooms(data.classRooms)
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  return (
    <div id="classroom-container">
      <form id="classroom-adder-form" ref={adderForm}>
        <h4>Classroom Adder</h4>
        <div
          className="spanner"
          style={{ width: "80%", textAlign: "center", alignSelf: "self-start" }}
        >
          <label htmlFor="title">Classroom Title</label>
          <input
            style={{
              width: "70%",
              maxWidth: "25em",
              marginLeft: "2em",
              border: "0.02em solid black",
              borderRadius: "5em",
              marginTop: "1em",
              height: "2em",
              textAlign: "center",
              marginBottom: "2em",
            }}
            type="text"
            required
            onChange={handleTitle}
            value={title}
          />
        </div>
        <div
          className="spanner"
          style={{ width: "80%", textAlign: "center", alignSelf: "self-start" }}
        >
          <label htmlFor="title">Classroom Description</label>
          <textarea
            id="classroom-description"
            style={{
              width: "70%",
              maxWidth: "25em",
              maxHeight: "5em",
              height: "5em",
              textAlign: "center",
            }}
            required
            onChange={handleDescription}
            value={description}
          />
        </div>
        <div className="spanner" id="visibility-container">
          <span className="column visibility-element">
            <label htmlFor="privateCheck">Private</label>
            <button
              ref={privateButton}
              type="button"
              id="privateCheck"
              onClick={handleVisibiltyPrivate}
              name="privateCheck"
            ></button>
          </span>

          <span className="column visibility-element">
            <label htmlFor="privateCheck">Public</label>
            <button
              ref={publicButton}
              type="button"
              id="publicCheck"
              onClick={handleVisibiltyPublic}
              name="publicCheck"
            ></button>
          </span>
        </div>
        <span
          id="password-container"
          ref={passwordContainer}
          className="column"
        >
          <label htmlFor="password">Classroom Password</label>
          <input
            ref={passwordInput}
            type="password"
            name="password"
            style={{ border: "0.08em solid black", borderRadius: "1em" }}
            required
            onChange={handlePassword}
            value={password}
          />
          <button
            ref={clearButton}
            type="button"
            id="password-clear"
            onMouseDown={() => makeVisible(true)}
            onMouseUp={() => makeVisible(false)}
          ></button>
        </span>
        <h4 style={{ marginBottom: "1em" }}>Starting Time</h4>
        <div className="spanner">
          <div className="column">
            <label htmlFor="year">Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleDate}
              title="hiazd"
            />
          </div>
          <div className="column">
            <label htmlFor="year">Hour</label>
            <PickerComponent
              allOptions={hourOtions}
              defaultValue={hour}
              setDefaultValue={setHour}
            />
          </div>
          <div className="column">
            <label htmlFor="year">Minute</label>
            <PickerComponent
              allOptions={minuteOptions}
              defaultValue={minute}
              setDefaultValue={setMinute}
            />
          </div>
        </div>
        <div
          className="spanner"
          style={{
            marginTop: "2em",
            maxWidth: "45em",
            justifyContent: "flex-start",
            overflow: "scroll",
          }}
        >
          <div className="column">
            <button
              onClick={pickFile}
              type="button"
              id="classroom-adder-btn"
            ></button>
            <input
              ref={hiddenInput}
              onChange={handleFiles}
              type="file"
              style={{
                display: "none",
                position: "absolute",
                width: "0",
                height: "0",
                opacity: "0%",
              }}
            />
          </div>
          <div className="spanner">
            {materials.map((material) => {
              return (
                <MaterialComponent
                  removeMaterial={removeMaterial}
                  fileName={material.name}
                />
              );
            })}
          </div>
        </div>
        <button id="add-classroom-btn" type="button" onClick={addClassroom}>
          Add Classroom
        </button>
      </form>

      <div id="classroom-card"></div>
    </div>
  );
}

export default ClassroomAdder;
