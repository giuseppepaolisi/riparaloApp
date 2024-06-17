import { useEffect } from "react";

const useBodyBackgroundColor = (color) => {
  useEffect(() => {
    document.body.style.backgroundColor = color;

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [color]);
};

export default useBodyBackgroundColor;
