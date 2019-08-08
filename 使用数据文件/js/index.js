d3.csv("data.csv",type,function(data){
	console.log(data);
	
	var bar_width=50,bar_padding=10,
	    svg_width=data.length*(bar_width+bar_padding),
	    svg_height=500;
	
	var svg=d3.select("#container")
	.append("svg")
	.attr({"width":svg_width,
	       "height":svg_height})
	
	var g=svg.selectAll("g")
	.data(data)
	.enter()
	.append("g")
	.attr("transform",function(data,index){
		return "translate("+index*(bar_width+bar_padding)+",0)"
	})
	
	scale=d3.scale.linear()
	.domain([0,d3.max(data,function(d){
		console.log(d.population)
		return d.population
	})])
	.range([svg_height,0])
	
	
	var bar=g.append("rect")
	.attr({
		"width":bar_width,
		"height":function(d){return svg_height-scale(d.population)},
		"y":function(d){return scale(d.population)}
	})
	.style("fill","steelblue")
	
	g.append("text")
	.text(function(data){
		return data.year
	})
	.attr({
		"x":bar_width/2,
		"y":function(data){return scale(data.population)},
		"text-anchor":"middle",
		"dy":20
	})
	
	
	
})

function type(data){
	data.population=+data.population;
	return data
};