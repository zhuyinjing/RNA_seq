<template>
      <div class="">
        <imgMenuShowComp></imgMenuShowComp>

        <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">{{$t('report.project')}} {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>junction_plot</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>junction_plot</h2>

        <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['junction_plot', 'rectContainer'])">{{$t('button.svg')}}</el-button>
        <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

        <div id="rectContainer"></div>

      </div>
</template>

<script>
import imgMenuShowComp from '@/components/imgMenuShowComp.vue'
import * as d3 from 'd3'

export default {
  data () {
    return {
      data: null
    }
  },
  components: {
    imgMenuShowComp
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let gene = JSON.parse(sessionStorage.getItem('junction_data'))
      this.axios.get('/server/get_junction_seq_result_info?p='+ this.$store.state.projectId +'&geneId='+ gene.geneId).then(res => {
        if (res.data.message_type === 'success') {
          this.data = res.data
          this.initD3()
        } else {
          this.$message.error('请求出错！')
        }
      }).catch(e => {
        this.$message.error('请求出错！')
      })
    },
    initD3 () {
      let self = this
      let hassvg = d3.selectAll('#rectSvg')
      if (hassvg) {
        d3.selectAll('#rectSvg').remove()
      }
      var width = 1500, height = 900, lineChartHeight = 300
      var rectSvg = d3.select("#rectContainer").append("svg").attr("width", width).attr("height", height).attr("id", "rectSvg")

      var data = this.data
      var padding = {top:30,right:150,bottom:60,left:60}
      var xScale = d3.scaleBand().domain(data.feature).range([0,width - padding.left - padding.right]).padding(0.8)
      var yScale = d3.scaleLinear().domain([data.normCountMin, data.normCountMax]).range([height - padding.top - padding.bottom - lineChartHeight,0]).nice()
      var xAxis = d3.axisBottom().scale(xScale)
      var yAxis = d3.axisLeft().scale(yScale)
      let colorScale = d3.scaleOrdinal(d3.schemeCategory10)

      let tooltip = d3.select('#rectContainer')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('')

      var x = rectSvg.append("g")
                    .call(xAxis)
                    .attr("transform","translate("+ padding.left +"," + (height - padding.bottom - lineChartHeight) +")")
                    .selectAll("text")
                    .style("font-size", "14px")
                    .style("text-anchor", "start")
                    .attr("transform", "rotate(45 -10 10)");

      var y = rectSvg.append("g").call(yAxis).attr("transform","translate("+ padding.left +"," + padding.top +")")

      //  折线图
      // var line = d3.line()
      //     .x(function(d, i) { return padding.left + xScale(d.geneFeature) + xScale.bandwidth() / 2; }) // set the x values for the line generator
      //     .y(function(d) { return padding.top + yScale(d["normCount"]); }) // set the y values for the line generator
      //     .curve(d3.curveLinear) // apply smoothing to the line
      //
      // rectSvg
      //     .selectAll('.line-group')
      //     .data(data.sampleName).enter()
      //     .append("path")
      //     .attr("d", (d) => line((data.junctionSeqResultList.filter(item => item.sampleName === d))))
      //     .attr("fill", "none")
      //     .attr("stroke", (d,i) => colorScale(d.split("_")[0]))
      //     .style("stroke-dasharray", (d, i) => i)

      let linePlotData = data.junctionSeqResultList.filter(d => d.testable === 'TRUE')

      // 小横杠
      rectSvg.selectAll(".line")
             .data(linePlotData)
             .enter()
             .append("path")
             .attr("d", (d, i) => {
               return "M " + (padding.left + xScale(d.geneFeature)) + " " + (padding.top + yScale(d.normCount)) + "L " + (padding.left + xScale(d.geneFeature) + xScale.bandwidth()) + " " + (padding.top + yScale(d.normCount))
             })
             .attr("stroke", d => colorScale(d.sampleGroup))

      // 虚线
      for (let i = 0;i < data.sampleName.length;i++) {
        let arr = linePlotData.filter(item => item.sampleName === data.sampleName[i]) // 筛选出 sampleName 为 data.sampleName[i]
        let temp = JSON.parse(JSON.stringify(arr))
        temp.splice(0, 1)
        rectSvg.selectAll(".line")
               .data(temp)
               .enter()
               .append("path")
               .attr("d", (d, index) => {
                 return "M " + (padding.left + xScale(arr[index].geneFeature) + xScale.bandwidth()) + " " + (padding.top + yScale(arr[index].normCount)) + "L " + (padding.left + xScale(arr[index + 1].geneFeature)) + " " + (padding.top + yScale(arr[index + 1].normCount))
               })
               .attr("stroke", d => colorScale(d.sampleGroup))
               .style("stroke-dasharray", i)
      }


       // 折线图的 circle
       // rectSvg.selectAll(".circle")
       //        .data(data.junctionSeqResultList)
       //        .enter()
       //        .append("circle")
       //        .attr("cx", d => padding.left + xScale(d.geneFeature) + xScale.bandwidth() / 2)
       //        .attr("cy", d => padding.top + yScale(d.normCount))
       //        .attr("r", d => xScale.bandwidth() / 2)
       //        .attr("fill", d => colorScale(d.sampleGroup))

       // legend ： sampleGroup
       let legendGroupHeight = 100
       var geneYScale = d3.scaleLinear().domain([data.normCountMin, data.normCountMax]).range([height - padding.top - padding.bottom,0]).nice()
       let legendGroup = rectSvg.append("g").attr("transform", "translate("+ (width - padding.right + 10) +","+ padding.top +")")

       let legendRectWidth = 20, legendRectHeight = 20, legendRectMargin = 5
       legendGroup.selectAll(".rect")
                  .data(data.sampleGroup)
                  .enter()
                  .append("rect")
                  .attr("x", 0)
                  .attr("y", (d, i) => i * (legendRectHeight + legendRectMargin))
                  .attr("width", legendRectWidth)
                  .attr("height", legendRectHeight)
                  .attr("fill", d => colorScale(d))

        legendGroup.selectAll(".text")
                   .data(data.sampleGroup)
                   .enter()
                   .append("text")
                   .attr("transform", (d,i) => "translate("+ (legendRectWidth + legendRectMargin) +","+ (i * (legendRectHeight + legendRectMargin) + (legendRectHeight / 2 + legendRectMargin)) +")")
                   .text(d => d)

         // legend: sample
         let legendBatchFit = rectSvg.append("g").attr("transform","translate("+ (width - padding.right + 10) +","+ legendGroupHeight +")")
         let legendHeight = 20

         legendBatchFit.selectAll(".legend")
                   .data(data.sampleName)
                   .enter()
                   .append("line")
                   .attr("x1", 0)
                   .attr("y1", (d, i) => i * legendHeight + 10)
                   .attr("x2", 20)
                   .attr("y2", (d, i) => i * legendHeight + 10)
                   .attr("stroke", "black")
                   .style("stroke-dasharray", (d, i) => i)

           legendBatchFit.selectAll(".text")
                     .data(data.sampleName)
                     .enter()
                     .append("text")
                     .attr("transform",(d,i) => "translate(30,"+ (i * legendHeight + 15) +")")
                     .text(d => d)

    },
  }
}
</script>

<style scoped="true">
</style>
