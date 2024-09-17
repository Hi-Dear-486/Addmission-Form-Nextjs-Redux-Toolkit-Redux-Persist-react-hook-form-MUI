import { format } from "date-fns";

export const formatAdmissionDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

export const getCurrentDate = () => {
  const now = new Date();

  const formattedDate = format(now, "yyyy-MM-dd");
  return formattedDate;
};
