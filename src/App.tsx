import { Component, For, Show, createSignal } from 'solid-js';
import CalculatorForm from './components/CalculatorForm';
import { CalculationResult, CalculatorFormData, Holiday } from './types';
import { formatDate, getDatesBetween, letNotNull } from './utils';

interface AppProps {
    holidays: Holiday[],
}

const App: Component<AppProps> = (props) => {
    const [calculationResult, setCalculationResult] = createSignal<CalculationResult | null>(null);

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

        setCalculationResult(new CalculationResult(
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

    return (
        <div class="container min-vh-100 d-flex flex-column align-items-center">
            <div>
                <h1 class="text-center">Calculadora de Gastos Diários</h1>
            </div>
            <CalculatorForm onSubmit={handleSubmit} />
            <Show when={calculationResult() != null}>
                {letNotNull(calculationResult(), (calculation) =>
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
