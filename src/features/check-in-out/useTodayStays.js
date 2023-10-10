import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayStays() {
  const { data: todayStays, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["TodayStay"],
  });
  return { todayStays, isLoading };
}
