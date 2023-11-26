"use client";

import { FC, memo } from "react";
import { addDays, format, startOfWeek } from "date-fns";

const CalendarWeekDays: FC<{
  activeDate: Date;
}> = ({ activeDate }) => {
  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div
          key={day}
          className="flex items-center bg-black pl-1 text-sm font-bold text-white"
        >
          {format(addDays(weekStartDate, day), "E")}
        </div>,
      );
    }
    return weekDays;
  };

  return getWeekDaysNames();
};

export default memo(CalendarWeekDays);
