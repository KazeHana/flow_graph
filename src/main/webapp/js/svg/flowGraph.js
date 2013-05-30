(function(global){
	//画节点间的线条和箭头（动态根据2节点的位置）
	(!Raphael.fn.connection) && (Raphael.fn.connection = function(line){
		var drawLine = function(paper,x1,y1,x2,y2){
			var fAngle = 50, sLen = 6, len = 10;
			var angle = Raphael.angle(x1, y1, x2, y2);
	        var a45 = Raphael.rad(angle - fAngle / 2);
	        var a45m = Raphael.rad(angle + fAngle / 2);
	        var x2a = x2 + Math.cos(a45) * len;
	        var y2a = y2 + Math.sin(a45) * len;
	        var x2b = x2 + Math.cos(a45m) * len;
	        var y2b = y2 + Math.sin(a45m) * len;
	        var x2c = x2 + Math.cos(Raphael.rad(angle)) * sLen;
	        var y2c = y2 + Math.sin(Raphael.rad(angle)) * sLen;
			return ["M",x1,y1,"L",x2,y2,"L",x2a,y2a,"L",x2c,y2c,"L",x2b,y2b,"L",x2,y2,"Z"];
		},bb1 = line.start.getBBox(), bb2 = line.end.getBBox();
		 var p = [
		            { x: bb1.x + bb1.width / 2, y: bb1.y - 1 },
		            { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1 },
		            { x: bb1.x - 1, y: bb1.y + bb1.height / 2 },
		            { x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2 },
		            { x: bb2.x + bb2.width / 2, y: bb2.y - 1 },
		            { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1 },
		            { x: bb2.x - 1, y: bb2.y + bb2.height / 2 },
		            { x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2 }
		        ];
	    var d = {}, dis = [];
	    for (var i = 0; i < 4; i++) {
	        for (var j = 4; j < 8; j++) {
	            var dx = Math.abs(p[i].x - p[j].x),
	                dy = Math.abs(p[i].y - p[j].y);
	            if (
	                 (i == j - 4) ||
	                 (((i != 3 && j != 6) || p[i].x < p[j].x) &&
	                 ((i != 2 && j != 7) || p[i].x > p[j].x) &&
	                 ((i != 0 && j != 5) || p[i].y > p[j].y) &&
	                 ((i != 1 && j != 4) || p[i].y < p[j].y))
	               ) {
	                dis.push(dx + dy);
	                d[dis[dis.length - 1]] = [i, j];
	            }
	        }
	    }
	    var res = dis.length == 0?[0, 4]:d[Math.min.apply(Math, dis)];
        var path = drawLine(this, p[res[0]].x, p[res[0]].y, p[res[1]].x, p[res[1]].y);
        if (line.linePath) {
        	line.linePath.attr({ path: path });
        } else {
        	line.linePath = this.path(path).attr({ stroke: "#e29d36" ,fill: "#e29d36"});
        }
        return line;
	});
	
	(!Raphael.fn.drawNode) && (Raphael.fn.drawNode = function(node, graph){
		var me = this,drawText = function(paper,x,y,text,fontSize,color){
			return paper.text(x,y,text).attr({"font-family":"Microsoft Yahei","font-size":fontSize,"fill":color});
		};
		var rect = (node.nodeId == graph.start.nodeId || node.nodeId == graph.end.nodeId) ? 
			 this.ellipse(node.x+graph.nodeW/2, node.y+graph.nodeH/2, graph.nodeW/2, graph.nodeH/2):
			 this.rect(node.x, node.y, graph.nodeW, graph.nodeH, 10);
		rect.attr({"fill":"#375CB4","stroke":"#fff","cursor":"move"}).data("id",node.nodeId);
		graph.nodeSet.push(rect);
		node.gid =  rect.id;
		node.text = drawText(me, node.x+graph.nodeW/2, node.y+graph.nodeH/2, node.name, 12, "#fff");
		node.text.data("box",rect);
		graph.nodeSet.push(node.text);
	});
	
	// flowGraph definition
    var flowGraph  =  global.flowGraph = function(domId,opts){
        var me = this;
        me.canvas = document.getElementById(domId);
        me.width = me.canvas.clientWidth;
        me.height = me.canvas.clientHeight;
        me.paper = Raphael(me.canvas, me.width, me.height);
        me.nodes = []; me.edges = []; me.propMap = [];
        me.startX = 40; me.startY = 40;
        me.nodeW = 80; me.nodeH = 50;
        me.xGap = 80;  me.yGap = 40;
        me.nodeSet = me.paper.set();
        me.displayView; me.focus = null;
        for (var opt in opts||{}) {
            me[opt]= opts[opt];
        };
    };
    
    flowGraph.prototype = {
    	loadData:function(data){
    		var me  = this, nodeArr = [], tmp = null;
            me.nodes = data.nodes;
            me.edges = data.edges;
            me.propMap = data.propMap;
            for(var nodeid in me.nodes){
            	me.nodes[nodeid].nodeId = nodeid;
            	me.nodes[nodeid].lines = [];
            	me.nodes[nodeid].tag = false;
                if(me.nodes[nodeid].start) me.start = me.nodes[nodeid];
                if(me.nodes[nodeid].end) me.end = me.nodes[nodeid];
                nodeArr.push(nodeid);
            }
            //如果没有标明开始节点，寻找开始节点
            if(!me.start){
            	for(var nodeid in me.edges){
            		var toNodes = data.edges[nodeid];
            		var loopbackPos = null;
            		for(var i in toNodes){
            			nodeArr = $.grep(nodeArr, function(n){
            				return n == toNodes[i];
            			},true);
            			if(toNodes[i] == nodeid) loopbackPos = i;  //节点产生回环，标记位置
            		}
            		if(loopbackPos){
            			me.edges[nodeid].splice(loopbackPos,1);  //删除edge中的回环，标记节点回环
                		me.nodes[nodeid].loopback = true;
            		}
            		
            		if(tmp==null) { 
            			tmp = data.nodes[nodeid];
            		}
            	}
            	//没有开始节点，随机选择
            	if(nodeArr.length==0) {
            		me.start = tmp;
            	}else {
            		me.start = me.nodes[nodeArr[0]];
            	}
            }
            me.layout();
            me.draw();
            me._display();
            me._bind();
    	},
    	//为每个节点定位
    	layout:function(){
    		var me = this, getNodePos = function(node){
    			var edge = me.edges[node.nodeId];
    			if(!edge || node.tag){
    				return false;
    			}
    			node.tag = true;
    			for(var i in edge){
    				var child = me.nodes[edge[i]];
    				if(!child.x){
    					child.x = node.x + me.nodeW + me.xGap;
    					child.y = node.y + i*(me.nodeH + me.yGap);
    				}
    				getNodePos(child);
    			}
    		} ;
    		me.start.x = me.startX; me.start.y = me.startY;
    		getNodePos(me.start);
    	},
    	//开始绘制
    	draw:function(){
    		var me = this;
    		me.paper.clear();
    		//绘制节点
    		for(var i in me.nodes){
    			me.paper.drawNode(me.nodes[i],me);
    		}
    		//绘制连接线
    		for(var i in me.edges){
    			for(var j in me.edges[i]){
    				var line = me.paper.connection({start:me.paper.getById(me.nodes[i].gid),end:me.paper.getById(me.nodes[me.edges[i][j]].gid)});
    				me.nodes[i].lines.push(line);
    				me.nodes[me.edges[i][j]].lines.push(line);
    			}
    		}
    	},
    	//绑定拖拽事件
    	_bind:function(){
    		var me=this, helpX=null, helpY=null, temp=null, isEllipse=false;
    		me.nodeSet.drag(function(dx,dy){
    			var x = Raphael.snapTo(10,this.ox+dx); var y = Raphael.snapTo(10,this.oy+dy);
    			if(x!=temp.attr("x") || y!=temp.attr("y")){
    				if(isEllipse){
    					temp.attr({cx:x,cy:y});
    				}else{
    					temp.attr({x:x,y:y});
    				}
    				
    				//添加辅助线
    				if(helpX){helpX.remove();helpX=null;} 
    				if(helpY){helpY.remove();helpY=null;}
    				me.nodeSet.forEach(function(el){
    					if(helpX && helpY){
    						return false;
    					}
    					var box = el.getBBox();
    					if(!helpX){
    						if(x+temp.attr("width")/2 == box.x+box.width/2){
    							helpX = me.paper.path(["M",x+temp.attr("width")/2,0,"L",x+temp.attr("width")/2,me.paper.height]).attr({"stroke":"#436D83","stroke-dasharray":"--"});
    						}else if(x==box.x || x==box.x2 || x==box.x+box.width/2){
    							helpX = me.paper.path(["M",x,0,"L",x,me.paper.height]).attr({"stroke":"#436D83","stroke-dasharray":"--"});
    						}else if(x+temp.attr("width") == box.x || x+temp.attr("width") == box.x+box.width){
    							helpX = me.paper.path(["M",x+temp.attr("width"),0,"L",x+temp.attr("width"),me.paper.height]).attr({"stroke":"#436D83","stroke-dasharray":"--"});
    						}
    					}
    					if(!helpY){
    						if(y+temp.attr("height")/2 == box.y+box.height/2){
    							helpY = me.paper.path(["M",0,y+temp.attr("height")/2,"L",me.paper.width,y+temp.attr("height")/2]).attr({"stroke":"#436D83","stroke-dasharray":"--"});
    						}else if(y==box.y || y==box.y2 || y==box.y+box.height/2){
    							helpY = me.paper.path(["M",0,y,"L",me.paper.width,y]).attr({"stroke":"#436D83","stroke-dasharray":"--"});
    						}else if(y+temp.attr("height") == box.y || y+temp.attr("height") == box.y+box.height){
    							helpY = me.paper.path(["M",0,y+temp.attr("height"),"L",me.paper.width,y+temp.attr("height")]).attr({"stroke":"#436D83","stroke-dasharray":"--"});
    						}
    					}
    				});
    			}
    		},function(){
    			//判断拖动的元素类型
    			isEllipse = this.type=="ellipse" || (this.type=="text"&&this.data("box").type=="ellipse");
    			var box = this.type=="text"?this.data("box"):this;
    			this.ox = box.attr(isEllipse?"cx":"x"); this.oy = box.attr(isEllipse?"cy":"y");
    			temp = box.clone();
    			temp.animate({ "fill-opacity": .2 }, 200);
    			
    			//为焦点元素显示详细视图
    			if(me.focus) me.focus.attr({"stroke":"#fff","stroke-width":"1px"});
    			me.focus = box;
    			me.displayView.css({"top":$(me.canvas).offset().top+50,"left":me.width-200}).show();
    			for(var prop in me.propMap){
    				$("#"+prop).val(me.nodes[box.data("id")][prop]);
    			}
    			box.attr({"stroke":"#e29d36","stroke-width":"2px"});
    		},function(){
    			if(helpX){helpX.remove();helpX=null;} 
    			if(helpY){helpY.remove();helpY=null;}
    			var id = this.type=="text"?this.data("box").data("id"):this.data("id");
    			if(this.type=="rect"){
    				this.attr({x:temp.attr("x"),y:temp.attr("y")});
    				me.nodes[id].text.attr({x:temp.attr("x")+me.nodeW/2,y:temp.attr("y")+me.nodeH/2});
    			}else if(this.type=="ellipse"){
    				this.attr({cx:temp.attr("cx"),cy:temp.attr("cy")});
    				me.nodes[id].text.attr({x:temp.attr("cx"),y:temp.attr("cy")});
    			}else if(this.type=="text"&&this.data("box").type=="rect"){
    				this.attr({x:temp.attr("x")+me.nodeW/2,y:temp.attr("y")+me.nodeH/2});
    				this.data("box").attr({x:temp.attr("x"),y:temp.attr("y")});
    			}else if(this.type=="text"&&this.data("box").type=="ellipse"){
    				this.attr({x:temp.attr("cx"),y:temp.attr("cy")});
    				this.data("box").attr({cx:temp.attr("cx"),cy:temp.attr("cy")});
    			}
    			
    			for(var i=0;i<me.nodes[id].lines.length;i++){
    				me.paper.connection(me.nodes[id].lines[i]);
    			}
    			temp.remove();
    		});
    	},
    	_display:function(){
    		var me = this;
    		me.displayView = $("<div id='displayView'><table></table></div>").css({"position":"absolute","display":"none","top":-9999,"left":0,"background":"white","border":"1px solid #D6DBE1","padding":"20px"}).appendTo($("body"));
    		for(var prop in me.propMap){
    			me.displayView.find("table").append("<tr><td>"+me.propMap[prop]+"：</td><td><input type='text' id='"+prop+"'></input></td></tr>");
    		}
    		me.displayView.find("input").keyup(function(){
    			var node = me.nodes[me.focus.data("id")];
    			node[$(this).attr("id")] = $(this).val();
    			
    			if($(this).attr("id") == "name"){
    				node.text.attr("text",$(this).val());
    			}
    		});
    	}
    };
})(window);