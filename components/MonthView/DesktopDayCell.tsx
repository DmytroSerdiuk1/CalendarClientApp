import React, { FC, memo } from "react";
import { DayCellData } from "@/types/DayCellData";
import { format } from "date-fns";
import MonthEventItem from "@/components/EventItem/MonthEventItem";

interface DesktopDayCellProps {
  onDelete: (id: string) => Promise<any>;
  onEdit: (data: any) => void;
  events: any[];
  day: DayCellData;
  isLoading: boolean;
  onDayCellClick?: (date: Date) => void;
}

const DesktopDayCell: FC<DesktopDayCellProps> = ({
  isLoading,
  day,
  events,
  onDelete,
  onEdit,
  onDayCellClick,
}) => {
  return (
    <div
      className={`group relative flex h-full flex-col border-[0.5px] border-gray-300 ${
        day.isToday ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className={"flex items-center justify-between px-2"}>
        <span
          onClick={() => onDayCellClick?.(day.date)}
          className={`my-1 cursor-pointer text-xs font-bold ${
            day.isToday ? "text-red-400" : ""
          }`}
        >
          {format(day.date, "d MMMM")}
        </span>
      </div>
      {isLoading && (
        <div className={"flex flex-col gap-0.5"}>
          {Array.from({ length: 7 }, (_, i) => {
            return (
              <div key={i} className={"flex h-3 animate-pulse gap-1 px-2"}>
                <div className="h-full w-5/12 rounded-full bg-gray-300 " />
                <div className="h-full w-full rounded-full bg-gray-300 " />
                <div className="h-full w-2/12 rounded-full bg-gray-300 " />
              </div>
            );
          })}
        </div>
      )}
      <div className="flex max-h-full flex-col overflow-y-auto px-1 py-1">
        {events.map((event) => {
          return (
            <MonthEventItem
              key={event.id}
              event={event}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(DesktopDayCell);
