class Pastejs {
	constructor(opts) {
		this.isDebug = opts.isDebug || false;
		this.target = opts.target || null;
		this.callBack = opts.callBack || function(){};
		
		this._init();
	}
	_init() {
		let self = this,
			target = self.target;
		if(!target) this.throwIf('必须传入note参数');

		self._bindEvent();
	}
	_bindEvent() {
		let self = this,
			target = self.target;
		target.addEventListener("paste", function(e){
			if (!(e.clipboardData && e.clipboardData.items && e.clipboardData.items[0])){
                this.throwIf('不支持剪切板事件');
                return ;
            }
            let items = e.clipboardData.items,
            	paste = [];
            	if (items) {
		            for (var i = 0; i < items.length; i++) {
		                if (items[i].type.indexOf("image") !== -1) {
		                    let blob = items[i].getAsFile();
		                    let URLObj = window.URL || window.webkitURL || window.createObjectURL;
		                    let source = URLObj.createObjectURL(blob);
		                    paste['blob'] = blob;
		                    paste['source'] = source;
		                    self.callBack(paste)
		                }
		            }
		        }
		});
	}
	//错误数据弹出
	throwIf(msg = '未知错误') {
		if(this.isDebug){
			alert(msg);
			return;
		}
	}
}

module.exports = Pastejs;