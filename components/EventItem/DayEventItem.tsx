import React, { FC } from "react";
import { format } from "date-fns";
import { EventData } from "@/types/EventData";
import ActionBlock from "./ActionBlock";

interface DayEventItemProps {
  event: EventData;
  onDelete: (id: string) => Promise<void>;
  onEdit: (event: EventData) => void;
}

const DayEventItem: FC<DayEventItemProps> = ({ event, onDelete, onEdit }) => {
  return (
    <div
      className={
        "group/item h-full w-full min-w-[100px] rounded bg-gray-200 p-2"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div>
          <span className={"text-sm font-bold"}>
            {format(new Date(event.date), "hh:mm aaa")}
          </span>{" "}
          <span className={"truncate text-sm font-medium leading-none"}>
            {event.title}
          </span>
        </div>
        <div>
          <ActionBlock
            additionalClasses={"p-1 hover:bg-gray-300 rounded"}
            onDelete={onDelete}
            onEdit={onEdit}
            event={event}
          />
        </div>
      </div>
    </div>
  );
};

export default DayEventItem;
