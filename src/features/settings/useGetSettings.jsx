import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
  const { isLoading, data: settings } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });
  return { isLoading, settings };
}
