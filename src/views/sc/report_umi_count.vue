<template>
  <div id="container">
    <div class="svgContainer">
      <div class="svgbox">
        <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['nGene', 'nGeneContainer'])">{{$t('button.svg')}}</el-button>
        <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

        <div id="nGeneContainer"></div>
      </div>
      <div class="svgbox">
        <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['nUMI', 'nUMIContainer'])">{{$t('button.svg')}}</el-button>
        <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

        <div id="nUMIContainer"></div>
      </div>
      <div class="svgbox">
        <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['nGene&nUMI', 'scatterContainer'])">{{$t('button.svg')}}</el-button>
        <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

        <div id="scatterContainer"></div>
      </div>
    </div>

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
      var margin = {top: 15, right: 30, bottom: 30, left: 40},
          width = 400 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#nGeneContainer")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("id","nGenesvg")
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Read the data and compute summary statistics for each specie
        var data = this.data
        var sampleData = this.data.map(item => item.nGene)

        // Build and Show the Y scale
        var y = d3.scaleLinear()
          .domain([d3.min(sampleData) * 1.2,d3.max(sampleData) * 1.2])          // Note that here the Y scale is set manually
          .range([height, 0]).nice()
        svg.append("g").call( d3.axisLeft(y) )

        // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
        var x = d3.scaleBand()
          .range([ 0, width ])
          .domain([this.data[0].origIdent])
          .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum..

        var xLinear = d3.scaleLinear().domain([0,width]).range([0,width])


        let x0 = Math.ceil(x(this.data[0].origIdent))
        let x1 = Math.floor(x(this.data[0].origIdent) + x.bandwidth())

        var xData = d3.range(sampleData.length).map(d => d3.randomUniform(x0, x1)())

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        // Features of the histogram
        var histogram = d3.histogram()
            .domain([d3.min(sampleData),y.domain()[1]])
            .thresholds(y.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
            .value(d => d)
        var input, bins,allBins,lengths,longuest
        // Compute the binning for each group of the dataset
        var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.origIdent;})
            .rollup(function(d) {   // For each key..
              input = d.map(function(g) { return g.nGene;})    // Keep the variable called Sepal_Length
              bins = histogram(input)   // And compute the binning on it.
              return(bins)
            })
            .entries(data)

        // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
        var maxNum = 0
        for (let i in sumstat ){
          allBins = sumstat[i].value
          lengths = allBins.map(function(a){return a.length;})
          longuest = d3.max(lengths)
          if (longuest > maxNum) { maxNum = longuest }
        }
        // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
        var xNum = d3.scaleLinear()
          .range([0, x.bandwidth()])
          .domain([-maxNum,maxNum])

        // Add the shape to this svg!
        svg
          .selectAll("myViolin")
          .data(sumstat)
          .enter()        // So now we are working group per group
          .append("g")
            .attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
          .append("path")
              .datum(function(d){ return(d.value)})     // So now we are working bin per bin
              .style("stroke", "black")
              .style("fill","#f8766d")
              .attr("d", d3.area()
                  .x0(function(d){ return(xNum(-d.length)) } )
                  .x1(function(d){ return(xNum(d.length)) } )
                  .y(function(d){ return(y(d.x0)) } )
                  .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
              )

          svg.selectAll("g.circle")
            .data(xData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinear(d))
            .attr("cy", (d, i) => y(sampleData[i]))
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

            svg.append("text")
              .attr("transform", "translate("+ (width / 2 - 20) +", 0)")
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
      var margin = {top: 15, right: 30, bottom: 30, left: 40},
          width = 400 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#nUMIContainer")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("id","nUMIsvg")
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Read the data and compute summary statistics for each specie
        var data = this.data
        var sampleData = this.data.map(item => item.nUMI)

        // Build and Show the Y scale
        var y = d3.scaleLinear()
          .domain([d3.min(sampleData) * 1.2,d3.max(sampleData) * 1.2])          // Note that here the Y scale is set manually
          .range([height, 0]).nice()
        svg.append("g").call( d3.axisLeft(y) )

        // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
        var x = d3.scaleBand()
          .range([ 0, width ])
          .domain([this.data[0].origIdent])
          .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum..

        var xLinear = d3.scaleLinear().domain([0,width]).range([0,width])


        let x0 = Math.ceil(x(this.data[0].origIdent))
        let x1 = Math.floor(x(this.data[0].origIdent) + x.bandwidth())

        var xData = d3.range(sampleData.length).map(d => d3.randomUniform(x0, x1)())

        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        // Features of the histogram
        var histogram = d3.histogram()
            .domain([d3.min(sampleData),y.domain()[1]])
            .thresholds(y.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
            .value(d => d)
        var input, bins,allBins,lengths,longuest
        // Compute the binning for each group of the dataset
        var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.origIdent;})
            .rollup(function(d) {   // For each key..
              input = d.map(function(g) { return g.nUMI;})    // Keep the variable called Sepal_Length
              bins = histogram(input)   // And compute the binning on it.
              return(bins)
            })
            .entries(data)

        // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
        var maxNum = 0
        for (let i in sumstat ){
          allBins = sumstat[i].value
          lengths = allBins.map(function(a){return a.length;})
          longuest = d3.max(lengths)
          if (longuest > maxNum) { maxNum = longuest }
        }
        // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
        var xNum = d3.scaleLinear()
          .range([0, x.bandwidth()])
          .domain([-maxNum,maxNum])

        // Add the shape to this svg!
        svg
          .selectAll("myViolin")
          .data(sumstat)
          .enter()        // So now we are working group per group
          .append("g")
            .attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
          .append("path")
              .datum(function(d){ return(d.value)})     // So now we are working bin per bin
              .style("stroke", "black")
              .style("fill","#f8766d")
              .attr("d", d3.area()
                  .x0(function(d){ return(xNum(-d.length)) } )
                  .x1(function(d){ return(xNum(d.length)) } )
                  .y(function(d){ return(y(d.x0)) } )
                  .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
              )

          svg.selectAll("g.circle")
            .data(xData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinear(d))
            .attr("cy", (d, i) => y(sampleData[i]))
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

            svg.append("text")
              .attr("transform", "translate("+ (width / 2 - 20) +", 0)")
              .text("nUMI")
              .attr("font-size", "16px")


    },
    initScatterPlot () {
      let self = this
      let hassvg = d3.selectAll('#scattersvg')
      if (hassvg) {
        d3.selectAll('#scattersvg').remove()
      }
      var width = 400, height = 500;
      var scattersvg = d3.select("#scatterContainer").append("svg").attr("width", width).attr("height", height).attr("id", "scattersvg")
      var data = this.data
      var padding = {top: 20, right: 30, bottom: 50, left: 55}
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
        .attr("transform", "translate("+ width / 2 +", " + 15 + ")")
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
.svgContainer {
  white-space: nowrap;
}
.svgbox {
  display: inline-block;
}
</style>
