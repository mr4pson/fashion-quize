import { getWindowDimensions } from "common/helpers/common-helpers";
import { useEffect, useState } from "react";
import { TypeWindowDemensions } from "./types";

export default function useWindowDimensions(): TypeWindowDemensions {
  const defaultWindowDimensions = getWindowDimensions();

  const [windowDimensions, setWindowDimensions] = useState(
    defaultWindowDimensions
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
