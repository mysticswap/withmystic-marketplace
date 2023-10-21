import { useEffect, useState } from "react";

export const useIsOverflow = (
  ref: React.MutableRefObject<null>,
  minimalCards?: boolean
) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLElement;
      const isOverflowing = element.scrollWidth > element.clientWidth;
      setIsOverflowing(isOverflowing);
    }
  }, [ref, minimalCards]);

  return isOverflowing;
};
