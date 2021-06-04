/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export const dayMs = 86400000;
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();

// Checks if the passed value is a valid Date object and is in the future
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isValidFutureDate(input: any) {
  // Date.parse() returns NaN for all invalid dates and milliseconds for valid dates
  const dateTime = Date.parse(input);
  if (Number.isNaN(dateTime)) return false;
  if (dateTime < new Date().getTime()) return false;
  return true;
}

export function isAgreementPaused(paused_until_date: string): boolean {
  // If agreement is currently paused, next charge day is 4 days after pause ends
  if (paused_until_date && new Date(paused_until_date) > new Date()) {
    return true;
  }
  return false;
}

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

export function formatChargeDay(chargeDay: number): string {
  if (chargeDay === 0) return "Den siste dagen i måneden";
  return `Den ${chargeDay}. hver måned`;
}

export function formatDate(date: Date): string {
  return moment(date).format("DD.MM.YYYY");
}

// Only called once when starting the app
export function getNextChargeDate(
  monthly_charge_day: number,
  monthAlreadyCharged: boolean,
  pausedUntilDate: string,
  forcedChargeDate: Date,
  pendingChargeDueDate: Date | false,
  todayDate: Date = new Date() // Used for mocking today in tests
): Date {
  // Gets the last day of this month
  if (monthly_charge_day === 0)
    monthly_charge_day = new Date(thisYear, thisMonth + 1, 0).getDate();

  const chargeDateThisMonth = new Date(thisYear, thisMonth, monthly_charge_day);
  const chargeDateNextMonth = new Date(
    thisYear,
    thisMonth + 1,
    monthly_charge_day
  );

  if (pendingChargeDueDate) return pendingChargeDueDate;

  // If agreement is currently paused, next charge day is 4 days after pause ends
  if (isAgreementPaused(pausedUntilDate)) {
    const nextChargeTime = new Date(pausedUntilDate).getTime() + 4 * dayMs;
    return new Date(nextChargeTime);
  }

  if (monthAlreadyCharged) {
    // If next month has a forced charge date that is earlier than regular monthly_charge_day
    if (
      isValidFutureDate(forcedChargeDate) &&
      forcedChargeDate < chargeDateNextMonth
    ) {
      return forcedChargeDate;
    }
    return new Date(thisYear, thisMonth + 1, monthly_charge_day);
  }
  if (!monthAlreadyCharged) {
    // If today is before the charge day
    if (todayDate.getDate() < monthly_charge_day) {
      if (isValidFutureDate(forcedChargeDate)) {
        if (forcedChargeDate < chargeDateThisMonth)
          return new Date(forcedChargeDate);
      }
      return new Date(thisYear, thisMonth, monthly_charge_day);
    }
    // if today is past the charge day
    if (todayDate.getDate() >= monthly_charge_day) {
      // If there is a valid forced charge date (intended behavior)
      if (isValidFutureDate(forcedChargeDate))
        return new Date(forcedChargeDate);
      // No forced charge date this month (skips charging this month)
      return new Date(thisYear, thisMonth + 1, monthly_charge_day);
    }
  }
  return new Date();
}

// request payload for updateChargeDay() in requests.ts
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
