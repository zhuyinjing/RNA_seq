<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>
      <div class="">
        <imgMenuShowComp></imgMenuShowComp>

        <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">{{$t('report.project')}} {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>时序性差异表达基因轨迹图</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>时序性差异表达基因轨迹图</h2>

        <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['时序性差异表达基因轨迹图', 'lineContainer'])">{{$t('button.svg')}}</el-button>
        <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

        <div id="lineContainer"></div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
import leftMenu from '@/components/leftMenu.vue'
import imgMenuShowComp from '@/components/imgMenuShowComp.vue'
import * as d3 from 'd3'

export default {
  data () {
    return {
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let gene = JSON.parse(sessionStorage.getItem('time_series_data'))
      this.axios.get('/server/get_gene_time_series_info?p='+ this.$store.state.projectId +'&geneId='+ gene.geneId +'&pAdj='+ gene.pAdj).then(res => {
        this.initD3()
      })
    },
    initD3 () {
      let self = this
      let hassvg = d3.selectAll('#scattersvg')
      if (hassvg) {
        d3.selectAll('#scattersvg').remove()
      }
      var width = 900, height = 600;
      var scattersvg = d3.select("#lineContainer").append("svg").attr("width", width).attr("height", height).attr("id", "scattersvg")

      var data = this.data.sdevOfPc
      var padding = {top:30,right:100,bottom:60,left:60}
      var xScale = d3.scaleLinear().domain([0, 30]).range([0,width - padding.left - padding.right])
      var yScale = d3.scaleLinear().domain([0, 1]).range([height - padding.top - padding.bottom,0]).nice()
      var xAxis = d3.axisBottom().scale(xScale)
      var yAxis = d3.axisLeft().scale(yScale)
      let colorScale = d3.scaleOrdinal(d3.schemeCategory10)

      var x = scattersvg.append("g").call(xAxis).attr("transform","translate("+ padding.left +"," + (height - padding.bottom) +")")

      var y = scattersvg.append("g").call(yAxis).attr("transform","translate("+ padding.left +"," + padding.top +")")

      var line = d3.line()
          .x(function(d, i) { return padding.left + xScale(d["pcNum"]); }) // set the x values for the line generator
          .y(function(d) { return padding.top + yScale(d["standardDeviation"]); }) // set the y values for the line generator
          .curve(d3.curveMonotoneX) // apply smoothing to the line

      let krr = [{pcNum:2,standardDeviation:0.4,id:'cc'},{pcNum:6,standardDeviation:1,id:'cc'},{pcNum:4,standardDeviation:11,id:'pc'},{pcNum:8,standardDeviation:4,id:'pc'}]
      scattersvg
          .selectAll('.line-group')
          .data(this.data.groupName).enter()
          .append('g')
          .append("path")
          // .datum(data) // 10 . Binds data to the line
          .attr("d", (d) => line(data.filter(item => item.sampleGroup === d.groupName)))
          .attr("fill", "none")
          .attr("stroke", (d,i) => colorScale(d.groupName))
          .attr("stroke-width", "3")

      // x 轴文字
      scattersvg.append("text")
        .attr("transform", "translate("+ (width / 2) +", " + height + ")")
        .text("CC")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")

      // y 轴文字
      scattersvg.append("text")
        .text("Shared Correlation Strength")
        .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")

      // legend
      let legendHeight = 20
      let legendGroup = scattersvg.append("g").attr("transform","translate("+ (width - padding.right) +","+ (height / 3) +")")
      legendGroup.selectAll(".legend")
                .data(this.data.groupName)
                .enter()
                .append("line")
                .attr("x1", 5)
                .attr("y1", (d, i) => i * legendHeight + 5)
                .attr("x2", 30)
                .attr("y2", (d, i) => i * legendHeight + 5)
                .attr("fill", (d, i) => colorScale(d.groupName))
                .attr("stroke", (d, i) => colorScale(d.groupName))
                .attr("stroke-width", 3)
        legendGroup.selectAll(".text")
                  .data(this.data.groupName)
                  .enter()
                  .append("text")
                  .attr("transform",(d,i) => "translate(35,"+ (i * legendHeight + 10) +")")
                  .text(d => d.groupName)
    },
  }
}
</script>

<style scoped="true">
</style>
