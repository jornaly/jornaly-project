import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { Tasks } from "./tables/dashboard/columns";

interface Props {
  setDateSelected: (data: any) => void;
  data: Tasks[];
}

export function CalendarPage({ data, setDateSelected }: Props) {
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    const dates = data
      ? data.map((item) => {
          const [year, month, day] = item.expiration.split("-");
          return new Date(Number(year), Number(month) - 1, Number(day));
        })
      : [];
    setDates(dates);
  }, [data]);

  const formatDate = (inputDate: Date) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Calendar
        locale={es}
        mode="single"
        modifiers={{ selected: dates }}
        className="rounded-md border"
        onDayClick={(day) => {
          setDateSelected(formatDate(day));
        }}
      />
    </>
  );
}
