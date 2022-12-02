export interface HolidayDate {
    day: number,
    month: number,
}

export interface Holiday {
    date: HolidayDate,
    name: string,
}

export class CalculatorFormData {
    constructor(
        public readonly dailyValue: number,
        public readonly ignoredDays: number,
        public readonly startDate: Date,
        public readonly endDate: Date,
    ) {}
}

export class CalculationResult {
    constructor(
        public readonly startDate: string,
        public readonly endDate: string,
        public readonly value: number,
        public readonly holidays: Holiday[]
    ) {}
}