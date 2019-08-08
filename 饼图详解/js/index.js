var svg = d3.select('.container')
  .append('svg')
  .attr('width', '900')
  .attr('height', '900')
  // .attr('transform', 'translate(400,400)')

var dataset = [
    ['小米', '60.8'], 
    ['三星', '58.4'], 
    ['联想', '47.3'], 
    ['苹果', '46.6'], 
    ['华为', '41.3'], 
    ['酷派', '40.1'],
    ['其他', '111.5']
  ]
// 处理数据，把数据转换成角度
var pie =d3.layout.pie()
  .startAngle(Math.PI * 0.2)   // 中间差着180°   36除以180=0.2    270除以180=1.5
  .endAngle(Math.PI * 1.5)    // 这两行表示输出范围从36°到270°
  .value(function(d) {
    console.log(d)
    console.log(d[0])  //小米，三星，联想......
    console.log(d[1])  //60.8, 58.4, 47.3 ......  这个.value()中间要传入的值是数值【也就是数量】，
                       //然后把数值转化成画圆所需要的角度，所以是return d[1]  
                       //假如小米和60.8的位置换一下，就要写return d[0]
    return d[1]
  })  
console.log(pie(dataset))
// var piedata = pie(dataset)

// console.log(piedata)

// 创建弧生成器
var outerRadius = 200
var innerRadius = 0

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)

// 取颜色
var color = d3.scale.category20()

var g = svg.append('g')
  .attr('transform', 'translate(300, 300)')

var update = g.selectAll('g')
  .data(pie(dataset))

var enter = update.enter().append('g')
update.exit().remove()

// update.attr('transfrom', 'translate(400, 400)')

enter.append('path')
  .attr('fill', function(d, i) {
    return color(i)
  })
  .attr('d', function(d) {
    return arc(d)
  })

// 添加弧内文字元素
enter.append('text')
  .attr('transform', function(d) {
    var x = arc.centroid(d)[0] * 1.4    // centroid() 返回的是一个数组[x,y]分别表示X,Y的坐标
    var y = arc.centroid(d)[1] * 1.4
    return 'translate(' + x + ',' + y + ')'
  })
  .attr('text-anchor', 'middle')
  .text(function(d) {
    // console.log(d.data[1])
    // return(1)
    // console.log(d)
    // console.log(Number(d.value))
    var percent = Number(d.value) / d3.sum(dataset, function(d) {return d[1]; }) * 100
    return percent.toFixed(1) + '%'
  })

enter.append('line')
  .attr('stroke', 'black')
  .attr('x1', function(d) {
    return arc.centroid(d)[0] * 2
  })
  .attr('y1', function(d) {
    return arc.centroid(d)[1] * 2
  })
  .attr('x2', function(d) {
    return arc.centroid(d)[0] * 2.2
  })
  .attr('y2', function(d) {
    return arc.centroid(d)[1] * 2.2
  })

enter.append('text')
  .attr('transform', function(d) {
    // console.log(arc.centroid(d))
    var x = arc.centroid(d)[0] * 2.5
    var y = arc.centroid(d)[1] * 2.5
    return 'translate(' + x + ',' + y + ')'
  })
  .attr('text-anchor', 'middle')
  .text(function(d) {
    console.log(d)
    return d.data[0]    // d.data代表的是其中的数据
  })


