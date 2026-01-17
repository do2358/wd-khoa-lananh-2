import { HeartIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { dateFns } from '@/libs/date';
import { cn } from '@/libs/utils';

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

  return (
    <div className={cn('mt-4', mediaAbove900 ? 'grid grid-cols-2' : 'flex flex-col')}>
      {mediaAbove900 && (
        <div className="mt-3 grid grid-cols-7 gap-2 p-3">
          {days.map((v, i) => (
            <div key={uid + 'currCalendarDay' + i} className={cn('w-12 text-center', [0, 6].includes(i) && 'opacity-50')}>
              {v}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 grid grid-cols-7 gap-2 p-3">
        {days.map((v, i) => (
          <div key={uid + 'nextCalendarDay' + i} className={cn('w-12 text-center', [0, 6].includes(i) && 'opacity-50')}>
            {v}
          </div>
        ))}
      </div>

      {mediaAbove900 && (
        <div className="relative grid grid-cols-7 gap-2 p-3">
          {currCalendar.map((item, index) => {
            if (!item) return <span key={uid + 'currCalendar' + index + 1}></span>;

            const currentDate = new Date(currYear, currMonth, item);
            return (
              <button
                key={uid + 'currCalendar' + item + index}
                className={cn(
                  'flex size-11 items-center justify-center rounded-full bg-white p-2 hover:bg-red-600 hover:text-white sm:size-12',
                  dateFns.isSameDay(currentDate, dateRange.startDate!) ? 'bg-red-50 text-red-600 opacity-100' : '',
                  isBetween(currentDate, dateRange.startDate!, dateRange.endDate!, '[]') ? 'bg-red-50 text-red-600' : 'opacity-80',
                  dateFns.isSameDay(currentDate, new Date()) && 'bg-red-50 font-[600] text-red-600 underline opacity-100 ring-1 ring-red-400',
                  dateFns.isSameDay(currentDate, dateRange.endDate!) ? 'relative !bg-transparent text-xl font-[600] !text-white [&>svg]:block' : '',
                )}
              >
                <span className="z-[2]">{item}</span>
                <HeartIcon fill="currentColor" className="absolute -top-px left-[-6px] z-[1] hidden size-[54px] text-red-500 sm:top-[-px] sm:left-[-3px]" />
              </button>
            );
          })}
          <div className="absolute top-3 left-0 -z-10 pl-5">
            <span className="text-5xl font-[600] text-gray-100">{currMonth + 1}</span>
          </div>
        </div>
      )}

      <div className="relative grid grid-cols-7 gap-2 p-3">
        {nextCalendar.map((item, index) => {
          if (!item) return <span key={uid + 'nextCalendar' + index + 1}></span>;
          const currentDate = dateFns.add(new Date(currYear, currMonth, item), {
            months: 1,
          });
          return (
            <button
              key={uid + 'nextCalendar' + item + index}
              className={cn(
                'flex size-11 items-center justify-center rounded-full bg-white p-2 hover:bg-red-600 hover:text-white sm:size-12',
                dateFns.isSameDay(currentDate, dateRange.startDate!) ? 'bg-red-50 text-red-600 opacity-100' : '',
                isBetween(currentDate, dateRange.startDate!, dateRange.endDate!, '[]') ? 'bg-red-50 text-red-600' : 'opacity-80',
                dateFns.isSameDay(currentDate, new Date()) && 'bg-red-50 font-[600] text-red-600 underline opacity-100 ring-1 ring-red-400',
                dateFns.isSameDay(currentDate, dateRange.endDate!) ? 'relative !bg-transparent text-xl font-[600] !text-white [&>svg]:block' : '',
              )}
            >
              <span className="z-[2]">{item}</span>
              <HeartIcon fill="currentColor" className="absolute -top-px left-[-6px] z-[1] hidden size-[54px] text-red-500 sm:top-[-px] sm:left-[-3px]" />
            </button>
          );
        })}

        <div className="absolute top-3 left-0 -z-10 pl-5">
          <span className="text-5xl font-[600] text-gray-100">{currMonth + 2}</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
