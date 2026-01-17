import { HeartIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { dateFns } from '@/libs/date';
import { cn } from '@/libs/utils';

import ScrollArea from '../ScrollArea';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

type TCalendarProps = { initialRange?: DateRange };

const Calendar = ({ initialRange }: TCalendarProps) => {
  const uid = useId();
  const mediaAbove900 = useMediaQuery({ minWidth: 900 });

  const [currCalendar, setCurrCalendar] = useState<Array<number | null>>([]);
  const [nextCalendar, setNextCalendar] = useState<Array<number | null>>([]);
  const [currMonth, setCurrMonth] = useState<number>((initialRange?.startDate || new Date()).getMonth());
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());

  const [dateRange, setDateRange] = useState<DateRange>({
    // startDate: new Date(),
    startDate: initialRange?.startDate ?? new Date(),
    endDate: initialRange?.endDate ?? dateFns.add(new Date(), { days: 20 }),
  });

  const days: string[] = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const generateCalendar = ({ month, year }: { month: number; year: number }) => {
    const startOfMonth = dateFns.startOfMonth(new Date(year, month));
    const endOfMonth = dateFns.endOfMonth(new Date(year, month));
    const startDay = startOfMonth.getDay();
    const daysInMonth = dateFns.getDaysInMonth(startOfMonth);
    const days = [...Array(daysInMonth).keys()].map((v) => v + 1);
    const calendar = [...Array(42).keys()].map((v) => {
      if (v < startDay) {
        return null;
      }
      if (v > daysInMonth + startDay - 1) {
        return null;
      }
      return days[v - startDay];
    });
    return calendar;
  };

  const isBetween = (date: Date, from: Date, to: Date, inclusivity: '()' | '[]' | '(]' | '[)' = '()') => {
    if (!['()', '[]', '(]', '[)'].includes(inclusivity)) {
      throw new Error('Inclusivity parameter must be one of (), [], (], [)');
    }

    const isBeforeEqual = inclusivity[0] === '[',
      isAfterEqual = inclusivity[1] === ']';

    return (
      (isBeforeEqual ? dateFns.isEqual(from, date) || dateFns.isBefore(from, date) : dateFns.isBefore(from, date)) &&
      (isAfterEqual ? dateFns.isEqual(to, date) || dateFns.isAfter(to, date) : dateFns.isAfter(to, date))
    );
  };

  useEffect(() => {
    const _currCalendar = generateCalendar({
      month: new Date(currYear, currMonth).getMonth(),
      year: new Date(currYear, currMonth).getFullYear(),
    });
    setCurrCalendar(_currCalendar);

    const _nextCalendar = generateCalendar({
      month: dateFns.add(new Date(currYear, currMonth), { months: 1 }).getMonth(),
      year: dateFns.add(new Date(currYear, currMonth), { months: 1 }).getFullYear(),
    });
    setNextCalendar(_nextCalendar);
  }, [currMonth, currYear]);

  const renderCalendarMonth = (calendar: Array<number | null>, monthOffset: number, monthLabel: number) => (
    <div className="relative min-w-[300px] flex-shrink-0 sm:min-w-0">
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 p-3 pb-1">
        {days.map((v, i) => (
          <div key={uid + 'day' + monthOffset + i} className={cn('w-10 text-center text-sm sm:w-12', [0, 6].includes(i) && 'opacity-50')}>
            {v}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="relative grid grid-cols-7 gap-2 p-3 pt-1">
        {calendar.map((item, index) => {
          if (!item) return <span key={uid + 'calendar' + monthOffset + index}></span>;

          const currentDate = dateFns.add(new Date(currYear, currMonth, item), {
            months: monthOffset,
          });

          return (
            <button
              key={uid + 'calendar' + monthOffset + item + index}
              className={cn(
                'relative flex size-10 items-center justify-center rounded-full bg-white p-2 text-sm hover:bg-red-600 hover:text-white sm:size-12 sm:text-base',
                dateFns.isSameDay(currentDate, dateRange.startDate!) ? 'bg-red-50 text-red-600 opacity-100' : '',
                isBetween(currentDate, dateRange.startDate!, dateRange.endDate!, '[]') ? 'bg-red-50 text-red-600' : 'opacity-80',
                dateFns.isSameDay(currentDate, new Date()) && 'bg-red-50 font-[600] text-red-600 underline opacity-100 ring-1 ring-red-400',
                dateFns.isSameDay(currentDate, dateRange.endDate!) ? 'relative !bg-transparent text-lg font-[600] !text-white sm:text-xl [&>svg]:block' : '',
              )}
            >
              <span className="z-[2]">{item}</span>
              <HeartIcon fill="currentColor" className="absolute top-1/2 left-1/2 z-0 hidden size-[46px] -translate-x-1/2 -translate-y-1/2 text-red-500 sm:size-[54px]" />
            </button>
          );
        })}

        {/* Month Number Background */}
        <div className="pointer-events-none absolute top-1 left-0 -z-10 pl-4 sm:pl-5">
          <span className="text-4xl font-[600] text-gray-100 sm:text-5xl">{monthLabel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      {mediaAbove900 ? (
        // Desktop: Two columns side by side
        <div className="grid grid-cols-2">
          {renderCalendarMonth(currCalendar, 0, currMonth + 1)}
          {renderCalendarMonth(nextCalendar, 1, currMonth + 2)}
        </div>
      ) : (
        // Mobile: Horizontal scroll
        <ScrollArea suppressScrollY className="w-dvw">
          <div className="flex gap-0 px-4">
            {renderCalendarMonth(currCalendar, 0, currMonth + 1)}
            {renderCalendarMonth(nextCalendar, 1, currMonth + 2)}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Calendar;
