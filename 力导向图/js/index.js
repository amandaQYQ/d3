var nodes = [ 
  {name: '0'},
  {name: '1'},
  {name: '2'},
  {name: '3'},
  {name: '4'},
  {name: '5'},
  {name: '6'}]
var edges = [
  {source: 0, target: 1},
  {source: 0, target: 2},
  {source: 0, target: 3},
  {source: 1, target: 4},
  {source: 1, target: 5},
  {source: 1, target: 6}]   // 此处必须使用source和target两个名称
var width = 400
var height = 400
var force = d3.layout.force()
  .nodes(nodes)           // 设定节点数组
  .links(edges)           // 设定连线数组
  .size([width, height])  // 设定作用范围force.size([x, y]) 
                              // ①用于指定重力重心位置(x/2, y/2)
                              // ②所有节点的初始位置限定在[0, x]和[0, y]之间
  .linkDistance(90)       // 设定连线的距离（即连线的长度），默认20
  .charge(-400)           // 设定节点的电荷数，决定是排斥还是相互吸引，默认-30
                             // 正值：相互吸引，绝对值越大吸引力越大
                             // 负值：相互排斥，绝对值越大排斥力越大

force.start()    //开启布局计算，力导向图与其他布局不一样，转换数据是，原数组会变化
                                  console.log(nodes)
                                  console.log(edges)
//绘制
var color = d3.scale.category20()
var svg = d3.select('.container')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 1000)

//绘制连线
var lines = svg.selectAll('.force-line')
  .data(edges)     // line绑定edges 因为需要计算开始位置和结束位置，需要source 和 target
  .enter()
  .append('line')
  .attr('class', 'force-line')
  .style('stroke', function(d, i) {
    return color(i)
  })

var drag = force.drag()
  .on('dragstart', function(d) {
    // 拖拽开始后设定被拖拽对象为固定
    d.fixed = true
  })

  .on('dragend', function(d, i) {
    // 拖拽结束后变为原来的颜色
    d3.select(this).style('fill', color(i))
  })

  .on('drag', function(d) {
    d3.select(this).style('fill', 'yellow')
  })
//绘制节点
var circles = svg.selectAll('.force-circle')
  .data(nodes)     // circle绑定nodes
  .enter()
  .append('circle')
  .attr('class', 'force-circle')
  .attr('r', 20)
  .style('fill', function(d, i) {
    return color(i)
  })
  .call(drag)   //允许拖动

//绘制文字
var texts = svg.selectAll('.force-text')
 .data(nodes)           // text绑定nodes
 .enter() 
 .append('text')
 .attr('class', 'force-text')
 .attr('x', function(d) {
    return d.x
 })
 .attr('y', function(d) {
    return d.y
 })
 .attr('dy', '.3em')
 .text(function(d) {
    return d.name
 })

//tick事件的监听器
force.on('tick', function() {
  lines.attr('x1', function(d) {
    // console.log(d)
    return d.source.x           // 开始位置source
  })
  lines.attr('y1', function(d) {
    return d.source.y
  })
  lines.attr('x2', function(d) {
    return d.target.x          // 结束位置target
  })
  lines.attr('y2', function(d) {
    return d.target.y
  })

  circles.attr('cx', function(d) {
    // console.log(d)
    return d.x
  })
  circles.attr('cy', function(d) {
    return d.y
  })

  texts.attr('x', function(d) {
    // console.log(d)
    return d.x
  })
  texts.attr('y', function(d) {
    return d.y
  })
})

force.on('start', function() {
  console.log('运动开始')
})

force.on('end', function() {
  console.log('运动结束')
})



