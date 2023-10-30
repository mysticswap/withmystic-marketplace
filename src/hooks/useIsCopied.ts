import { useEffect, useState } from "react";

export const useIsCopied = () => {
  const [isCopied, setIsCopied] = useState(false);
  const copiedMessage = isCopied ? "Copied!" : "Tap to copy";

  useEffect(() => {
    if (isCopied) {
      const timeOut = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      () => {
        return clearTimeout(timeOut);
      };
    }
  }, [isCopied]);

  return { isCopied, copiedMessage, setIsCopied };
};
