import React, { FC, memo, useEffect, useMemo } from "react";
import { DayCellData } from "@/types/DayCellData";
import {
  addDays,
  differenceInDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import dynamic from "next/dynamic";
import { CalendarViews } from "@/enums/CalendarViews";

const DayViewComponent = dynamic(() => import("@/components/DayView/DayView"));
const MonthViewComponent = dynamic(
  () => import("@/components/MonthView/MonthView"),
);

interface CalendarDaysGridProps {
  getSelectedDate: (fromDate: Date, toDate: Date) => void;
  onDelete: (id: string) => Promise<any>;
  onEdit: (data: any) => void;
  isLoading: boolean;
  events: { [date: string]: any[] };
  activeDate: Date;
  onDayCellClick?: (date: Date) => void;
  onCellClick?: (date: Date) => void;
  currentView: CalendarViews;
}

const CalendarDaysGrid: FC<CalendarDaysGridProps> = ({
  activeDate,
  events,
  onDelete,
  onEdit,
  isLoading,
  getSelectedDate,
  onDayCellClick,
  onCellClick,
  currentView,
}) => {
  const startOfTheSelectedMonth = useMemo(() => {
    return startOfMonth(activeDate);
  }, [activeDate]);
  const endOfTheSelectedMonth = useMemo(() => {
    return endOfDay(endOfMonth(activeDate));
  }, [activeDate]);

  const generateDatesForCurrentWeek = (
    date: Date,
    activeDate: Date,
  ): DayCellData[] => {
    let currentDate = date;
    return Array.from({ length: 7 }).reduce((acc: DayCellData[]) => {
      acc.push({
        isInactive: !isSameMonth(currentDate, activeDate),
        isToday: isSameDay(currentDate, new Date()),
        date: currentDate,
      });
      currentDate = addDays(currentDate, 1);
      return acc;
    }, []);
  };

  const getDates = () => {
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    return Array.from(
      { length: Math.ceil(differenceInDays(endDate, startDate) / 7) },
      (_, index) => {
        const weekStart = addDays(startDate, index * 7);
        return generateDatesForCurrentWeek(weekStart, activeDate);
      },
    );
  };

  useEffect(() => {
    getSelectedDate(startOfTheSelectedMonth, endOfTheSelectedMonth);
  }, [startOfTheSelectedMonth, endOfTheSelectedMonth]);

  const views = {
    month: (
      <MonthViewComponent
        weeks={getDates()}
        isLoading={isLoading}
        events={events}
        onDelete={onDelete}
        onEdit={onEdit}
        onCellClick={onCellClick}
        activeDate={activeDate}
      />
    ),
    day: (
      <DayViewComponent
        onDelete={onDelete}
        onEdit={onEdit}
        events={events}
        onCellClick={onDayCellClick}
        activeDate={activeDate}
      />
    ),
  };

  return (
    <div
      className={
        "flex h-full max-w-[100vw] flex-grow overflow-x-auto overflow-y-hidden bg-gray-300"
      }
    >
      {views[currentView]}
    </div>
  );
};

export default memo(CalendarDaysGrid);
