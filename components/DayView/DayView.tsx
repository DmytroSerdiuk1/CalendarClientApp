import { Typography } from "@material-tailwind/react";
import {
  addHours,
  differenceInHours,
  endOfDay,
  format,
  startOfDay,
} from "date-fns";
import React, { FC } from "react";
import { getDayEventsMap } from "@/helpers/getDayEventsMap";
import { EventData } from "@/types/EventData";
import DayEventItem from "@/components/EventItem/DayEventItem";

interface DayViewComponentProps {
  events: { [date: string]: EventData[] };
  onDelete: (id: string) => Promise<any>;
  onEdit: (data: any) => void;
  activeDate: Date;
  onCellClick?: (date: Date) => void;
}

const DayView: FC<DayViewComponentProps> = ({
  onDelete,
  onEdit,
  activeDate,
  onCellClick,
  events,
}) => {
  const currentDayEvent = format(activeDate, "yyyy_MM_dd");
  const dayEventsMap = getDayEventsMap(events?.[currentDayEvent], "HH");

  const result = differenceInHours(
    addHours(endOfDay(activeDate), 1),
    startOfDay(activeDate),
  );

  return (
    <div className={"relative w-full overflow-y-auto overflow-x-hidden"}>
      {Array.from({ length: result }).map((_, i) => {
        const selectedDayDate = (f: string) =>
          format(addHours(startOfDay(activeDate), i), f);
        return (
          <div
            onClick={() =>
              onCellClick?.(new Date(selectedDayDate("yyyy-MM-dd HH:mm")))
            }
            key={i}
            className={
              "flex h-[100px] gap-3 border-b transition hover:bg-gray-50"
            }
          >
            <div
              className={"flex h-full w-full items-center gap-1 bg-white px-1"}
            >
              <Typography
                variant={"small"}
                className={"pointer-events-none whitespace-nowrap"}
              >
                {selectedDayDate("hh:mm aaa")}
              </Typography>
              <div
                className={"flex h-full grow gap-1 overflow-x-auto py-0.5 pl-2"}
              >
                {dayEventsMap?.[selectedDayDate("HH")]?.map((e) => {
                  return (
                    <DayEventItem
                      key={e.id}
                      event={e}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayView;
