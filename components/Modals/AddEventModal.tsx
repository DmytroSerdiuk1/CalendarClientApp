import React, { FC, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "@/service/rtkQuery/events";
import { EventData } from "@/types/EventData";
import { format } from "date-fns";
import { useSnackbar } from "notistack";

interface AddEventModalProps {
  open: boolean;
  handler: () => void;
  editData?: EventData | null;
}

const AddEventModal: FC<AddEventModalProps> = ({ editData, open, handler }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editData?.title || "",
      date: editData?.date || "",
      description: editData?.description || "",
    },
  });

  const [
    addEvent,
    { isLoading: isLoadingAddEvent, isSuccess: addEventSuccess },
  ] = useAddEventMutation();
  const [
    updateEvent,
    { isLoading: isLoadingUpdateEvent, isSuccess: updateEventSuccess },
  ] = useUpdateEventMutation();
  const onSubmit = (data: any) => {
    editData
      ? updateEvent({ ...data, id: editData.id })
          .unwrap()
          .then(() => {
            enqueueSnackbar("Event updated successfully", {
              variant: "success",
            });
          })
      : addEvent(data)
          .unwrap()
          .then(() => {
            enqueueSnackbar("Event created successfully", {
              variant: "success",
            });
          });
  };

  useEffect(() => {
    if (editData) {
      reset({
        title: editData.title,
        date: format(new Date(editData.date), "yyyy-MM-dd HH:mm"),
        description: editData.description,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (addEventSuccess || updateEventSuccess) {
      handler();
      reset();
    }
  }, [addEventSuccess, updateEventSuccess]);

  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader>
        <Typography variant="h3">
          {editData ? "Edit an event" : "Add an event"}
        </Typography>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody className={"flex flex-col gap-4 py-0"}>
          <Input
            error={!!errors.title}
            crossOrigin={"anonymous"}
            {...register("title", { required: true })}
            label={"Title"}
          />
          <Input
            error={!!errors.date}
            crossOrigin={"anonymous"}
            {...register("date", { required: true })}
            label={"Date"}
            type={"datetime-local"}
          />
          <Textarea {...register("description")} label={"Description"} />
        </DialogBody>
        <DialogFooter>
          {isLoadingAddEvent || isLoadingUpdateEvent ? (
            <div className={"flex w-full items-center justify-center"}>
              <Spinner className={"h-8"} />
            </div>
          ) : (
            <Button fullWidth type={"submit"}>
              {editData ? "Edit event" : "Add event"}
            </Button>
          )}
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default AddEventModal;
