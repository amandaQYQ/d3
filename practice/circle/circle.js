d3.csv("data.csv",type,function(data){
	var width=400,height=400;
	
	var svg=d3.select("#container")
	.append("svg")
	.attr({
		"width":width,
		"height":height
	})
	
	var g=svg.append("g")
	.attr("transform","translate("+width/2+","+height/2+")")
	
	var arc_generator=d3.svg.arc()
	.innerRadius(100)
	.outerRadius(200)
//	.startAngle(Ac)
//  .endAngle(120*Math.PI/180)

    var angle_data=d3.layout.pie()
    .value(function(data){return data.population})
    
    var color=d3.scale.category10();
    
    g.selectAll("path")
    .data(angle_data(data))
    .enter()
    .append("path")
    .attr("d",arc_generator)
    .style("fill",function(d,i){return color(i)})
    
    g.selectAll("text")
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
	return data
}
