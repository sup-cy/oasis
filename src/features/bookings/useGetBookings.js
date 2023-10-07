import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Fielter
  const fileldValue = searchParams.get("status");

  const filter =
    !fileldValue || fileldValue === "all"
      ? null
      : { field: "status", value: fileldValue, operator: "eq" };
  //SortBy
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [sortField, direction] = sortByValue.split("-");
  const sortBy = !sortByValue
    ? null
    : { field: sortField, value: direction === "asc" };

  //Pagination
  const page = Number(searchParams.get("page")) || 1;
  const {
    isLoading,
    data: { data: bookings, count } = {},

    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });
  //Prefetch
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  return { isLoading, bookings, error, count };
}
