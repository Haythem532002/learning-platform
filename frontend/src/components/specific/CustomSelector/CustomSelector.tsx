import { useEffect, useState } from "react";
import styles from "./CustomSelector.module.css";
interface CustomSelectorProps {
  options: string[];
  setValue: any;
}
export default function CustomSelector(props: CustomSelectorProps) {
  const [options, setOptions] = useState<string[]>(props.options);
  const setValue = props.setValue;
  const [menuStatus, setMenuStatus] = useState(false);
  const [defaultValue, setDefaultValue] = useState<String | null>(
    options.length ? options[0] : null
  );
  useEffect(() => {
    if (menuStatus) {
    } else {
    }
  }, [menuStatus]);

  function handleMenu() {
    setMenuStatus((prev) => !prev);
  }

  function handleOption(option: string) {
    setDefaultValue(option);

    setOptions((prev) => {
      prev = prev.filter((element) => element != option);
      prev.unshift(option);
      return [...prev];
    });
    setMenuStatus(false);
    setValue(option);
  }
  return (
    <div id={styles.container}>
      {options.map((option: string) => {
        return option != defaultValue ? (
          menuStatus && (
            <button
              className={styles.optionButton}
              onClick={() => handleOption(option)}
            >
              {option}
            </button>
          )
        ) : (
          <span>
            Default :
            <button className={styles.optionButton} onClick={handleMenu}>
              {option}
            </button>
          </span>
        );
      })}
    </div>
  );
}
