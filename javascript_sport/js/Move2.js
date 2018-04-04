			function startMove(obj,json,fn){
				clearInterval(obj.timer);
//				var flag = true;
				obj.timer = setInterval(function(){
					//获取值		
					var flag = true;
					for(var attr in json){						
						var icur = 0;						
						if(attr == "opacity"){
							icur = Math.round(parseFloat(getStyle(obj,attr))*100); //获取小数 *100=整数
						}else{
							icur = parseInt(getStyle(obj,attr)); //getStyle（obj,attr） == obj.attr
						}
						//加速度
						var speed = (json[attr] - icur)/10;
						speed = speed>0?Math.ceil(speed):Math.floor(speed);
						if(icur != json[attr]){
							flag = false;
						}
						if(attr == "opacity"){
							obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
							obj.style.opacity = (icur + speed)/100;
						}else{
							obj.style[attr] = icur + speed + "px";
						}						
					}
					if(flag){
							clearInterval(obj.timer);
							if(fn){
								fn();
							}
							
					}
				},30)
			}

			function getStyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle;
				}else{
					return getComputedStyle(obj,false)[attr];
				}
			}