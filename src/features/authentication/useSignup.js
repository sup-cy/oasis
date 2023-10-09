import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success(
        "Account successfully created! please vertify the new account from the user's email address"
      );
    },
    onError: () => {
      toast.error("fail to sign up");
    },
  });
  return { signup, isLoading };
}
