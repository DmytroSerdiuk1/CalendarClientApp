import React, { FC, Fragment } from "react";
import { format } from "date-fns";
import DesktopDayCell from "@/components/MonthView/DesktopDayCell";
import { DayCellData } from "@/types/DayCellData";
import CalendarWeekDays from "@/components/MonthView/CalendarWeekDays";
import { EventData } from "@/types/EventData";

interface MonthViewComponentProps {
  weeks: DayCellData[][];
  isLoading: boolean;
  events: { [date: string]: any[] };
  onDelete: (id: string) => Promise<any>;
  onEdit: (data: EventData) => void;
  activeDate: Date;
  onCellClick?: (date: Date) => void;
}

const MonthView: FC<MonthViewComponentProps> = ({
  weeks,
  isLoading,
  events,
  onDelete,
  onEdit,
  activeDate,
  onCellClick,
}) => {
  return (
    <>
      <div
        style={{
          gridTemplateRows: `1fr repeat(${weeks.length}, ${
            100 / Math.round(weeks.length) - 0.8
          }%)`,
          gridTemplateColumns: `repeat(7, minmax(200px, 1fr))`,
        }}
        className={`grid max-h-full flex-grow pt-px`}
      >
        <CalendarWeekDays activeDate={activeDate} />

        {weeks.map((week) => {
          return (
            <Fragment key={JSON.stringify(week)}>
              {week.map((day) => {
                const dayEvents = format(
                  new Date(day.date) as Date,
                  "yyyy_MM_dd",
                );
                return day.isInactive ? (
                  <div key={day.date.toDateString()}></div>
                ) : (
                  <DesktopDayCell
                    isLoading={isLoading}
                    events={events?.[dayEvents] || []}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onDayCellClick={onCellClick}
                    key={day.date.toDateString()}
                    day={day}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default MonthView;
