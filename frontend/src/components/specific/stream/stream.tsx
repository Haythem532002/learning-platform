import { useEffect, useState, useRef } from "react";
import "./stream.css";
import axios from "axios";
import Peer from "peerjs";
import Transcript from "../Transcription/Transcription";

function Stream() {
  const video = useRef<HTMLVideoElement | null>(null);
  const otherVideo = useRef<HTMLVideoElement | null>(null);
  const otherVideo1 = useRef<HTMLVideoElement | null>(null);
  const ref = useRef<any>(null);
  const [micStatus, setMicStatus] = useState<boolean>(false);
  const [displayStatus, setDisplayStatus] = useState<boolean>(true);
  const [cameraStatus, setCameraStatus] = useState<boolean>(false);
  const [streamStatus, setStreamStatus] = useState<boolean>(false);
  const [stream, setStream] = useState<any>(null);
  const [otherstream, setOtherStream] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [otherId, setOtherId] = useState<string | null>(null);
  const [adminStatus, setAdminStatus] = useState<boolean>(false);
  const [guests, setGuests] = useState<any>([]);
  const [socketId, setSocketId] = useState<any>(null);
  const [transcriptStatus, setTranscriptStatus] = useState<any>(null);
  const WebSocket = useRef<WebSocket>(null);
  useEffect(() => {
    console.log("hiiiiiiiiiiiiiiiii");
    console.log(id);
    console.log(WebSocket.current);
    console.log(stream);
    console.log("***************");
    if (id) {
      if (WebSocket.current && stream) {
        console.log("testing");
        console.log(WebSocket.current);
        console.log(stream);
        let obj = {
          eventName: "stream",
          data: {
            streamId: stream.id,
            cameraStatus: cameraStatus,
          },
        };
        WebSocket.current.send(JSON.stringify(obj));
      }
    }
  }, [id]);

  useEffect(() => {
    console.log("hiiiiiiiiiiiiiiiii");
    console.log(id);
    console.log(WebSocket.current);
    console.log(stream);
    console.log("***************");
    if (id) {
      if (WebSocket.current && stream) {
        console.log("testing");
        console.log(WebSocket.current);
        console.log(stream);
        let obj = {
          eventName: "stream",
          data: {
            streamId: stream.id,
            cameraStatus: cameraStatus,
          },
        };
        WebSocket.current.send(JSON.stringify(obj));
      }
    }
  }, [stream]);

  useEffect(() => {
    console.log("CAMEEEEEEEEEEEEEEEEEEEEEERA");
  }, [cameraStatus]);

  function setCamera(status: boolean) {
    console.log("broooooooooooooooooooooo");
    console.log(video.current);
    console.log(cameraStatus);
    if (status) {
      if (video.current) video.current.srcObject = stream;
    } else {
      if (video.current) video.current.srcObject = null;
    }
    //if (!video.current) return;
    /*
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
    }*/
    console.log("alllllllllllllllll guests");
    console.log(guests);
    setCameraStatus(status);
    let obj = {
      eventName: "camera",
      data: {
        streamId: stream.id,
        cameraStatus: status,
      },
    };
    if (WebSocket.current) WebSocket.current.send(JSON.stringify(obj));
    console.log("alllllllllllllllll guests");
    console.log(guests);
  }

  function setMic(status: boolean) {
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

  function turnOn(camera: boolean, mic: boolean) {
    // if (cameraStatus && micStatus) return;

    //*********** */
    ref.current = new Peer();

    ref.current.on("open", (id: any) => {
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
        ref.current.on("call", (call: any) => {
          console.log("Incomming");
          //incomming person accept his stream
          console.log("stream");
          console.log(theStream);
          call.answer(theStream);
          const otherSide = call.peer;
          call.on("stream", (Stream: any) => {
            //checking if the stream is provided

            console.log(Stream);
            if (otherVideo.current) {
              console.log("accepting his video");
              otherVideo.current.srcObject = Stream;
              setOtherStream(Stream);
              //callback other side
              // makeCall(otherSide)

              // makeCall()acce
            }

            setGuests((prev: any) => {
              let newlist = [...prev];
              let ok = true;
              prev.map((element: any) => {
                if (element.id == Stream.id) ok = false;
              });
              if (ok) newlist.push(Stream);
              return newlist;
            });
          });
        });
        //start streaming
        setTranscriptStatus(true);

        /************************************************ */
      })
      .catch((e) => console.log(e));
    //getting id
    console.log("ON");
  }

  function turnOff() {
    setCamera(false);
    setMic(false);
    if (adminStatus) {
      let obj = {
        eventName: "streamOff",
        data: {
          streamId: stream.id,
          cameraStatus: false,
        },
      };

      if (WebSocket.current) WebSocket.current.send(JSON.stringify(obj));
    }
    setStreamStatus(false);
    setCameraStatus(false);
    setGuests([]);
    ref.current = null;
    setId(null);
  }

  const makeCall = (otherPeerId: any) => {
    console.log(stream);
    console.log(otherPeerId);
    if (stream) {
      const call = ref.current.call(otherPeerId, stream);
      call.on("stream", (otherGuy: any) => {
        console.log(otherGuy);
        console.log("got streaming of receiver  (who we are  calling)");
        if (otherVideo.current) {
          otherVideo.current.srcObject = otherGuy;
          setOtherStream(otherGuy);
        }
      });
    }
  };

  function handleStreamLeaving(data: any) {
    console.log("handling leaving");
    const streamId = data.streamId;
    if (streamId) {
      setGuests((prev: any) => {
        return prev.filter((p: any) => {
          console.log("ids");
          console.log(p);
          console.log(streamId);
          return p.id != streamId;
        });
      });
    }
  }

  function handleStreamJoin(data: any) {
    console.log("handling entering");
    const socketId = data.socketId;
    if (socketId) {
      setSocketId(socketId);
    }
  }
  function handleStream(data: any) {
    if (adminStatus) return false;
    console.log("HANDLING STREAM OFFFFF");
    setOtherStream((prev: any) => {
      console.log(prev);
      if (prev && prev.id) {
        if (prev.id == data.streamId) {
          if (otherVideo.current) otherVideo.current.srcObject = null;
          setStreamStatus(false);
          setCameraStatus(false);
          setMicStatus(false);
          setStream(null);
          ref.current = null;
          setId(null);
          if (video.current) video.current.srcObject = null;
        }
      }
      return prev;
    });
  }
  function executeEvent(event: any) {
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
      case "camera":
        handleCamera(event.data);
        break;
      case "streamOff":
        handleStream(event.data);
        break;
      default:
        console.log("stranger event");
        break;
    }
  }

  function handleCamera(data: any) {
    console.log("handling camera");
    const streamId = data.streamId;
    const camst = data.cameraStatus;
    console.log(streamId);
    console.log(camst);
    console.log(guests.length);
    console.log(guests);

    setGuests((prev: any) => {
      if (streamId) {
        if (prev) {
          prev.map((guest: any, index: number) => {
            console.log("mapping");
            console.log(guest.id);
            console.log(streamId);
            if (guest.id == streamId) {
              console.log("here " + streamId);
              let guestvideo: HTMLVideoElement | null =
                document.getElementsByClassName("guests")[index];
              if (camst) {
                if (guestvideo) {
                  guestvideo.srcObject = guest;
                }
              } else {
                if (guestvideo) guestvideo.srcObject = null;
              }
            }
          });
        }
      }
      return prev;
    });

    console.log("otherstream");
    console.log(otherstream);
    setOtherStream((prev: any) => {
      if (prev) {
        console.log(prev);
        console.log(otherVideo.current);
        console.log(streamId);
        console.log(camst);
        if (prev.id == streamId) {
          if (camst) {
            if (otherVideo.current) otherVideo.current.srcObject = prev;
          } else {
            if (otherVideo.current) otherVideo.current.srcObject = null;
          }
        }
      }
      return prev;
    });
  }

  useEffect(() => {
    WebSocket.current = new window.WebSocket("ws://localhost:8060/ws");

    if (WebSocket.current)
      WebSocket.current.onopen = () => {
        console.log("Connected to WebSocket server");
      };

    if (WebSocket.current)
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
      if (WebSocket.current) WebSocket.current.close();
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
      const newCommer: HTMLVideoElement | null =
        document.getElementsByClassName("guests")[numberOfGuests - 1];
      const all = document.getElementsByClassName("guests");
      console.log("all");
      console.log(guests);
      console.log(all);
      if (newCommer) newCommer.srcObject = guests[numberOfGuests - 1];
    }
    console.log(guests);
  }, [guests]);

  return (
    <div id="live-container">
      <button onClick={() => setAdminStatus((prev) => !prev)}>
        {adminStatus ? "Admin" : "Client"}
      </button>
      <h1>LIVE Stream</h1>

      <video id="live-frame" ref={video} autoPlay playsInline />
      <Transcript transcriptStatus={transcriptStatus} />
      <div id="guests">
        {!adminStatus ? (
          <video id="live-frame" ref={otherVideo} autoPlay playsInline muted />
        ) : streamStatus ? (
          <div id="others">
            {guests.map((guest: any) => {
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
        ) : (
          "Stream Is Off"
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
      <div id="stream-controls">
        <button onClick={() => makeCall(otherId)}>call</button>
        <button
          style={{ width: "80%" }}
          id="stream-on-btn"
          disabled={streamStatus}
          onClick={() => {
            turnOn(true, true);
            setStreamStatus(true);
            setCameraStatus(true);
          }}
        >
          On
        </button>
        <button
          style={{ width: "80%" }}
          disabled={!streamStatus}
          onClick={() => {
            turnOff();
          }}
        >
          Off
        </button>
        <label>d:{id}</label>
        <div id="sub-controls">
          <div className="spanner" style={{ width: "100%" }}>
            <button
              style={{ width: "40%" }}
              disabled={!micStatus || !streamStatus}
              onClick={() => setMic(false)}
            >
              Mic off
            </button>
            <button
              style={{ width: "40%" }}
              disabled={micStatus || !streamStatus}
              onClick={() => setMic(true)}
            >
              Mic On
            </button>
          </div>

          <div className="spanner" style={{ width: "100%" }}>
            <button
              style={{ width: "40%" }}
              disabled={cameraStatus || !streamStatus}
              onClick={() => setCamera(true)}
            >
              Camera On
            </button>

            <button
              style={{ width: "40%" }}
              disabled={!cameraStatus || !streamStatus}
              onClick={() => setCamera(false)}
            >
              Camera off
            </button>
          </div>
          <button
            style={{ width: "100%" }}
            onClick={() => setDisplayStatus((prev) => !prev)}
          >
            Utility : {displayStatus ? "Visible" : "Hidden"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stream;
