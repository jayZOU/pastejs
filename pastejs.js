class Pastejs {
	constructor(opts) {
		this.isDebug = opts.isDebug || false;
		this.note = opts.note || null;
		this.callBack = opts.callBack || function(){};
		
		this._init();
	}

	_init() {
		let self = this,
			note = self.note;
		if(!note) this.throwIf('必须传入note参数');

		self._bindEvent();
	}

	_bindEvent() {
		let self = this,
			note = self.note;
		note.addEventListener("paste", function(e){
			if (!(e.clipboardData && e.clipboardData.items && e.clipboardData.items[0])){
                this.throwIf('不支持剪切板事件');
                return ;
            }
            // console.log(111);
            let item = e.clipboardData.items[0];


                if (item.kind == "file") {
                    let reader = new FileReader();
                    reader.onload = function(event) {
                    	console.log(event.target);
                    	// self.callBack(event.target.result);
                        // document.getElementById("img1").src = event.target.result;
                    };
                    reader.readAsDataURL(item.getAsFile());
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