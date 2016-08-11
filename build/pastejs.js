'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pastejs = function () {
	function Pastejs(opts) {
		_classCallCheck(this, Pastejs);

		this.isDebug = opts.isDebug || false;
		this.note = opts.note || null;
		this.callBack = opts.callBack || function () {};

		this._init();
	}

	_createClass(Pastejs, [{
		key: '_init',
		value: function _init() {
			var self = this,
			    note = self.note;
			if (!note) this.throwIf('必须传入note参数');

			self._bindEvent();
		}
	}, {
		key: '_bindEvent',
		value: function _bindEvent() {
			var self = this,
			    note = self.note;
			note.addEventListener("paste", function (e) {
				if (!(e.clipboardData && e.clipboardData.items && e.clipboardData.items[0])) {
					this.throwIf('不支持剪切板事件');
					return;
				}
				// console.log(111);
				var item = e.clipboardData.items[0];

				if (item.kind == "file") {
					var reader = new FileReader();
					reader.onload = function (event) {
						console.log(event.target);
						// self.callBack(event.target.result);
						// document.getElementById("img1").src = event.target.result;
					};
					reader.readAsDataURL(item.getAsFile());
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