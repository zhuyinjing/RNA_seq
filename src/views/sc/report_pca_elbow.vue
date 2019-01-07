<template>
  <div id="container">
    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['pc_elbow_plot', 'd3container'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="d3container"></div>

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
      this.axios.get('/singel_cell/server/get_sdev_of_pc?username='+ this.$store.state.username +'&p=' + this.$store.state.projectId).then((res) => {
        if (res.data.message_type === 'success') {
          this.data = res.data.sdevOfPc
          this.initScatterPlot()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    initScatterPlot () {
      let self = this
      let hassvg = d3.selectAll('#scattersvg')
      if (hassvg) {
        d3.selectAll('#scattersvg').remove()
      }
      var width = 700, height = 500;
      var scattersvg = d3.select("#d3container").append("svg").attr("width", width).attr("height", height).attr("id", "scattersvg")
      var data = this.data
      var padding = {top:30,right:30,bottom:60,left:60}
      var xScale = d3.scaleLinear().domain([0, this.data.length]).range([0,width - padding.left - padding.right])
      var yScale = d3.scaleLinear().domain([d3.min(data.map(item => item["standardDeviation"])) - 2, d3.max(data.map(item => item["standardDeviation"])) + 2]).range([height - padding.top - padding.bottom,0]).nice()
      var xAxis = d3.axisBottom().scale(xScale)
      var yAxis = d3.axisLeft().scale(yScale)
      let colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      let tooltip = d3.select('#container')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')

      var x = scattersvg.append("g").call(xAxis).attr("transform","translate("+ padding.left +"," + (height - padding.bottom) +")")

      var y = scattersvg.append("g").call(yAxis).attr("transform","translate("+ padding.left +"," + padding.top +")")

      // svg 被 rect 围住
      var circle = scattersvg.selectAll("circle")
                      .data(data)
                      .enter()
                      .append("circle")
                      .attr("cx", (d) => padding.left + xScale(d["pcNum"]))
                      .attr("cy", (d) => padding.top + yScale(d["standardDeviation"]))
                      .attr("r", 1.8)
                      .on('mouseover', function (d, i) {
                        return tooltip.style('visibility', 'visible').text(d["standardDeviation"].toFixed(2))
                      })
                      .on('mousemove', function (d, i) {
                        return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
                      })
                      .on('mouseout', function (d, i) {
                        return tooltip.style('visibility', 'hidden')
                      })

      // x 轴文字
      scattersvg.append("text")
        .attr("transform", "translate("+ (width / 2 - 25) +", " + height + ")")
        .text("PC")
        .attr("font-size", "16px")

      // y 轴文字
      scattersvg.append("text")
        .text("Standard Deviation of PC")
        .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")

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
#d3container {
  white-space: nowrap;
}
</style>
