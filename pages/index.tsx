"use client";
import { addDays, addMonths, subDays, subMonths } from "date-fns";
import { useEffect, useRef, useState } from "react";
import CalendarHeader from "@/components/CalendarHeader/CalendarHeader";
import CalendarDaysGrid from "@/components/Calendar/CalendarDaysGrid";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
} from "@/service/rtkQuery/events";
import dynamic from "next/dynamic";
import { CalendarViews } from "@/enums/CalendarViews";
import { EventData } from "@/types/EventData";
import { useRouter } from "next/router";

const AddEventModal = dynamic(
  () => import("@/components/Modals/AddEventModal"),
  { ssr: false },
);

export default function Home() {
  const router = useRouter();
  const editData = useRef<EventData | null>(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [activeView, setActiveView] = useState<CalendarViews>(
    (router.query.view as CalendarViews) || CalendarViews.MONTH,
  );
  const [startOfTheSelectedMonth, setStartOfTheSelectedMonth] = useState(
    new Date(),
  );
  const [endOfTheSelectedMonth, setEndOfTheSelectedMonth] = useState(
    new Date(),
  );
  const [activeDate, setActiveDate] = useState(
    router.query.date ? new Date(router.query.date as string) : new Date(),
  );

  const { data: events, isLoading: isEventLoading } = useGetEventsQuery({
    fromDate: startOfTheSelectedMonth.toDateString(),
    toDate: endOfTheSelectedMonth.toDateString(),
  });

  const [deleteEvent] = useDeleteEventMutation();

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        view: activeView,
        date: activeDate.toDateString(),
      },
    });
  }, [activeView, activeDate]);

  const navigateByView = {
    prev: {
      [CalendarViews.MONTH]: () => setActiveDate(subMonths(activeDate, 1)),
      [CalendarViews.DAY]: () => setActiveDate(subDays(activeDate, 1)),
    },
    next: {
      [CalendarViews.MONTH]: () => setActiveDate(addMonths(activeDate, 1)),
      [CalendarViews.DAY]: () => setActiveDate(addDays(activeDate, 1)),
    },
  };

  return (
    <div className="text-gray-700">
      <AddEventModal
        editData={editData.current}
        open={isOpenEditModal}
        handler={() => setIsOpenEditModal(false)}
      />
      <div className="flex h-screen w-screen flex-grow overflow-hidden">
        <div className="flex max-h-[100vh] flex-grow flex-col">
          <CalendarHeader
            viewValue={activeView}
            handleChangeView={(view) => {
              setActiveView(view);
              setActiveDate(new Date());
            }}
            activeDate={activeDate}
            onClickToday={() => setActiveDate(new Date())}
            onClickNext={() => navigateByView.next[activeView]()}
            onClickPrev={() => navigateByView.prev[activeView]()}
          >
            <CalendarDaysGrid
              currentView={activeView}
              activeDate={activeDate}
              getSelectedDate={(fromDate: Date, toDate: Date): void => {
                router.replace({
                  query: {
                    ...router.query,
                    start: fromDate.toDateString(),
                    end: toDate.toDateString(),
                  },
                });
                setStartOfTheSelectedMonth(fromDate);
                setEndOfTheSelectedMonth(toDate);
              }}
              onDelete={deleteEvent}
              onEdit={(event) => {
                setIsOpenEditModal(true);
                editData.current = event;
              }}
              isLoading={isEventLoading}
              events={events || {}}
            />
          </CalendarHeader>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      isProtected: true,
    },
  };
}
