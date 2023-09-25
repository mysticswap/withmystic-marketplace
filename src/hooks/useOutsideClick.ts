import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  setter: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setter(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
};
