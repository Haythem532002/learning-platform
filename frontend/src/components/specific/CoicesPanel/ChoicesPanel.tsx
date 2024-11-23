import { useState } from "react";
import styles from "./ChoicesPanel.module.css";
interface choicesProps {
  setInput: any;
  sendMessage: (message: string) => void;
}
export default function ChoicesPanel(props: choicesProps) {
  const setInput = props.setInput;
  const sendMessage = props.sendMessage;
  const [questions, setQuestions] = useState<String[]>([
    "Who are you ?",
    "What are the functionnalities of this platform ?",
    "How to join a classroom ?",
    "How do i communicate in a classroom ?",
  ]);
  function choice(e: string) {
    if (e) sendMessage(e);
  }
  return (
    <div id={styles.container}>
      {questions.map((question: string, index: Number) => {
        return (
          <div
            className={styles.question}
            onMouseDown={() => choice(question)}
            data-value={question}
          >
            {question}
          </div>
        );
      })}
    </div>
  );
}
