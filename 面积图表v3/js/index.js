var width=500,height=250;
var margin={left:50,top:30,right:20,bottom:20};
var g_width=width-margin.left-margin.right,
    g_height=height-margin.top-margin.bottom;

//容器构造
var svg=d3.select("#container")
.append("svg")
.attr("width",width)
.attr("height",height)

var g=svg.append("g")
.attr("transform","translate("+margin.left+","+margin.top+")")

var data=[1,5,7,10,2,8]
//划线函数
var area_generator=d3.svg.area()
// var area_generator=d3.area()  //这是v4版本
.x(function(data,index){
	return scale_x(index)
})
.y0(g_height) //y0代表x轴 和y1一起围成了一个面积
.y1(function(data){
	return scale_y(data)
})
.interpolate("cardinal")
//.curve(d3.curveBasis)  //使线条平滑 //这是v4版本

//缩放
var scale_x=d3.scale.linear()
//var scale_x=d3.scaleLinear() //这是v4版本
.domain([0,data.length-1])
.range([0,g_width])

var scale_y=d3.scale.linear()
//var scale_y=d3.scaleLinear()  //这是v4版本
.domain([0,d3.max(data)])
.range([g_height,0])

g.append("path")
.attr("d",area_generator(data))
.style("fill","steelblue")

//x轴y轴
var x_axis=d3.svg.axis().scale(scale_x),
    y_axis=d3.svg.axis().scale(scale_y).orient("left");
//var x_axis=d3.axisTop().scale(scale_x)  //这里为什么不用scaleLinear //这是v4版本
//var y_axis=d3.axisLeft().scale(scale_y) ////这是v4版本

g.append("g")
.call(x_axis)
.attr("transform","translate(0,"+g_height+")")

g.append("g")
.call(y_axis)

g.append("text")
.text("Price($)")
.attr("transform","rotate(-90)")
.attr("text-anchor","end")
.attr("dy","1em")

