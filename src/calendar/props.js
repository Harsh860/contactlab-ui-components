'use strict';

export default {
  label: {
    type: String
  },
  disabled: {
    type: Boolean,
    value: false
  },
  valueStr: {
    type: String,
    value: null,
    notify: true
  },
  inline: {
    type: Boolean,
    value: false
  },
  options: {
    type: Object,
    value: {}
  },
  placeholder: {
    type: String,
    value: ''
  },
  type: {
    type: String
  },
  noteType: {
    type: String
  }
}
