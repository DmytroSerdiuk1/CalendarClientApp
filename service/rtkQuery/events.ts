import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/service/axios";
import { format } from "date-fns";
import { EventData } from "@/types/EventData";

export const eventsApi = createApi({
  tagTypes: ["Event"],
  baseQuery: axiosBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getEvents: build.query({
      query: ({ fromDate, toDate }: { fromDate: string; toDate: string }) => ({
        url: "/events",

        params: {
          fromDate,
          toDate,
        },
        method: "GET",
      }),
      transformResponse(res: EventData[]) {
        return res.reduce(
          (previousValue, currentValue) => {
            const dateFormat = format(
              new Date(currentValue.date),
              "yyyy_MM_dd",
            );
            if (previousValue[dateFormat]) {
              previousValue[dateFormat].push(currentValue);
            } else {
              previousValue[dateFormat] = [currentValue];
            }
            return previousValue;
          },
          {} as { [key: string]: EventData[] },
        );
      },
      providesTags: (res = {}) => [
        "Event",
        ...Object.values(res).reduce(
          (acc: any, item: EventData[]) => [
            ...acc,
            ...item.map((e) => ({ type: "Event", id: e.id })),
          ],
          [],
        ),
      ],
    }),
    addEvent: build.mutation({
      query: ({ ...data }: EventData) => {
        return {
          url: "/event",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    updateEvent: build.mutation({
      query: (event: EventData) => ({
        url: `/event`,
        method: "patch",
        data: event,
      }),
      invalidatesTags: (r, e, arg) => [{ type: "Event", id: arg.id }],
    }),
    deleteEvent: build.mutation({
      query: (id: string) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (r, e, id) => [{ type: "Event", id }],
    }),
    unAuthorized: build.mutation({
      queryFn: () => ({
        data: null,
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
