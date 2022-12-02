import { Component, For, Show } from 'solid-js';
import { createSignal } from 'solid-js';
import { CalculatorForm, CalculatorFormData } from './components/CalculatorForm';
import { Holiday } from './types';

class Calculation {
    constructor(
        public readonly startDate: string,
        public readonly endDate: string,
        public readonly value: number,
        public readonly holidays: Holiday[]
    ) {}
}

function getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates = [];

    // Strip hours minutes seconds etc.
    let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
    );

    while (currentDate <= endDate) {
        dates.push(currentDate);

        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1, // Will increase month if over range
        );
    }

    return dates;
}

function letNotNull<T, V>(value: T | null, closure: (value: T) => V): V | null {
    if (value != null) {
        return closure(value);
    }
    return null;
}

const App: Component<{ holidays: Holiday[] }> = (props) => {
    const [calculation, setCalculation] = createSignal<Calculation | null>(null);

    function handleSubmit(data: CalculatorFormData) {
        const { dailyValue, ignoredDays, startDate, endDate } = data;
    
        let validDays = 0;
        let holidays = [];
        for (const date of getDatesBetween(startDate, endDate)) {
            if (isIgnoredDaysBitSet(ignoredDays, 7)) {
                const holiday = getHolidayByDate(date, props.holidays);
                if (holiday != null) {
                    holidays.push(holiday);
                    continue;
                }
            }

            if (isIgnoredDaysBitSet(ignoredDays, date.getDay())) {
                continue;
            }

            validDays++;
        }

        setCalculation(new Calculation(
            formatDate(startDate),
            formatDate(endDate),
            dailyValue * validDays,
            holidays,
        ));
    }

    function isIgnoredDaysBitSet(ignoredDays: number, bitIndex: number): boolean {
        return (ignoredDays & (1 << bitIndex)) > 0;
    }

    function getHolidayByDate(date: Date, holidays: Holiday[]): Holiday | null {
        for (const holiday of holidays) {
            if (date.getDate() == holiday.date.day && (date.getMonth() + 1) == holiday.date.month) {
                return holiday;
            }
        }
        return null;
    }

    function formatDate(date: Date): string {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }

    return (
        <div class="container min-vh-100 d-flex flex-column align-items-center">
            <div>
                <h1 class="text-center">Calculadora de Gastos Diários</h1>
            </div>
            <CalculatorForm onSubmit={handleSubmit} />
            <Show when={calculation() != null}>
                {letNotNull(calculation(), (calculation) =>
                    <div>
                        <p class="lead">O valor calculado para o periodo de <strong>{calculation.startDate}</strong> até <strong>{calculation.endDate}</strong> é de <strong>R${calculation.value.toFixed(2)}</strong></p>
                        <Show when={calculation.holidays.length > 0}>
                            <p>Foram encontrados os seguintes feriados durante o período selecionado:</p>
                            <ul class="list-group col-6">
                                <For each={calculation.holidays}>{(holiday) =>
                                    <li class="list-group-item">{holiday.date.day.toString().padStart(2, '0')}/{holiday.date.month.toString().padStart(2, '0')} - {holiday.name}</li>
                                }</For>
                            </ul>
                        </Show>
                    </div>
                )}
            </Show>
            <div class="flex-grow-1 d-flex flex-column justify-content-end">
                <a href="https://github.com/Braayy/CalculadoraGastosDiarios" target="_blank" class="link-primary text-center">Código Fonte</a>
                <p>* Os feriados utilizados são validos para o município de Niterói/RJ</p>
            </div>
        </div>
    );
};

export default App;
