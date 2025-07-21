import { addMinutes, compareAsc, format, setHours, setMinutes } from 'date-fns';

export const dateToTimeStringFormatter = (date: Date) => format(date, 'H:mm');
export const dateToStringFormatter = (date: Date) => format(date, 'yyyy-MM-dd');

export const generateTimeSlots = (
  duration: number,
  existingSlots: Date[],
  selectedDate: string,
): string[] => {
  const slots: string[] = [];
  const existingSlotsToString: string[] = existingSlots.map((slot) =>
    dateToTimeStringFormatter(slot),
  );

  const currDate = new Date();

  let time = setMinutes(setHours(new Date(selectedDate), 9), 0); // Start at 9:00 AM
  while (time.getHours() < 17) {
    // Until 5:00 PM
    const slotString = dateToTimeStringFormatter(time);
    if (
      compareAsc(time, currDate) === 1 &&
      !existingSlotsToString.includes(slotString)
    ) {
      slots.push(dateToTimeStringFormatter(time));
    }
    time = addMinutes(time, duration);
  }
  return slots;
};
