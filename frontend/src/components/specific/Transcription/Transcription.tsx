import { useEffect, useState } from "react";
import styles from "./Transcription.module.css";
interface TranscriptType {
  transcriptStatus: boolean;
  transcriptState: [string, any];
}

export default function Transcript(props: TranscriptType) {
  const transcriptStatus = props.transcriptStatus;

  const [speechRecognition, setSpeechRecognition]: any = useState(null);
  const [recognition, setRecognition]: any = useState(null);
  const [transcript, setTranscript] = useState<string>("");
  const [lastWord, setLastWord] = useState<string>("");
  const [transcriptLanguage, setTranscriptLanguage] = props.transcriptState;
  useEffect(() => {
    console.log("changed successfully");
    console.log(transcriptLanguage);
  }, [transcriptLanguage]);
  function startTranscript() {
    setSpeechRecognition(() => {
      return window.SpeechRecognition || window.webkitSpeechRecognition;
    });
  }
  function stopAll() {
    if (speechRecognition) setSpeechRecognition(null);
    if (recognition) recognition.stop();
  }
  function startRecognition() {
    if (!speechRecognition) return;
    const recognition = new speechRecognition();
    recognition.continuous = true; // Keep listening
    recognition.interimResults = true; // Show interim results
    recognition.lang = transcriptLanguage;
    setRecognition(() => {
      let tempreco = null;
      if (speechRecognition) {
        tempreco = new speechRecognition();
        tempreco.continuous = true;
        tempreco.interimResults = true;
        tempreco.lang = transcriptLanguage;
      } else return null;
      return tempreco;
    });
  }
  useEffect(() => {
    if (!transcript.length) {
      setLastWord("");
    }
    let lastWord = "";
    console.log(transcript);
    for (let k = transcript.length - 1; k > -1; k--) {
      if (transcript[k] == " ") {
        break;
      }
      lastWord += transcript[k];
    }
    lastWord = lastWord.split("").reverse().join("");
    setTranscript((prev) => {
      return prev.substring(0, prev.length - lastWord.length);
    });
    if (lastWord.length) setLastWord(lastWord);
  }, [transcript]);
  useEffect(() => {
    console.log("TRANSCIRPT IS " + transcript);
    if (transcriptStatus) {
      startTranscript();
    }
  }, [transcriptStatus]);
  useEffect(() => {
    return () => stopAll();
  }, []);
  useEffect(() => {
    if (!speechRecognition && transcriptStatus) {
      console.error("Speech Recognition is not supported in this browser.");
    } else {
      startRecognition();
    }
  }, [speechRecognition]);
  useEffect(() => {
    console.log(recognition);
    if (recognition && speechRecognition) {
      setSpeechRecognition(null);
      recognition.start();

      // Event handler for recognition results
      recognition.onresult = (event: any) => {
        console.log("Speech recognition result detected.");
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        console.log("Final Transcript:", finalTranscript);
        console.log("Interim Transcript:", interimTranscript);
        interimTranscript = interimTranscript.substring(
          Math.max(0, interimTranscript.length - 200)
        );

        setTranscript(interimTranscript);
      };

      // Debugging: Log errors
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended.");
      };
    }
  }, [recognition]);
  return (
    <div id={styles.container}>
      {transcript}
      <div id={styles.lastWord}>{lastWord}</div>
    </div>
  );
}
