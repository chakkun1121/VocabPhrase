import { useEffect } from "react";

export function useDisableSwiping() {
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.getElementsByTagName("html")[0].style.overscrollBehaviorX = "none";
    return () => {
      document.removeEventListener("touchmove", preventDefault);
      document.getElementsByTagName("html")[0].style.overscrollBehaviorX =
        "auto";
    };
  }, []);
}
