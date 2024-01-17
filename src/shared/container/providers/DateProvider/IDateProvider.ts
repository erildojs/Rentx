
interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number
  convertToUtc(date: string): string
  dateNow(): Date
  compareInDays(start_date: Date, end_date: Date): number
}

export {IDateProvider}