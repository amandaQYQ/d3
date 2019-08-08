d3.csv("data.csv",type,function(data){
//	for(var i=0;i<data.length;i++){
//		console.log(typeof data[i].population)
//	}
    
	var bar_width=50,bar_padding=10
	svg_height=500,
	svg_width=data.length*(bar_width+bar_padding),
	margin={left:30,right:30,top:30,bottom:30}
	
	var scale_y=d3.scale.linear()
	.domain([0,d3.max(data,function(d){return d.population})])
	.range([svg_height,0])

    var scale_x=d3.scale.ordinal()
    .domain(data.map(function(d){return d.year}))
    .rangeBands([0,svg_width],0.1)
	
	var svg=d3.select("#container")
	.append("svg")
	.attr({
		"width":svg_width,
		"height":svg_height
	})
	
	var g=svg.append("g")
	.attr("transform","translate("+margin.left+","+margin.top+")")
	
	var x_axis=d3.svg.axis().scale(scale_x),
	    y_axis=d3.svg.axis().scale(scale_y).orient("left")
	
	var xa=g.append("g")
	.call(x_axis)
	.attr("transform","translate(0,"+svg_height+")")
	
	var ya=g.append("g")
	.call(y_axis)
	
	var bar=g.selectAll("g")
	.data(data)
	.enter()
	.append("g")
	.attr("transform",function(d,index){
		return "translate("+index*(bar_width+bar_padding)+",0)"
	})
	
	var orect=bar.append("rect")
	.attr({
		"width":bar_width,
		"height":function(d){return svg_height-scale_y(d.population)},
		"y":function(d){return scale_y(d.population)} //y 属性定义矩形的顶端位置
	})
	
	
})
function type(data){
	data.population=+data.population
	return data;
}
