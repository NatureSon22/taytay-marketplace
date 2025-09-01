import { useState } from "react";

export function useEditableState() {
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return { isEditing, enableEditing, disableEditing, toggleEditing };
}
