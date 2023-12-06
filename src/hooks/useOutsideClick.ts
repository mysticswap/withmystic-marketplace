import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  exemptedClass: string
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if ((event.target as Element).classList.contains(exemptedClass)) return;
        setter(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
};
