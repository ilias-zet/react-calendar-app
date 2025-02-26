import { useEffect, useState } from "react";
import { getDateString } from "../utils";

const currentDate = new Date();

function useCalendar () {
  const currentYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    setSelectedYear(selectedMonthStart.getFullYear());
  }, [selectedMonth]);

  const selectedMonthStart = new Date(currentYear, selectedMonth, 1);

  const prevMonthEnd = new Date(currentYear, selectedMonth, 0);
  const selectedMonthEnd = new Date(currentYear, selectedMonth + 1, 0);

  const daysInPrevMonth = prevMonthEnd.getDate();
  const daysInSelectedMonth = selectedMonthEnd.getDate();

  const selectedMonthAndYear = selectedMonthStart.toLocaleString('default', { year: 'numeric', month: 'long' });

  const prevRest = selectedMonthStart.getDay();
  const nextRest = 6 - selectedMonthEnd.getDay();

  const showNext = () => {
    setSelectedMonth(prev => prev + 1);
  }

  const showPrev = () => {
    setSelectedMonth(prev => prev - 1);
  }

  return {
    title: selectedMonthAndYear,
    showNext,
    showPrev,
    selectedYear,
    days: {
      prevMonth: [...new Array(prevRest)].map((_, idx) => {
        const day = daysInPrevMonth - (prevRest - idx - 1);
        const date = new Date(currentYear, selectedMonth - 1, day);
  
        return ({
          id: getDateString(date),
          date,
          disabled: true,
        })
      }),
      selectedMonth: [...new Array(daysInSelectedMonth)].map((_, idx) => {
        const day = idx + 1;
        const date = new Date(currentYear, selectedMonth, day);
        const id = getDateString(date);
  
        return ({
          id,
          date,
          isCurrent: id === getDateString(currentDate),
        })
      }),
      nextMonth: [...new Array(nextRest)].map((_, idx) => {
        const day = idx + 1;
        const date = new Date(currentYear, selectedMonth + 1, day);

        return ({
          id: getDateString(date),
          date,
          disabled: true,
        })}
      ),
    }
  }
}

export default useCalendar;