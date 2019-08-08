var width = 800
var height = 800
var svg = d3.select('.container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

var jinggaoG = svg.append('g')
  .attr('class', 'jinggaoG')
  .attr('transform', 'translate(400,400)')
var fakuanG = svg.append('g')
  .attr('class', 'fakuanG')
  .attr('transform', 'translate(400,400)')
var juliuG = svg.append('g')
  .attr('class', 'juliuG')
  .attr('transform', 'translate(400,400)')
var jieduG = svg.append('g')
  .attr('class', 'jieduG')
  .attr('transform', 'translate(400,400)')

var data = {'jinggao':[82, 350], 
           // 警告
           'fakuan':[32, 100],
           // 罚款
           'juliu':[14, 40],
           // 行政拘留
           'jiedu':[12, 30]}
           // 强制戒毒
var jinggaoData = data.jinggao
var fakuanData = data.fakuan
var juliuData = data.juliu
var jieduData = data.jiedu


// 具体的数据的弧度占比
var jinggao = 6.28 / jinggaoData[1] * jinggaoData[0] 
var fakuan = 6.28 / fakuanData[1] * fakuanData[0]
var juliu = 2*Math.PI / juliuData[1] * juliuData[0]
var jiedu = 2*Math.PI / jieduData[1] * jieduData[0] 

// var jiedu = 360 / jieduData[1] * jieduData[0] / 180

console.log(fakuanData)
// 警告
var jinggaoPie = d3.layout.pie()
  .startAngle(3.14)
  .endAngle( jinggao + 3.14)
  .value(function(d){
    return d
  })

var jinggaoData = jinggaoPie([jinggaoData[0]])  // 这个值外层一定得加一个方括号
      console.log(jinggaoData)

console.log(fakuan, '罚款')
console.log(jinggao, '警告')
// 罚款
var fakuanPie = d3.layout.pie()
  .startAngle(3.14)
  .endAngle( fakuan + 3.14)
  .value(function(d){
    return d
  })

var fakuanData = fakuanPie([fakuanData[0]])  // 这个值外层一定得加一个方括号
console.log(fakuanData, '罚款')
console.log(jinggaoData, '警告')

// 拘留
var juliuPie = d3.layout.pie()
  .startAngle(3.14)
  .endAngle(juliu + 3.14)
  .value(function(d){
    return d
  })

var juliuData = juliuPie([juliuData[0]])  // 这个值外层一定得加一个方括号
// console.log(jinggaoData)

// 戒毒
var jieduPie = d3.layout.pie()
  .startAngle(3.14)
  .endAngle(Math.PI * jiedu)
  .value(function(d){
    return d
  })

var jieduData = jieduPie([jieduData[0]])  // 这个值外层一定得加一个方括号
// console.log(jinggaoData)

// 弧生成器
var jinggaoArc = d3.svg.arc()
  .innerRadius(100)
  .outerRadius(110)
// 弧生成器
var fakuanArc = d3.svg.arc()
  .innerRadius(115)
  .outerRadius(125)
// 弧生成器
var juliuArc = d3.svg.arc()
  .innerRadius(130)
  .outerRadius(140)
  // 弧生成器
var jieduArc = d3.svg.arc()
  .innerRadius(145)
  .outerRadius(155)

// 绘制圆环
var jinggaoUpdate = jinggaoG.selectAll('jinggaoP')
  .data(jinggaoData)
  .attr('fill', '#70daea')
  .attr('d', function(d) {
    return jinggaoArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })
jinggaoUpdate.enter()
  .append('path')
  .attr('class', 'jinggaoP')
  .attr('fill', '#70daea')
  .attr('d', function(d) {
    return jinggaoArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })

jinggaoUpdate.exit().remove()

// 绘制圆环
var fakuanUpdate = fakuanG.selectAll('fakuanP')
  .data(fakuanData)
  .attr('fill', '#ea70e6')
  .attr('d', function(d) {
    return fakuanArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })
fakuanUpdate.enter()
  .append('path')
  .attr('class', 'fakuanP')
  .attr('fill', '#ea70e6')
  .attr('d', function(d) {
    return fakuanArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })

fakuanUpdate.exit().remove()

// 绘制圆环
var juliuUpdate = juliuG.selectAll('juliuP')
  .data(juliuData)
  .attr('fill', '#eb1273')
  .attr('d', function(d) {
    return juliuArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })
juliuUpdate.enter()
  .append('path')
  .attr('class', 'juliuP')
  .attr('fill', '#eb1273')
  .attr('d', function(d) {
    return juliuArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })

juliuUpdate.exit().remove()

// 绘制圆环
var jieduUpdate = jieduG.selectAll('jieduP')
  .data(jieduData)
  .attr('fill', '#04f20f')
  .attr('d', function(d) {
    return jieduArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })
jieduUpdate.enter()
  .append('path')
  .attr('class', 'jieduP')
  .attr('fill', '#04f20f')
  .attr('d', function(d) {
    return jieduArc({
      startAngle: d.startAngle,
      endAngle: d.endAngle
    })
  })

jieduUpdate.exit().remove()

// 绘制线条
// jinggaoG.append('circle')
//   .attr('cx', 0)
//   .attr('cy', 108)
//   .attr('r', 2)
//   .attr('fill', 'red')

jinggaoG.append('path')
  .attr('d', 'M0, 105, L100, -100L150,-100') 
  .attr('stroke', '#70daea')
  .attr('fill', 'transparent')

fakuanG.append('path')
  .attr('d', 'M0, 120, L100, -90L150,-90') 
  .attr('stroke', '#ea70e6')
  .attr('fill', 'transparent')

juliuG.append('path')
  .attr('d', 'M0, 135, L100, -80L150,-80') 
  .attr('stroke', '#eb1273')
  .attr('fill', 'transparent')

jieduG.append('path')
  .attr('d', 'M0, 150, L100, -70L150,-70') 
  .attr('stroke', '#04f20f')
  .attr('fill', 'transparent')