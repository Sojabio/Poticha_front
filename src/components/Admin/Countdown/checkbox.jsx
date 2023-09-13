import { useState } from "react";

const Checkbox = ({checked}) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div>
      <label>
        <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}/>
      </label>
      <p>{isChecked ? "activé" : "désactivé"}</p>
    </div>
  );
};
export default Checkbox;
