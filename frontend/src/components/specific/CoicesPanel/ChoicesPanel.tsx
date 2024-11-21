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
    "Who are you ?",
    "What do you do ?",
    "What is This ?",
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
