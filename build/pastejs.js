'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pastejs = function () {
	function Pastejs(opts) {
		_classCallCheck(this, Pastejs);

		this.isDebug = opts.isDebug || false;
		this.target = opts.target || null;
		this.callBack = opts.callBack || function () {};

		this._init();
	}

	_createClass(Pastejs, [{
		key: '_init',
		value: function _init() {
			var self = this,
			    target = self.target;
			if (!target) this.throwIf('必须传入note参数');

			self._bindEvent();
		}
	}, {
		key: '_bindEvent',
		value: function _bindEvent() {
			var self = this,
			    target = self.target;
			target.addEventListener("paste", function (e) {
				if (!(e.clipboardData && e.clipboardData.items && e.clipboardData.items[0])) {
					this.throwIf('不支持剪切板事件');
					return;
				}
				var items = e.clipboardData.items,
				    paste = [];
				if (items) {
					for (var i = 0; i < items.length; i++) {
						if (items[i].type.indexOf("image") !== -1) {
							var blob = items[i].getAsFile();
							var URLObj = window.URL || window.webkitURL || window.createObjectURL;
							var source = URLObj.createObjectURL(blob);
							paste['blob'] = blob;
							paste['source'] = source;
							self.callBack(paste);
						}
					}
				}
			});
		}
		//错误数据弹出

	}, {
		key: 'throwIf',
		value: function throwIf() {
			var msg = arguments.length <= 0 || arguments[0] === undefined ? '未知错误' : arguments[0];

			if (this.isDebug) {
				alert(msg);
				return;
			}
		}
	}]);

	return Pastejs;
}();