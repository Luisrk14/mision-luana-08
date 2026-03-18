import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 justify-center mt-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-white border border-[#D4AF37]/30 shadow-sm w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl md:text-3xl font-cinzel text-[#2A3B2A]">
              {value}
            </span>
          </div>
          <span className="text-[9px] md:text-[10px] font-montserrat tracking-[0.2em] text-[#6B7F6B] uppercase font-medium">
            {unit === "days"
              ? "Días"
              : unit === "hours"
                ? "Hrs"
                : unit === "minutes"
                  ? "Min"
                  : "Seg"}
          </span>
        </div>
      ))}
    </div>
  );
};
