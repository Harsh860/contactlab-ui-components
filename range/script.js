'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RangeClab = (function () {
	function RangeClab() {
		_classCallCheck(this, RangeClab);
	}

	_createClass(RangeClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "range-clab";
			this.properties = {
				label: {
					type: String
				},
				name: {
					type: String,
					value: 'rangeinput'
				},
				type: {
					type: String,
					value: 'primary'
				},
				value: {
					type: Number,
					notify: true,
					reflectToAttribute: true
				},
				min: {
					type: Number
				},
				max: {
					type: Number
				},
				step: {
					type: Number
				},
				showDetails: {
					type: Boolean,
					value: false
				},

				rangeWrapperClasses: {
					type: String,
					computed: 'computeRangeWrapperClasses(showDetails)'
				}
			};
		}

		/*_computeType(type){
  	let arr = ['input-wrapper'];
  	arr.push(type);
  	return arr.join(' ');
  }*/

	}, {
		key: 'computeRangeWrapperClasses',
		value: function computeRangeWrapperClasses(show) {
			var name = undefined;
			if (show) name = 'details';
			return ['range-wrapper', name].join(' ');
		}
	}, {
		key: '_updateCompValue',
		value: function _updateCompValue(evt) {
			this.value = this.$$('input').value;
		}
	}, {
		key: '_dashify',
		value: function _dashify(label) {
			return label.toLowerCase().replace(' ', '-');
		}
	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}]);

	return RangeClab;
})();

Polymer(RangeClab);