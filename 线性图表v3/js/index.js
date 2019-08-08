var width=500,height=250,
margin={left:50,top:30,right:20,bottom:20};
var g_width=width-margin.left-margin.right,
    g_height=height-margin.top-margin.bottom;


var svg=d3.select("#container") //用d3函数选中container
.append("svg:svg")//在container内添加svg，
				//第一个svg是命名空间,
				//第二个svg是添加svg函数
				//也可以写成.append("svg")   d3能够知道我们添加的是svg函数
.attr("width",width) 
.attr("height",height)//给svg添加属性

var g=d3.select("svg")//选择的对象必须是实际的对象 也可以通过变量
                //var svg=d3.select("#container")【给第一行添加了一个变量名】
.append("g")
.attr("transform","translate("+margin.left+","+margin.top+")")

var data=[1,3,5,7,8,4,3,7]  //定义了一个数组，作为数据使用

var scale_x=d3.scale.linear()    //4版本用scaleLinear  以前用d3.scale.linear
.domain([0,data.length-1]) //输入范围  也就是刚刚数组的长度
.range([0,g_width]) //输出范围  也就是g的宽度

var scale_y=d3.scale.linear()
.domain([0,d3.max(data)])  //用d3.max()方法取最大值
.range([g_height,0])  //之前写的.range([0，g_height])  
//这里要颠倒顺序 使y轴能够从下往上是从0开始往上涨



// var line_generator=d3.line()
var line_generator=d3.svg.line()  //可以通过d3下的svg的line函数实现
                              //之前写的d3.svg.line()→报错svg未定义，因为我用的版本4，版本4没有svg，
.x(function(d,i){
	return scale_x(i);
}) //x轴通过下标取得数组内的数据0,1,2,3
.y(function(d){
	return scale_y(d);
})//y轴通过实际的数据取得内容1,3,5,7
// .curve(d3.curveBasis) //以前用的 line().interpolate("cardinal")
.interpolate("cardinal")


d3.select("g")
.append("path")
		//for example:
		//<path d="M1,0L20,40L40,50L100,100L0,200"></path>
		//d:是代表属性值，是path data的缩写
		//M:表示起点位置,这里是1,0
		//L:表示划一条线,X轴20,Y轴40,
		//上面有很多L表示画了很多直线,然后把他们连在一块
.attr("d",line_generator(data)) //这里定义函数实现，函数名叫line_generator

//select 和selectAll
//如果页面内有两个g元素，select默认选择的是第一个，selectAll选择全部的g
//如果我想选中第二个g元素，可以var g=d3.select("svg")  然后直接使用g.append()

var x_axis=d3.svg.axis().scale(scale_x)
 y_axis=d3.svg.axis().scale(scale_y).orient("left")

// var x_axis=d3.axisTop().scale(scale_x),
//     y_axis=d3.axisLeft().scale(scale_y)

g.append("g")
.call(x_axis)
.attr("transform","translate(0,"+g_height+")")

g.append("g")
.call(y_axis)
g.append("svg:text")  //刚刚前面没有加g.  就没显示出来
.text("Price($)")
.attr("transform","rotate(-90)")
.attr("text-anchor","end")  //文字末尾对齐
.attr("dy","1em")  //沿着y轴方向平移，不懂dy
