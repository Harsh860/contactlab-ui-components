'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import { dashify, viewLabel } from './../_libs/utils';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/polymer/lib/elements/dom-if';

class RangeClab extends mixinBehaviors([{ dashify, viewLabel }], PolymerElement)  {

  static get is() { return 'range-clab'; }

  static get template() { return template; }

  static get properties() { return props; }


  /*----------
  EVENT HANDLERS
  ----------*/
  _updateCompValue(evt) {
    this.value = parseInt(evt.currentTarget.value);
  }


  /*----------
  OBSERVERS
  ----------*/
  disabledChanged(newVal, oldVal) {
    if(newVal) this.type = 'disabled';
  }



  /*----------
  COMPUTED
  ----------*/
  computeRangeWrapperClasses(show) {
    let name;
    if(show) name = 'details';
    return ['range-wrapper', name].join(' ');
  }

}


customElements.define(RangeClab.is, RangeClab);
