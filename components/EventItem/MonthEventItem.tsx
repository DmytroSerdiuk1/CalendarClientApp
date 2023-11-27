import React, { FC } from "react";
import { format } from "date-fns";
import { EventData } from "@/types/EventData";
import ActionBlock from "@/components/EventItem/ActionBlock";
import InfoWrapper from "@/components/EventItem/InfoWrapper";

interface EventItemProps {
  event: EventData;
  onEdit: (event: EventData) => void;
  onDelete: (id: string) => Promise<void>;
}

const MonthEventItem: FC<EventItemProps> = ({ event, onEdit, onDelete }) => {
  return (
    <InfoWrapper event={event}>
      <div
        className={`group/item flex h-5 flex-shrink-0 cursor-default items-center justify-between rounded px-1 text-xs transition hover:bg-gray-200`}
      >
        <div className={"flex w-10/12 items-center"}>
          <span className="h-2 w-2 flex-shrink-0 rounded-full border border-gray-500"></span>
          <span className="ml-1 font-light leading-none">
            {format(new Date(event.date), "hh:mmaaaaa'm'")}
          </span>
          <span className="ml-1 truncate font-medium leading-none">
            {event.title}
          </span>
        </div>
        <div className={"flex gap-1"}>
          <ActionBlock onDelete={onDelete} onEdit={onEdit} event={event} />
        </div>
      </div>
    </InfoWrapper>
  );
};

export default MonthEventItem;
