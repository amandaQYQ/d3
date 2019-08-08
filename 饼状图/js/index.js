d3.csv("data.csv",type,function(data){
	console.log(data);
//	for(var i=0;i<data.length;i++){
//		console.log(data[i].education)
//	}
	
	var width=400,height=400;
	
	var svg=d3.select("#container")
	.append("svg")
	.attr({
		"width":width,
		"height":height
	})
	
	var gcontainer=svg.append("g")
	.attr("transform","translate(200,200)")
	
	//画圆
	var arc_generator=d3.svg.arc()
	.innerRadius(100) //内部半径
	.outerRadius(200)//外部半径
//	.startAngle(0)//起始角度
//	.endAngle(120*Math.PI/180) //结束角度，并且通过MATH.PI方法转换成极坐标的值

    var angle_data=d3.layout.pie()
    .value(function(d){return d.population})
	
	console.log(angle_data(data))
	
	var color=d3.scale.category10();
	
	//绑定数据data()，圆弧的角度angle_data，颜色color，绘制路径path、arc_generator
	gcontainer.selectAll("path")
	.data(angle_data(data))
	.enter() //通过enter选择只有数据还没有元素的selection
	.append("path")
	.attr("d",arc_generator)
	.style("fill",function(d,i){return color(i)})
	
	//绑定文字
	gcontainer.selectAll("text")
	.data(angle_data(data))
	.enter()
	.append("text")
	.text(function(d){return d.data.education})
	.attr("transform",function(d){
		return "translate("+arc_generator.centroid(d)+")"
	})
	.attr("text-anchor","middle")
	
})
   
function type(data){
	data.population=+data.population;
	return data;
}
