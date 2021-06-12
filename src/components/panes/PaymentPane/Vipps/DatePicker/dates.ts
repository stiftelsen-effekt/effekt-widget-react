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

export interface NextCharge {
  nextChargeDate: Date;
  captureChargeDate: Date | false;
  initialCharge: boolean;
}

export function calculateNextCharge(
  newChargeDay: number,
  chargeThisMonth: boolean
): NextCharge {
  const todayDate = new Date();

  // Gets the last day of this month
  if (newChargeDay === 0) {
    newChargeDay = new Date(thisYear, thisMonth + 1, 0).getDate();
  }

  const newChargeDateThisMonth = new Date(thisYear, thisMonth, newChargeDay);
  const newChargeDateNextMonth = new Date(
    thisYear,
    thisMonth + 1,
    newChargeDay
  );

  let initialCharge = false;
  let nextChargeDate = newChargeDateThisMonth;
  let captureChargeDate: Date | false = false;

  if (newChargeDay === new Date().getDate()) {
    initialCharge = true;
    nextChargeDate = todayDate;
  }

  if (newChargeDay > new Date().getDate()) {
    if (!isThreeDaysAfterToday(newChargeDateThisMonth, todayDate)) {
      initialCharge = true;
      captureChargeDate = newChargeDateThisMonth;
    }
    nextChargeDate = newChargeDateThisMonth;
  }

  if (newChargeDay < new Date().getDate()) {
    if (chargeThisMonth) {
      initialCharge = true;
      nextChargeDate = todayDate;
    }

    if (!chargeThisMonth) {
      nextChargeDate = newChargeDateNextMonth;
    }
  }
  return { nextChargeDate, captureChargeDate, initialCharge };
}
