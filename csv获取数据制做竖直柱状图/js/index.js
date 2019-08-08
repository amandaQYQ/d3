d3.csv("data.csv",type,function(data){
	console.log(data);
//	for(var i=0;i<data.length;i++){
//		var dp=data[i].population;
//		var dy=data[i].year;
//		
//	}
	
	var width=1000,height=500,
		margin={left:30,top:30,right:30,bottom:30},
		svg_width=width+margin.left+margin.right,
		svg_height=height+margin.top+margin.bottom;
	
	var scale=d3.scale.linear()
	.domain([0,d3.max(data,function(d){return d.population})])
	.range([height,0])	
	
	var scale_x=d3.scale.ordinal()
//	.domain(data.map(function(data){return data.population}))
	.domain(data.map(function(data){return data.year}))
	.rangeBands([0,width],0.1) //0.1指的是padding 柱状之间的间隙
	
	var svg=d3.select("#container")
	.append("svg")
	.attr({
		"width":svg_width, //1060
		"height":svg_height
	})
	
	var chart=svg.append("g") //这个g没设置宽高，但是有偏移值
	.attr("transform","translate("+margin.left+","+margin.top+")")
	
	
	//设置x轴y轴
	var axis_x=d3.svg.axis().scale(scale_x),
		axis_y=d3.svg.axis().scale(scale).orient("left");
	
	chart.append("g")
	.call(axis_x)
	.attr("transform","translate(0,"+height+")")
	
	var yc=chart.append("g")
	.call(axis_y)
	
	//y轴下面创建图例
	yc.append("text")
	.text("人口单位:亿")
	.attr("transform","rotate(-90)")
	.attr("dy","1em")
	.attr("text-anchor","end")
	
	var bar=chart.selectAll(".bar") //在刚刚那个g下面新建一堆和数据一一对应的g元素
	.data(data)
	.enter()
	.append("g")
	.attr("class","bar")
	.attr("transform",function(d,i){
		return "translate("+scale_x(d.year)+",0)"
//		return "translate("+i*(scale_x.rangeBand()+0.1)+",0)"
	})
//	.attr("transform",function(data,index){
//		return "translate("+index*(bar_width+bar_padding)+",0)"
//	})

	
	bar.append("rect")//每个和数据对应的g元素下面创建相应的rect元素
	.attr({
		"width":scale_x.rangeBand(),
		"height":function(d){return height-scale(d.population)},//之前这里写错成d一直报错
		"y":function(d){return scale(d.population)}
	})
	.style("fill","steelblue")
	
	bar.append("text")
	.text(function(d){return d.population})
	.attr({
		"y":function(d){return scale(d.population)},
		"x":scale_x.rangeBand()/2,
		"dy":15,
		"text-anchor":"middle"
	})
})
function type(data){
	data.population=+data.population;
	return data;
}
