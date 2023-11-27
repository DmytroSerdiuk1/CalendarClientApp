import React, { FC } from "react";
import { format } from "date-fns";
import { EventData } from "@/types/EventData";
import ActionBlock from "./ActionBlock";
import InfoWrapper from "./InfoWrapper";

interface DayEventItemProps {
  event: EventData;
  onDelete: (id: string) => Promise<void>;
  onEdit: (event: EventData) => void;
}

const DayEventItem: FC<DayEventItemProps> = ({ event, onDelete, onEdit }) => {
  return (
    <InfoWrapper event={event}>
      <div
        className={
          "group/item h-full w-full min-w-[100px] rounded bg-gray-200 py-1 px-2 xs:overflow-y-auto md:overflow-hidden"
        }
      >
        <div className={"flex items-center justify-between"}>
          <div className={"max-h-full overflow-y-auto overflow-x-hidden"}>
            <span className={"text-sm font-bold"}>
              {format(new Date(event.date), "hh:mm aaa")}
            </span>{" "}
            <span
              className={
                "max-w-10/12 truncate text-sm font-medium leading-none"
              }
            >
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
    </InfoWrapper>
  );
};

export default DayEventItem;
