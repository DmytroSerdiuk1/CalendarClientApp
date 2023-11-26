import { format } from "date-fns";
import { EventData } from "@/types/EventData";

export const getDayEventsMap = (events: EventData[], formatString: string) => {
  return events?.reduce(
    (previousValue, currentValue) => {
      const dateFormat = format(new Date(currentValue.date), formatString);
      if (previousValue[dateFormat]) {
        previousValue[dateFormat].push(currentValue);
      } else {
        previousValue[dateFormat] = [currentValue];
      }
      return previousValue;
    },
    {} as { [formatString: string]: EventData[] },
  );
};
