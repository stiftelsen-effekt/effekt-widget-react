/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export const dayMs = 86400000;
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();

// Checks if the due date of a charge is at least three days ahead of today
export function isThreeDaysAfterToday(
  dueDate: Date,
  todayDate: Date = new Date()
): boolean {
  const dd = dueDate.getDate();
  const mm = dueDate.getMonth();
  const yyyy = dueDate.getFullYear();

  const futureDate = new Date(yyyy, mm, dd);
  const timeDifference = futureDate.getTime() - todayDate.getTime();
  const daysAhead = timeDifference / (1000 * 3600 * 24);

  if (daysAhead <= 3) return false;
  return true;
}

export function formatDate(date: Date): string {
  return moment(date).format("DD.MM.YYYY");
}

export interface NewChargeDayResults {
  newChargeDay: number;
  forcedChargeDate: Date | false;
  nextChargeDate: Date;
}

// Called when selecting a new charge date
// Gets the results from updating the monthly charge day
export function getNewChargeDayResults(
  newChargeDay: number
): NewChargeDayResults {
  // 96 hours ahead of right now
  const todayDate = new Date();
  const fourDaysAhead = new Date(todayDate.getTime() + dayMs * 4);

  // Gets the last day of this month
  if (newChargeDay === 0) {
    newChargeDay = new Date(thisYear, thisMonth + 1, 0).getDate();
  }

  const newChargeDateThisMonth = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    newChargeDay
  );

  let forcedChargeDate: Date | false = false;
  let nextChargeDate = newChargeDateThisMonth;

  // If the next charge date is less three days after today
  if (!isThreeDaysAfterToday(newChargeDateThisMonth, todayDate)) {
    forcedChargeDate = fourDaysAhead;
    nextChargeDate = fourDaysAhead;
  }
  return { newChargeDay, forcedChargeDate, nextChargeDate };
}
