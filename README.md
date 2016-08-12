# pastejs


> 从剪切板中粘贴图片到DOM上，仅支持chrome浏览器

[demo][1]

---
## install

    npm install pastejs
    
---
## usage
    
    const Pastejs = require('Pastejs');
    const pastejs = new Pastejs({
            isDebug: true,
            target : box,                                   //剪切区域(ID)
            callBack: function(paste){                      //回调，返回blob和剪切图片属性
                console.log(paste);
                document.getElementById("img").src = paste['source'];
                document.getElementById("text").innerHTML = "size:" + paste['blob'].size + "<br>type:" + paste['blob'].type;
            }
        });
---
## License
MIT


  [1]: http://jayzou.github.io/pastejs/index.html