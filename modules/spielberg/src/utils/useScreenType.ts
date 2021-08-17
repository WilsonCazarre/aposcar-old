import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {
  const is3Cols = useMediaQuery({ minWidth: 1024 });
  const is2Cols = useMediaQuery({ minWidth: 768 });

  if (is3Cols) {
    return "3-cols";
  }
  if (is2Cols) {
    return "2-cols";
  }

  return "1-cols";
};
