import { useEffect } from "react";

export const useWindowFreeze = (state: boolean) => {
  useEffect(() => {
    const documentBody = document.body;
    if (state) {
      documentBody.style.overflow = "hidden";
    } else {
      documentBody.style.overflow = "visible";
    }
  }, [state]);
};
