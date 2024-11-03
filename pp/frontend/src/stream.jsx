import { useEffect, useState, useRef } from "react";
import "./stream.css";
import axios from "axios";
import Peer from "peerjs";
function Stream() {
  const video = useRef(null);
  const otherVideo = useRef(null);
  const otherVideo1 = useRef(null);
  const ref = useRef(null);
  const [micStatus, setMicStatus] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [streamStatus, setStreamStatus] = useState(false);
  const [stream, setStream] = useState(null);
  const [otherstream, setOtherStream] = useState(null);
  const [id, setId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [otherId, setOtherId] = useState(null);
  const [adminStatus, setAdminStatus] = useState(null);
  const [guests, setGuests] = useState([]);
  const [socketId, setSocketId] = useState(null);
  const WebSocket = useRef(null);

  useEffect(() => {
    console.log("hiiiiiiiiiiiiiiiii");
    console.log(id);
    if (id) {
      if (WebSocket.current && stream) {
        console.log("testing");
        console.log(WebSocket.current);
        console.log(stream);
        let obj = {
          eventName: "stream",
          data: {
            streamId: stream.id,
          },
        };
        WebSocket.current.send(JSON.stringify(obj));
      }
    }
  }, [id]);
  function setCamera(status) {
    console.log(cameraStatus);
    if (!video.current) return;

    if (status && !cameraStatus) {
      //turn on

      turnOn(true, micStatus);
      setCameraStatus(true);
    } else if (cameraStatus && !status) {
      console.log(stream);
      console.log("stopped cam");
      const camera = stream.getTracks()[1];
      camera.stop();
      setCameraStatus(false);
    }
  }
  function setMic(status) {
    if (!video.current) return;
    if (status && !micStatus) {
      //turn on

      turnOn(cameraStatus, true);
    } else if (micStatus && !status) {
      const mic = stream.getTracks()[0];
      mic.stop();
      setMicStatus(false);
    }
  }
  function turnOn(camera, mic) {
    if (cameraStatus && micStatus) return;

    ref.current = new Peer();

    ref.current.on("open", (id) => {
      console.log("idddddddddddddddd");
      setId(id);
    });
    navigator.mediaDevices
      .getUserMedia({ video: camera, audio: mic })
      .then((theStream) => {
        //we got it

        //get our stream
        console.log("setted the stream");
        setStream(theStream);

        if (video.current) {
          console.log("starting stream");
          console.log(theStream);
          video.current.srcObject = theStream;
          setMicStatus(mic);
          setCameraStatus(camera);
        }

        console.log("ON");
        ref.current.on("call", (call) => {
          console.log("Incomming");
          //incomming person accept his stream
          console.log("stream");
          console.log(theStream);
          call.answer(theStream);
          const otherSide = call.peer;
          call.on("stream", (Stream) => {
            //checking if the stream is provided

            setOtherStream("got Stream");
            console.log(Stream);
            if (otherVideo.current) {
              console.log("accepting his video");
              otherVideo.current.srcObject = Stream;
              //callback other side
              // makeCall(otherSide)

              // makeCall()acce
            }

            setGuests((prev) => {
              let newlist = [...prev];
              let ok = true;
              prev.map((element) => {
                if (element.id == Stream.id) ok = false;
              });
              if (ok) newlist.push(Stream);
              return newlist;
            });
          });
        });
        //start streaming
      })
      .catch((e) => console.log(e));
    //getting id
    console.log("ON");
  }
  function turnOff() {
    setCamera(false);
    setMic(false);
  }
  const makeCall = (otherPeerId) => {
    console.log(stream);
    console.log(otherPeerId);
    if (stream) {
      const call = ref.current.call(otherPeerId, stream);
      call.on("stream", (otherGuy) => {
        console.log(otherGuy);
        console.log("got streaming of receiver  (who we are  calling)");
        if (otherVideo.current) {
          otherVideo.current.srcObject = otherGuy;
        }
      });
    }
  };
  function handleStreamLeaving(data) {
    console.log("handling leaving");
    const streamId = data.streamId;
    if (streamId) {
      setGuests((prev) => {
        return prev.filter((p) => {
          console.log("ids");
          console.log(p);
          console.log(streamId);
          return p.id != streamId;
        });
      });
    }
  }

  function handleStreamJoin(data) {
    console.log("handling entering");
    const socketId = data.socketId;
    if (socketId) {
      setSocketId(socketId);
    }
  }
  function executeEvent(event) {
    const eventName = event.event;
    console.log(event);
    console.log(event.event);
    console.log(eventName);
    switch (eventName) {
      case "left":
        handleStreamLeaving(event.data);
        break;
      case "joinedStream":
        handleStreamJoin(event.data);
        break;
      case "cameraOff":
        break;
      case "cameraOn":
        break;
      default:
        console.log("stranger event");
        break;
    }
  }
  useEffect(() => {
    WebSocket.current = new window.WebSocket("ws://localhost:8060/ws");
    WebSocket.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    WebSocket.current.onmessage = (event) => {
      const nonParsedPayload = event.data;
      console.log(nonParsedPayload);
      const eventObj = JSON.parse(nonParsedPayload);
      console.log(eventObj);

      executeEvent(eventObj);
    };

    WebSocket.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
      //  sendOnClose()
    };

    return () => {
      WebSocket.current.close();
    };
  }, []);
  function sendOnClose() {
    if (WebSocket.current) {
      console.log("closed and send");
      console.log(WebSocket.current);
      let obj = {
        eventName: "left",
        data: {
          id: stream.id,
        },
      };
      WebSocket.current.send(JSON.stringify(obj));
    }
  }

  useEffect(() => {
    const numberOfGuests = guests.length;
    console.log("all");
    console.log(guests);
    if (numberOfGuests > 0) {
      const newCommer =
        document.getElementsByClassName("guests")[numberOfGuests - 1];
      const all = document.getElementsByClassName("guests");
      console.log("all");
      console.log(guests);
      console.log(all);
      if (newCommer) newCommer.srcObject = guests[numberOfGuests - 1];
    }
  }, [guests]);
  return (
    <div id="live-container">
      <button onClick={() => setAdminStatus((prev) => !prev)}>
        {adminStatus ? "Admin" : "Client"}
      </button>
      <h1>LIVE Stream</h1>

      <video id="live-frame" ref={video} autoPlay playsInline muted />
      <div id="guests">
        {!adminStatus ? (
          <video id="live-frame" ref={otherVideo} autoPlay playsInline muted />
        ) : (
          <div id="others">
            {guests.map((guest) => {
              return (
                <video
                  id="live-frame"
                  key={guest.id}
                  className="guests"
                  autoPlay
                  playsInline
                  muted
                />
              );
            })}
          </div>
        )}
      </div>
      <div
        style={{ display: displayStatus ? "block" : "none" }}
        id="mic-status"
      >
        Mic {micStatus ? "ON" : "OFF"}
      </div>
      <div
        style={{ display: displayStatus ? "block" : "none" }}
        id="camera-status"
      >
        Camera {cameraStatus ? "ON" : "OFF"}
      </div>
      {!adminStatus && (
        <input
          type="text"
          placeholder="Enter Peer ID to call"
          onChange={(e) => setOtherId(e.target.value)}
        />
      )}
      {!adminStatus && <button onClick={() => makeCall(otherId)}>Call</button>}
      <button onClick={() => setDisplayStatus((prev) => !prev)}>
        Utility : {displayStatus ? "Visible" : "Hidden"}
      </button>
      <label>d:{id}</label>
      <button
        disabled={!cameraStatus || !streamStatus}
        onClick={() => setCamera(false)}
      >
        Camera off
      </button>
      <button
        disabled={cameraStatus || !streamStatus}
        onClick={() => setCamera(true)}
      >
        Camera On
      </button>
      <button
        disabled={!micStatus || !streamStatus}
        onClick={() => setMic(false)}
      >
        Mic off
      </button>
      <button
        disabled={micStatus || !streamStatus}
        onClick={() => setMic(true)}
      >
        Mic On
      </button>
      <button
        disabled={streamStatus}
        onClick={() => {
          turnOn(true, true);
          setStreamStatus(true);
        }}
      >
        On
      </button>
      <button
        disabled={!streamStatus}
        onClick={() => {
          turnOff();
          setStreamStatus(false);
        }}
      >
        Off
      </button>
    </div>
  );
}

export default Stream;
