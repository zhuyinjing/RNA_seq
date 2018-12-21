<template>
  <div id="container">
    <div id="nGeneContainer"></div>
    <div id="nUMIContainer"></div>
    <div id="scatterContainer"></div>

    <div class="clear"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data() {
    return {
      data: [],
    }
  },
  components: {
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.get('/singel_cell/server/get_umi_meta_data?p='+ 11 +'&username=' + this.$store.state.username).then((res) => {
        if (res.data.message_type === 'success') {
          this.data = res.data.umiMetaDataList
          this.initnGene()
          this.initnUMI()
          this.initScatterPlot()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    initnGene () {
      let self = this
      let hassvg = d3.selectAll('#nGenesvg')
      if (hassvg) {
        d3.selectAll('#nGenesvg').remove()
      }
      let tooltip = d3.select('#container')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')
      var colorScale = d3.scaleOrdinal().range(["#f8766d"])
      var sampleData = this.data.map(item => item.nGene)
      var xData = d3.range(sampleData.length).map(d => d3.randomUniform(-3, 3)())

      var padding = {top:10,right:10,bottom:20,left:60}
      var width= 500,height=500

      var nGenesvg = d3.select("#nGeneContainer").append("svg").attr("width",width).attr("height",height).attr("id","nGenesvg")

      var histoChart = d3.histogram();

      var yScale = d3.scaleLinear().domain([d3.min(sampleData) * 1.2,d3.max(sampleData) * 1.2]).range([height - padding.top - padding.bottom,0]).nice()
      var yAxis = d3.axisLeft().scale(yScale)

      var xScale = d3.scaleLinear().domain([-5,5]).range([0,width - padding.left - padding.right])
      var xAxis = d3.axisBottom().scale(xScale).tickValues([0]).tickFormat(this.data[0]['origIdent']).tickSize(0)

      // 生成直方图布局
      histoChart
        .domain(d3.extent(sampleData))  // 返回 [最小值，最大值]
        .thresholds(yScale.ticks(sampleData.length / 5)) // 间隔 10/20 = 0.5
        .value(d => d)   // d: yData 每一项


      nGenesvg.append("g").call(xAxis)
            .attr("class","xAxis")
            .attr("transform","translate("+ padding.left +","+ (height - padding.bottom) +")")
            .attr("font-size", "14px")
      nGenesvg.append("g").call(yAxis)
            .attr("class","yAxis")
  		      .attr("transform","translate("+ padding.left +","+ padding.top +")")

      var area = d3.area()
          .x0(d => -d.length)
          .x1(d => d.length)
          .y(d => yScale(d.x0))
          .curve(d3.curveCatmullRom)
      nGenesvg.selectAll("g.violin")
        .data([sampleData]).enter()
        .append("g")
        .attr("transform",(d,i) => "translate("+ (padding.left + xScale(0))+ ","+ padding.top +")")
        .append("path")
        .style("stroke","black")
        .style("stroke-width", 1)
        .style("fill",(d,i) => colorScale(i))
        .attr("d", d =>   {return area(histoChart(d))})

      nGenesvg.selectAll("g.circle")
        .data(xData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d))
        .attr("cy", (d, i) => yScale(sampleData[i])+10)
        .attr("r", 1.5)
        .attr("fill", "black")
        .on('mouseover', function (d, i) {
          return tooltip.style('visibility', 'visible').text(self.data[i]['cellId'])
        })
        .on('mousemove', function (d, i) {
          return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
        })
        .on('mouseout', function (d, i) {
          return tooltip.style('visibility', 'hidden')
        })

      nGenesvg.append("text")
        .attr("transform", "translate("+ xScale(1) +",20)")
        .text("nGene")
        .attr("font-size", "16px")

    },
    initnUMI () {
      let self = this
      let hassvg = d3.selectAll('#nUMIsvg')
      if (hassvg) {
        d3.selectAll('#nUMIsvg').remove()
      }
      let tooltip = d3.select('#container')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')
      var colorScale = d3.scaleOrdinal().range(["#f8766d"])
      var sampleData = this.data.map(item => item.nUMI)
      var xData = d3.range(sampleData.length).map(d => d3.randomUniform(-3, 3)())

      var padding = {top:10,right:10,bottom:20,left:60}
      var width= 500,height=500

      var nUMIsvg = d3.select("#nUMIContainer").append("svg").attr("width",width).attr("height",height).attr("id","nUMIsvg")

      var histoChart = d3.histogram();

      var yScale = d3.scaleLinear().domain([d3.min(sampleData) * 1.2,d3.max(sampleData) * 1.2]).range([height - padding.top - padding.bottom,0]).nice()
      var yAxis = d3.axisLeft().scale(yScale)

      var xScale = d3.scaleLinear().domain([-5,5]).range([0,width - padding.left - padding.right])
      var xAxis = d3.axisBottom().scale(xScale).tickValues([0]).tickFormat(this.data[0]['origIdent']).tickSize(0)

      // 生成直方图布局
      histoChart
        .domain(d3.extent(sampleData))  // 返回 [最小值，最大值]
        .thresholds(yScale.ticks(sampleData.length / 5)) // 间隔 10/20 = 0.5
        .value(d => d)   // d: yData 每一项


      nUMIsvg.append("g").call(xAxis)
            .attr("class","xAxis")
            .attr("transform","translate("+ padding.left +","+ (height - padding.bottom) +")")
            .attr("font-size", "14px")
      nUMIsvg.append("g").call(yAxis)
            .attr("class","yAxis")
  		      .attr("transform","translate("+ padding.left +","+ padding.top +")")

      var area = d3.area()
          .x0(d => -d.length)
          .x1(d => d.length)
          .y(d => yScale(d.x0))
          .curve(d3.curveCatmullRom)
      nUMIsvg.selectAll("g.violin")
        .data([sampleData]).enter()
        .append("g")
        .attr("transform",(d,i) => "translate("+ (padding.left + xScale(0))+ ","+ padding.top +")")
        .append("path")
        .style("stroke","black")
        .style("stroke-width", 1)
        .style("fill",(d,i) => colorScale(i))
        .attr("d", d =>   {return area(histoChart(d))})

      nUMIsvg.selectAll("g.circle")
        .data(xData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d))
        .attr("cy", (d, i) => yScale(sampleData[i])+10)
        .attr("r", 1.5)
        .attr("fill", "black")
        .on('mouseover', function (d, i) {
          return tooltip.style('visibility', 'visible').text(self.data[i]['cellId'])
        })
        .on('mousemove', function (d, i) {
          return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
        })
        .on('mouseout', function (d, i) {
          return tooltip.style('visibility', 'hidden')
        })

      nUMIsvg.append("text")
        .attr("transform", "translate("+ xScale(1) +",20)")
        .text("nUMI")
        .attr("font-size", "16px")

    },
    initScatterPlot () {
      let self = this
      let hassvg = d3.selectAll('#scattersvg')
      if (hassvg) {
        d3.selectAll('#scattersvg').remove()
      }
      var width = 500, height = 500;
      var scattersvg = d3.select("#scatterContainer").append("svg").attr("width", width).attr("height", height).attr("id", "scattersvg")
      var data = this.data
      var padding = {top:30,right:60,bottom:60,left:60}
      var xScale = d3.scaleLinear().domain([d3.min(this.data.map(item => item.nUMI))/1.2, d3.max(this.data.map(item => item.nUMI))*1.2]).range([0,width - padding.left - padding.right]).nice()
      var yScale = d3.scaleLinear().domain([d3.min(this.data.map(item => item.nGene))/1.2, d3.max(this.data.map(item => item.nGene))*1.2]).range([height - padding.top - padding.bottom,0]).nice()
      var xAxis = d3.axisBottom().scale(xScale)
      var yAxis = d3.axisLeft().scale(yScale)
      let colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      let tooltipX = d3.select('#container')
      	.append('div')
        .attr("id","tooltipX")
      	.style('position', 'absolute')
        .style("background","black")
        .style('z-index', '10')
      	.style('color', '#fff')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
        .style("padding", "2px")
      	.text('')
      let tooltipY = d3.select('#container')
      	.append('div')
        .attr("id","tooltipY")
      	.style('position', 'absolute')
        .style("background","black")
        .style('z-index', '10')
      	.style('color', '#fff')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
        .style("padding", "2px")
      	.text('')
      let tooltipCircle = d3.select('#container')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text('')
      let xLine = scattersvg
      	.append('line')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .attr("stroke","#999")
        .style("stroke-dasharray", "5")
      let yLine = scattersvg
      	.append('line')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .attr("stroke","#999")
        .style("stroke-dasharray", "5")

      var x = scattersvg.append("g").call(xAxis).attr("transform","translate("+ padding.left +"," + (height - padding.bottom) +")")
              .selectAll("text")
              .style("text-anchor", "start")
              .attr("transform", "rotate(45 -10 10)")
      var y = scattersvg.append("g").call(yAxis).attr("transform","translate("+ padding.left +"," + padding.top +")")

      // svg 被 rect 围住
      var rect = scattersvg.append("rect")
                    .attr("x",padding.left)
                    .attr("y",padding.top)
                    .attr("width", width - padding.left - padding.right)
                    .attr("height", height - padding.top - padding.bottom)
                    .attr("stroke", "black")
                    .attr("fill", 'none')

      var circle = scattersvg.selectAll("circle")
                      .data(this.data)
                      .enter()
                      .append("circle")
                      .attr("cx", (d) => padding.left + xScale(d["nUMI"]))
                      .attr("cy", (d) => padding.top + yScale(d["nGene"]))
                      .attr("r", 2.5)
                      .on('mouseover', function (d, i) {
                         tooltipCircle.style('visibility', 'visible').text(d['cellId'] +' ('+ d['nUMI'] + ', ' + d['nGene'] + ')').attr("transform", "translate("+ (padding.left + xScale(d[0]) + 10) +", " + (padding.top + yScale(d[1]) - 5) + ")")
                       })
                       .on('mousemove', function (d, i) {
                           //  兼容火狐
                          xLine.style("visibility", "visible")
                          yLine.style("visibility", "visible")
                          tooltipX.style("visibility", "visible")
                          tooltipY.style("visibility", "visible")

                          tooltipCircle.style('top', (d3.event.pageY-20)+'px').style('left',(d3.event.pageX+10)+'px')
                       })
                       .on('mouseout', function (d, i) {
                         return tooltipCircle.style('visibility', 'hidden')
                       })
      // 鼠标移动 x y 坐标轴对照线
      scattersvg.on('mousemove', function (d, i) {
                  let x = d3.mouse(this)[0]
                  let y = d3.mouse(this)[1]
                  // 鼠标仅在在图形区域移动触发事件 不含 padding
                  if (x > padding.left && x < width - padding.right && y > padding.top && y < height - padding.bottom) {
                     tooltipX.style('visibility', 'visible').text((xScale.invert(x - padding.left).toFixed(1)))
                     tooltipX.style('top', ((height - padding.bottom - y) + d3.event.pageY)+'px').style('left',(d3.event.pageX - (document.getElementById("tooltipX").clientWidth) / 2)+'px')

                     tooltipY.style('visibility', 'visible').text((yScale.invert(y - padding.top).toFixed(1)))
                     tooltipY.style('top', (d3.event.pageY - (document.getElementById("tooltipX").clientHeight) / 2)  +'px').style('left', (d3.event.pageX - x + padding.left - (document.getElementById("tooltipY").clientWidth))+'px')

                     xLine.style("visibility", "visible")
                     .attr('x1',padding.left)
                     .attr('y1',y)
                     .attr('x2',width - padding.right)
                     .attr('y2',y)

                     yLine.style("visibility", "visible")
                     .attr('x1',x)
                     .attr('y1',padding.top)
                     .attr('x2',x)
                     .attr('y2',height - padding.bottom)
                 } else {
                   // 当鼠标落在 padding 区域，则 x y 指示线隐藏
                   tooltipX.style('visibility', 'hidden')
                   tooltipY.style('visibility', 'hidden')

                   xLine.style('visibility', 'hidden')
                   yLine.style('visibility', 'hidden')
                 }
               })
               .on('mouseleave', function (d, i) {
                 tooltipX.style('visibility', 'hidden')
                 tooltipY.style('visibility', 'hidden')

                 xLine.style('visibility', 'hidden')
                 yLine.style('visibility', 'hidden')
               })
      // x 轴文字
      scattersvg.append("text")
        .attr("transform", "translate("+ width / 2 +", " + 20 + ")")
        .text("nUMI")
        .attr("font-size", "16px")

      // y 轴文字
      scattersvg.append("text")
        .text("nGene")
        .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")

      //  x y 坐标轴导致线条加粗
      scattersvg.selectAll(".domain")
          .style("display", "none");
    },
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
.clear {
  clear: both;
}
</style>
