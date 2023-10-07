import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useDeleteBook() {
  const queryClient = useQueryClient();
  const { mutate: removeBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("successfully delete booking");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("fail to delete Booking");
    },
  });
  return { removeBooking, isDeleting };
}
