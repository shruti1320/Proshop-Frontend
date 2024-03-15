import { useState, useEffect } from "react";

export function useCountdownTimer(endTime) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = endTime - now;
      if (timeDiff < 0) {
        clearInterval(interval);
        setTimeLeft("Sale ended");
        return;
      }
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      const formattedTimeLeft = `${hours}h ${minutes}m ${seconds}s`;
      setTimeLeft(formattedTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}
