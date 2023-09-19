import { addDays, endOfDay, format, startOfDay } from "date-fns";
import { BASE_URL } from "../consts/config";

const PAGE_LIMIT = 8;

// Utility function to get dates for date filter option
const getFilterDates = (dateFilter: number) => {
  let fromDate = startOfDay(new Date());
  let toDate = endOfDay(new Date());
  switch (dateFilter) {
    case 3:
      fromDate = addDays(fromDate, 1);
      toDate = addDays(toDate, 1);
      break;
    case 4:
      toDate = addDays(toDate, 7);
      break;
  }
  return [format(fromDate, "yyyy-MM-dd'T'HH:mm:ss"), format(toDate, "yyyy-MM-dd'T'HH:mm:ss")];
};

// Utility function to prepare url to get data based on different parameters 
export const prepareUrl = (
  pageNumber: number,
  categoryFilter?: number,
  searchString?: string,
  dateFilter?: number
) => {
  let url = `${BASE_URL}/events?_sort=startdatetime&_order=asc&_page=${pageNumber}&_limit=${PAGE_LIMIT}`;

  if (categoryFilter !== 7) {
    url += `&category_id=${categoryFilter}`;
  }

  if (searchString) {
    url += `&q=${searchString}`;
  }

  if (dateFilter && dateFilter !== 1) {
    const [fromDate, toDate] = getFilterDates(dateFilter);
    url += `&startdatetime_gte=${fromDate}&enddatetime_lte=${toDate}`;

  }

  return url;
};
