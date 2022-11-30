/* @refresh reload */
import { render } from 'solid-js/web';
import { Holiday } from './types';
import parseRawHolidays from './HolidayParser';

import './assets/bootstrap.min.css';
import './index.css';
import App from './App';

import feriados from './assets/feriados.json';
const holidays = parseRawHolidays(feriados);

render(() => <App holidays={holidays} />, document.getElementById('root') as HTMLElement);
