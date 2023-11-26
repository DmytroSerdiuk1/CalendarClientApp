import React, { FC } from "react";
import {
  Button,
  IconButton,
  Tab,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import { CalendarViews } from "@/enums/CalendarViews";

interface NavigationProps {
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  onClickAddEvent: () => void;
  handleChangeView: (value: CalendarViews) => void;
  viewValue: CalendarViews;
}

const Navigation: FC<NavigationProps> = ({
  viewValue,
  onClickNext,
  onClickToday,
  onClickPrev,
  handleChangeView,
  onClickAddEvent,
}) => {
  return (
    <>
      <IconButton
        onClick={() => onClickAddEvent()}
        size={"sm"}
        className="rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </IconButton>
      <Button onClick={onClickToday} size={"sm"}>
        Today
      </Button>
      <IconButton onClick={onClickPrev} size={"sm"}>
        <svg
          className="h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </IconButton>
      <IconButton onClick={onClickNext} size={"sm"}>
        <svg
          className="h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </IconButton>
      <Tabs value={viewValue}>
        <TabsHeader>
          <Tab
            value={CalendarViews.MONTH}
            onClick={() => handleChangeView(CalendarViews.MONTH)}
          >
            Month
          </Tab>
          <Tab
            value={CalendarViews.DAY}
            onClick={() => handleChangeView(CalendarViews.DAY)}
          >
            Day
          </Tab>
        </TabsHeader>
      </Tabs>
    </>
  );
};

export default Navigation;
