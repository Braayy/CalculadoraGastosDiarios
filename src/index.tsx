/* @refresh reload */
import { render } from 'solid-js/web';
import parseRawHolidays from './HolidayParser';

import './assets/bootstrap.min.css';
import App from './App';

import feriados from './assets/feriados.json';
const holidays = parseRawHolidays(feriados);

render(
    () => <App holidays={holidays} />,
    document.getElementById('root') as HTMLElement
);
