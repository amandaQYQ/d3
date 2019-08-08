var continent = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲']

var population = [
  [9000, 870, 3000, 1000, 5200],
  [3400, 8000, 2300, 4922, 374],
  [2000, 2000, 7700, 4881, 1050],
  [3000, 8012, 5531, 500, 400],
  [3540, 4310, 1500, 1900, 300]
]

var width = 600
var height = 600

var svg = d3.select('.container')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600)
// 转换数据
var chord = d3.layout.chord()   // 创建一个弦图布局
  .padding(0.03)                // 设定元素节点之间的间距，默认为0
  .sortSubgroups(d3.ascending)  // 对各节点的所在行数据进行排序，d3.ascending是比较函数
  .matrix(population)           // 设定矩阵，必须是方块矩阵，行列数相等

  console.log(chord.groups()) // 返回节点数组 ，但是不改变原数组
  console.log(chord.chords()) // 返回弦数组    不改变原数组
  console.log(chord)

//弦图的g元素
var gChord = svg.append('g')
  .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')

//节点的g元素
var gOuter = gChord.append('g')

//弦的g元素
var gInner = gChord.append('g')

var color20 = d3.scale.category20()

//绘制节点
var innerRadius = width / 2 * 0.7
var outerRadius = innerRadius * 1.1

//弧生成器
var arcOuter = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)

gOuter.selectAll('.outer-path')
  .data(chord.groups())
  .enter()
  .append('path')
  .attr('class', 'outer-path')
  .style('fill', function(d) {
    return color20(d.index)
  })
  .attr('d', arcOuter)

// 添加文字
gOuter.selectAll('.outer-text')
  .data(chord.groups())
  .enter()
  .append('text')
  .each(function(d, i) {      // 为被绑定的数据添加变量
    d.angle = (d.startAngle + d.endAngle) / 2    // 弧的中心角度
    d.name = continent[i]                        // 节点名称
  })
  .attr('class', 'outer-text')
  .attr('dy', '.35em')
  .attr('transform', function(d) {
    var result = 'rotate(' + (d.angle * 180 / Math.PI) + ')'

    result += 'translate(0,' + -1.0 * (outerRadius + 10) + ')'

    if(d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5/4)
      result += 'rotate(180)'

    return result
  })
  .text(function(d) {
    return d.name
  })

  var arcInner = d3.svg.chord()
    .radius(innerRadius)

  gInner.selectAll('inner-path')
    .data(chord.chords())    //绑定弦数据
    .enter()
    .append('path')
    .attr('class', 'inner-path')
    .attr('d', arcInner)   // 使用弦生成器
    .style('fill', function(d) {
      return color20(d.source.index)
    })



  function fade(opacity) {
    return function(g, i) {
      console.log(1)
      gInner.selectAll('.inner-path')
        .filter( function(d) {
          return d.source.index != 1 && d.target.index != i
        })
        .transition()
        .style('opacity', opacity)
    }

  }

  gOuter.selectAll('.outer-path')
    .on('mouseover', fade(0.0))
    .on('mouseout', fade(1.0))

  //弦图还不太懂，需要多了解