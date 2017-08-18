'use strict';

import rome from 'rome';
import moment from 'moment';
import { dashify, viewLabel } from './../_libs/utils';
import props from './props';
import { clear, getLocale } from './methods/public';
import { _computeType, _getLocale, _getFormat } from './methods/internal';
import './view.html';
import "./../note";

class CalendarClab extends Polymer.mixinBehaviors(
  [{ dashify, viewLabel, getLocale, _computeType },
    Polymer.LegacyElementMixin], Polymer.Element) {

  static get is() { return 'calendar-clab' }

  static get properties() { return props }

  _initRome(){
    const selector = this.inline ? 'div.inline-cal' : "input";
    this.$$(selector) ? this._createInstance(selector) : null;
    return selector;
  }

  disconnectedCallback() {
    const calendar = rome.find(this.querySelector('input'));
    calendar ? calendar.destroy() : null;
  }


  /*----------
  EVENT HANDLERS
  ----------*/
  _checkClear(evt) {
    const newDate = evt.target.value;
    if (newDate === this.valueStr) return;

    if (evt.keyCode === 13) {
      if (newDate !== "") {
        this.valueStr = newDate;

        this.dispatchEvent(new CustomEvent('datechange', {
          bubbles: true,
          composed: true,
          detail: {
            date: newDate,
            dateISO: moment(new Date(newDate)).format()
          }
        }));
      }
      this.getRomeInstance().hide();
    }

    if (newDate === "" && this.valueStr !== null) {
      clear(this.getRomeInstance(), this.value, this.valueStr);
      this.dispatchEvent(new CustomEvent('datechange', {
        bubbles: true,
        composed: true,
        detail: {
          date: undefined,
          dateISO: undefined
        }
      }));
    }
  }

  _focusElement(evt) {
    if (!this.disabled) {
      evt.stopPropagation();
      this.getRomeInstance().show();
    }
  }


  /*----------
  METHODS
  ----------*/
  _createInstance(selector) {
    this.setLocale();
    const obj = typeof this.options === 'object' ? this.options : this.getRomeInstance().options();
    const currentCalendar = this.$$(selector);
    const cal = rome(currentCalendar, obj);

    cal.on('data', this._changeDate.bind(this))
    cal.on('next', evt => {
      this.cancelAsync(this._fireDate);
    })
    cal.on('back', evt => {
      this.cancelAsync(this._fireDate);
    })

    this.dispatchEvent(new CustomEvent('instance-created', {
      bubbles: true,
      composed: true,
      detail: currentCalendar,
    }));
  }

  _changeDate(newDate) {
    if (newDate === this.valueStr) return;

    this.cancelAsync(this._fireDate);
    this._fireDate = this.async(() => {
      this.valueStr = newDate;
      this.dispatchEvent(new CustomEvent('datechange', {
        bubbles: true,
        composed: true,
        detail: {
          date: newDate,
          dateISO: moment(new Date(newDate)).format()
        }
      }));
    }, 250);
  }


  /*----------
  PUBLIC METHODS
  ----------*/
  setValue(userValue) {
    this.valueStr = moment(userValue)
      .format(_getFormat(this.options, this.getRomeInstance()));
  }

  getValue() {
    const formatted = moment(this.valueStr,
      _getFormat(this.options, this.getRomeInstance())).format();
    return this.valueStr ? formatted : undefined;
  }

  setLocale() {
    rome.moment.locale(_getLocale(this.options));
  }

  getRomeInstance() {
    return rome.find(this.querySelector('input'));
  }

  restore(options) {
    const selector = this.inline ? 'div.inline-cal' : 'input';
    const currentCalendar = this.$$(selector);
    rome(currentCalendar).destroy();
    rome(currentCalendar).restore(options || this.options);
    return currentCalendar;
  }

}


customElements.define(CalendarClab.is, CalendarClab);
