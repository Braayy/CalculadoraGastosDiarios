import { Component, For, Show } from 'solid-js';
import { createSignal } from 'solid-js';
import { Holiday } from './types';

class AppResult {
    public readonly value: number;
    public readonly holidays: Holiday[];

    constructor(value: number, holidays: Holiday[]) {
        this.value = value;
        this.holidays = holidays;
    }
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

const App: Component<{ holidays: Holiday[] }> = (props) => {
    const [dailyValue, setDailyValue] = createSignal(0);
    const [ignoredDays, setIgnoredDays] = createSignal(0);
    const [startDate, setStartDate] = createSignal(new Date());
    const [endDate, setEndDate] = createSignal(new Date());
    const [result, setResult] = createSignal<AppResult | null>(null);

    function calculate(event: SubmitEvent) {
        event.preventDefault();

        let validDays = 0;
        let holidays = [];
        for (const date of getDatesBetween(startDate(), endDate())) {
            if (isIgnoredDaysBitSet(7)) {
                const holiday = getHolidayByDate(date, props.holidays);
                if (holiday != null) {
                    holidays.push(holiday);
                    continue;
                }
            }

            if (isIgnoredDaysBitSet(date.getDay())) {
                continue;
            }

            validDays++;
        }

        setResult(new AppResult(validDays * dailyValue(), holidays));
    }

    function handleStartDateInput(event: InputEvent) {
        const targetElement = event.target as HTMLInputElement;
        setStartDate(new Date(Date.parse(targetElement.value.replaceAll('-', '/'))));
    }

    function handleEndDateInput(event: InputEvent) {
        const targetElement = event.target as HTMLInputElement;
        setEndDate(new Date(Date.parse(targetElement.value.replaceAll('-', '/'))));
    }

    function toggleIgnoredDaysBit(bitIndex: number) {
        setIgnoredDays(ignoredDays() ^ (1 << bitIndex));
    }

    function isIgnoredDaysBitSet(bitIndex: number): boolean {
        return (ignoredDays() & (1 << bitIndex)) > 0;
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
            <div class="">
                <h1 class="text-center">Calculadora de Gastos Diários</h1>
            </div>
            <form class="col-5 mb-5" onSubmit={calculate}>
                <div class="mb-3 col-6">
                    <div class="input-group">
                        <span class="input-group-text">R$</span>
                        <input type="number" step=".01" class="form-control" name="value" id="value" placeholder="Valor Diário" onInput={(event) => setDailyValue(parseFloat((event.target as HTMLInputElement).value))} />
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-text mb-1">Selecione os dias que não entrarão na conta:</div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="sunday" id="sunday" onInput={() => toggleIgnoredDaysBit(0)} />
                        <label class="form-check-label" for="sunday">Domingo</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="monday" id="monday" onInput={() => toggleIgnoredDaysBit(1)} />
                        <label class="form-check-label" for="monday">Segunda-Feira</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="tuesday" id="tuesday" onInput={() => toggleIgnoredDaysBit(2)} />
                        <label class="form-check-label" for="tuesday">Terça-Feira</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="wednesday" id="wednesday" onInput={() => toggleIgnoredDaysBit(3)} />
                        <label class="form-check-label" for="wednesday">Quarta-Feira</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="thursday" id="thursday" onInput={() => toggleIgnoredDaysBit(4)} />
                        <label class="form-check-label" for="thursday">Quinta-Feira</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="friday" id="friday" onInput={() => toggleIgnoredDaysBit(5)} />
                        <label class="form-check-label" for="friday">Sexta-Feira</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="saturday" id="saturday" onInput={() => toggleIgnoredDaysBit(6)} />
                        <label class="form-check-label" for="saturday">Sábado</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="holidays" id="holidays" onInput={() => toggleIgnoredDaysBit(7)} />
                        <label class="form-check-label" for="holidays">Feriados</label>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Início</span>
                            <input type="date" class="form-control" name="start-period" onInput={handleStartDateInput} />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Fim</span>
                            <input type="date" class="form-control" name="end-period" onInput={handleEndDateInput} />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <input type="submit" class="btn btn-lg btn-success" value="Calcular" />
                </div>
            </form>
            <Show when={result() != null}>
                <p class="lead">O valor calculado para o periodo de <strong>{formatDate(startDate())}</strong> até <strong>{formatDate(endDate())}</strong> é de <strong>R${result()?.value.toFixed(2)}</strong></p>
                <Show when={(result()?.holidays?.length || 0) > 0}>
                    <p>Foram encontrados os seguintes feriados:</p>
                    <ul class="list-group">
                        <For each={result()?.holidays}>{(holiday) =>
                            <li class="list-group-item">{holiday.date.day}/{holiday.date.month} - {holiday.name}</li>
                        }</For>
                    </ul>
                </Show>
            </Show>
            <a href="https://github.com/Braayy/CalculadoraGastosDiarios" target="_blank" class="link-primary">Código Fonte</a>
            <p>* Os feriados utilizados são validos para o município de Niterói/RJ</p>
        </div>
    );
};

export default App;
