import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success("successful log out");
      queryClient.removeQueries();
    },
    onError: () => {
      toast.error("could not log out");
    },
  });
  return { logout, isLoading };
}
