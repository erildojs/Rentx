
interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number
  convertToUtc(date: string): string
  dateNow(): Date
  compareInDays(start_date: Date, end_date: Date): number,
  addDays(days: number): Date
}

export {IDateProvider}