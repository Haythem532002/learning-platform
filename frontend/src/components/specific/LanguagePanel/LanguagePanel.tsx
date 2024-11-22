import { useEffect, useState } from "react";
import styles from "./LanguagePanel.module.css";
import CustomSelector from "../CustomSelector/CustomSelector";

interface LanguagePanelProps {
  transcriptLanguageState: [string, any];
}
export default function LanguagePanel(props: LanguagePanelProps) {
  const options = ["English", "French", "Arabic"];
  const [value, setValue] = useState<string>("English");
  const [transcriptLanguage, setTranscriptLanguage] =
    props.transcriptLanguageState;
  const mapper: { [key: string]: string } = {
    English: "en-US",
    Arabic: "ar-SA",
    French: "fr-FR",
  };
  useEffect(() => {
    setTranscriptLanguage(mapper[value]);
  }, [value]);

  return (
    <div id={styles.container}>
      <CustomSelector options={options} setValue={setValue} />
    </div>
  );
}
