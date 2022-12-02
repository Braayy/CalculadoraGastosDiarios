import { Component, createSignal } from "solid-js";
import { CalculatorFormData } from "../types";

interface CalculatorFormProps {
    onSubmit: (data: CalculatorFormData) => void
}

const CalculatorForm: Component<CalculatorFormProps> = (props) => {
    const [dailyValue, setDailyValue] = createSignal(0);
    const [ignoredDays, setIgnoredDays] = createSignal(0);
    const [startDate, setStartDate] = createSignal(new Date());
    const [endDate, setEndDate] = createSignal(new Date());

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

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        props.onSubmit(new CalculatorFormData(
            dailyValue(),
            ignoredDays(),
            startDate(),
            endDate()
        ));
    }

    return (
        <form class="col-5 mb-5" onSubmit={handleSubmit}>
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
    );
};

export default CalculatorForm;