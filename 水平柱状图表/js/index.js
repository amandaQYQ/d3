var data=[1,4,7,2,9,13,5,8,2,9],
	bar_height=50,
	bar_padding=10

var svg_width=500,
	svg_height=(bar_height+bar_padding)*data.length



var svg=d3.select("#container")
.append("svg")
.attr("width",svg_width)
.attr("height",svg_height)

//添加放置矩形的容器
var bar=svg.selectAll("g")
.data(data)
.enter()
.append("g")
.attr("transform",function(data,index){
	return "translate(0,"+index*(bar_height+bar_padding)+")"
})

//缩放
var scale=d3.scale.linear()
.domain([0,d3.max(data)])
.range([0,svg_width])

//添加矩形
bar.append("rect")
.attr({
	"width":function(a){return scale(a)},
	"height":bar_height
})
.style("fill","steelblue")

//添加矩形上的数字
bar.append("text")
.text(function(data){return data})
.attr("transform",function(a){
	return "translate("+scale(a)+",25)"
})
.attr("text-anchor","end")




