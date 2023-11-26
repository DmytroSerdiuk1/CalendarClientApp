"use client";

import { Button } from "@material-tailwind/react";
import { FC, ReactNode, memo, useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { appDispatch, RootState } from "@/store";
import { logout } from "@/store/user/slice";
import AddEventModal from "@/components/Modals/AddEventModal";
import { CalendarViews } from "@/enums/CalendarViews";
import Navigation from "@/components/Navigation/Navigation";
import { UserData } from "@/types/UserData";

interface CalendarHeaderProps {
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  handleChangeView: (value: CalendarViews) => void;
  viewValue: CalendarViews;
  activeDate: Date;
  children: ReactNode;
}

const CalendarHeader: FC<CalendarHeaderProps> = ({
  activeDate,
  onClickToday,
  handleChangeView,
  viewValue,
  onClickNext,
  children,
  onClickPrev,
}) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const userData: UserData = useSelector(
    (state: RootState) => state.user.user as any,
  );

  const dateFormatByView: { [key: string]: string } = {
    month: "MMMM yyyy",
    day: "dd MMMM yyyy",
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white px-3 py-3">
        <div className="hidden items-center gap-2 md:flex">
          <Navigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            onClickToday={onClickToday}
            handleChangeView={handleChangeView}
            viewValue={viewValue}
            onClickAddEvent={() => setIsAddEventModalOpen(true)}
          />
          <h2 className="ml-2 text-xl font-bold leading-none text-black">
            {format(activeDate, dateFormatByView?.[viewValue])}
          </h2>
        </div>
        <h2 className="ml-2 text-xl font-bold leading-none text-black md:hidden">
          {format(activeDate, dateFormatByView?.[viewValue])}
        </h2>
        <div className={"flex items-center gap-2"}>
          <Button
            onClick={() => {
              appDispatch(logout());
            }}
            variant="text"
            size={"sm"}
          >
            Log out
          </Button>
          <div className={"flex items-center gap-2 rounded md:border md:p-1.5"}>
            <div className={"hidden flex-col md:flex"}>
              <span className={"text-sm font-bold text-black"}>
                {userData?.firstName}
              </span>
              <span className={"text-sm text-black"}>{userData?.lastName}</span>
            </div>
            <div
              className={
                "flex h-9 w-9 items-center justify-center rounded-full bg-gray-300"
              }
            >
              {userData?.firstName?.[0]}
            </div>
          </div>
        </div>
        <AddEventModal
          handler={() => setIsAddEventModalOpen(false)}
          open={isAddEventModalOpen}
        />
      </div>
      {children}
      <div
        className={
          "flex items-center justify-center gap-1 border-t border-black py-2 md:hidden"
        }
      >
        <Navigation
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          onClickToday={onClickToday}
          handleChangeView={handleChangeView}
          viewValue={viewValue}
          onClickAddEvent={() => setIsAddEventModalOpen(true)}
        />
      </div>
    </>
  );
};

export default memo(CalendarHeader);
