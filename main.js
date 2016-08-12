const Pastejs = require('./src/pastejs');

// console.log(pastejs);

const pastejs = new Pastejs({
		isDebug: true,
		target : box,
		callBack: function(paste){
			console.log(paste);
			document.getElementById("img").src = paste['source'];
			document.getElementById("text").innerHTML = "size:" + paste['blob'].size + "<br>type:" + paste['blob'].type;
		}
	});

// console.log(Pastejs._init);