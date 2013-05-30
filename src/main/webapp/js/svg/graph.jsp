<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流程图</title>
<link type="text/css" rel="stylesheet" href='<c:url value="/static/js/artdialog/default.css"/>' />
<script type="text/javascript" src='<c:url value="/static/js/jquery.min.js"/>'></script>
<script type="text/javascript" src='<c:url value="/static/js/raphael.js"/>'></script>
<script type="text/javascript" src='<c:url value="/static/js/flowGraph.js"/>'></script>
<script type="text/javascript" src='<c:url value="/static/js/artdialog/artDialog.js"/>'></script>
<script type="text/javascript">
$(function(){
	var data ={
			nodes:{"拟稿":{name:"拟稿",detail:""},"部门领导审批":{name:"部门领导审批",detail:"部门领导审批"},"办公室领导审核":{name:"办公室领导审核",detail:""},"办公室秘书处理":{name:"办公室秘书处理",detail:""},"结束处理":{name:"结束处理",detail:"结束流程",end:true}},
			edges:{"拟稿":["办公室领导审核","部门领导审批"],
				   "部门领导审批":["办公室领导审核","部门领导审批","拟稿"],
				   "办公室领导审核":["办公室领导审核","办公室秘书处理","部门领导审批","拟稿"],
				   "办公室秘书处理":["结束处理"]},
			propMap:{"name":"环节名称","detail":"环节说明"}
			};
	graph = new flowGraph("paper");
	graph.loadData(data);

	$("#save").click(function(){
		art.dialog({
			title:"保存",
			content:$("#save-box").get(0),
			ok:function(){
				var gv = {"graph":1,"code":"1.0","creator":"user","edges":[],"nodes":[]};
				console.log(graph);
			},
			cancel:function(){}
		});	
	});
});
</script>
</head>
<body>
<c:url value="/static/js/jquery.min.js"/>
<div id="paper" style="background-image: url('<c:url value="/static/js/grid.gif"/>'); background-color: white;width: 2000px;height: 2000px;"></div>
<button id="save">保存</button>
<div id="save-box">
	名称：<input type="text" id="name"></input>
</div>	
</body>
</html>