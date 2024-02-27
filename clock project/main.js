import { format } from 'date-fns-tz';

class Clock {
  constructor(locale) {
    this.locale = locale;
    this.clockEl = null;
    this.initializeClock();
    this.updateClock();
  }

  initializeClock() {
    this.clockEl = document.createElement('div');
    this.clockEl.classList.add('clock');
    document.querySelector(`[data-locale="${this.locale}"] .clock--wrapper`).appendChild(this.clockEl);
  }

  updateClock() {
    const now = new Date();
    const formattedTime = format(now, 'HH:mm:ss', { timeZone: this.locale });
    this.clockEl.textContent = formattedTime;
    setTimeout(() => this.updateClock(), 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const clockWrappers = document.querySelectorAll('.clock--wrapper');
  clockWrappers.forEach(wrapper => {
    const locale = wrapper.dataset.locale;
    new Clock(locale);
  });
});