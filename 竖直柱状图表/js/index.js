var data=[1,3,5,7,9,8,6,4,2]

var bar_width=50,bar_padding=10,
    svg_width=data.length*(bar_width+bar_padding),
    svg_height=500

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

var scale=d3.scale.linear()
.domain([0,d3.max(data)])
.range([svg_height,0])

var bar =g.append("rect")
.attr({
	"width":bar_width,
	"height":function(a){return svg_height-scale(a)},
	"y":function(d){return scale(d)}
})
.style("fill","steelblue")
g.append("text")
.text(function(data){
	return data
})
.attr({
	"x":bar_width/2,
	"y":function(data){return scale(data)},
	"text-anchor":"middle",
	"dy":15
})

