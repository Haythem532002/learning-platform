import { FC } from "react";
import styles from "./SelectRole.module.css";

interface SelectRoleProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectRole: FC<SelectRoleProps> = ({ value, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      <select
        className={styles.selectRole}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Instructor">Instructor</option>
        <option value="User">User</option>
      </select>
    </div>
  );
};

export default SelectRole;
