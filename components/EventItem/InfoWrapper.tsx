import React, { FC } from "react";
import { EventData } from "@/types/EventData";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { format } from "date-fns";

const InfoWrapper: FC<{
  event: EventData;
  children?: React.ReactNode;
}> = ({ event, children }) => {
  return (
    <Popover placement={"bottom-start"}>
      <PopoverHandler>{children}</PopoverHandler>
      {event.description && (
        <PopoverContent
          className={"max-h-[40vh] md:max-w-[25vw] overflow-y-auto"}
        >
          <div>
            <div className={"text-xl font-bold"}>
              {event.title} {format(new Date(event.date), "hh:mmaaaaa'm'")}
            </div>
            <div className={"text-sm font-bold"}>Description:</div>
            <div className={"text-sm"}>{event.description}</div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default InfoWrapper;
