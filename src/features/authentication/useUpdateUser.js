import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: () => {
      toast.success("successfully updated current user");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Could not update current user");
    },
  });
  return { updateUser, isUpdating };
}
