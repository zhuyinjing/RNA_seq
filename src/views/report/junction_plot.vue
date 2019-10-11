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
      var width = 1500, height = 700;
      var rectSvg = d3.select("#rectContainer").append("svg").attr("width", width).attr("height", height).attr("id", "rectSvg")

      var data = this.data
      var padding = {top:30,right:100,bottom:60,left:60}
      var xScale = d3.scaleBand().domain(data.feature).range([0,width - padding.left - padding.right]).padding(0.8)
      var yScale = d3.scaleLinear().domain([data.normCountMin, data.normCountMax]).range([height - padding.top - padding.bottom,0]).nice()
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
                    .attr("transform","translate("+ padding.left +"," + (height - padding.bottom) +")")
                    .selectAll("text")
                    .style("font-size", "14px")
                    .style("text-anchor", "start")
                    .attr("transform", "rotate(45 -10 10)");

      var y = rectSvg.append("g").call(yAxis).attr("transform","translate("+ padding.left +"," + padding.top +")")


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

      rectSvg.selectAll(".line")
             .data(data.junctionSeqResultList)
             .enter()
             .append("path")
             .attr("d", (d, i) => {
               return "M " + (padding.left + xScale(d.geneFeature)) + " " + (padding.top + yScale(d.normCount)) + "L " + (padding.left + xScale(d.geneFeature) + xScale.bandwidth()) + " " + (padding.top + yScale(d.normCount))
             })
             .attr("stroke", d => colorScale(d.sampleGroup))
             // .style("stroke-dasharray", d => data.sampleName.indexOf(d.sampleName))


      for (let i = 0;i < data.sampleName.length;i++) {
        let arr = data.junctionSeqResultList.filter(item => item.sampleName === data.sampleName[i]) // 筛选出 sampleName 为 data.sampleName[i]
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

       // rectSvg.selectAll(".circle")
       //        .data(data.junctionSeqResultList)
       //        .enter()
       //        .append("circle")
       //        .attr("cx", d => padding.left + xScale(d.geneFeature) + xScale.bandwidth() / 2)
       //        .attr("cy", d => padding.top + yScale(d.normCount))
       //        .attr("r", d => xScale.bandwidth() / 2)
       //        .attr("fill", d => colorScale(d.sampleGroup))


          return

      // x 轴文字
      rectSvg.append("text")
        .attr("transform", "translate("+ (width / 2) +", " + height + ")")
        .text(data.geneInfo.geneId)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")

      // y 轴文字
      rectSvg.append("text")
        .text("Read counts")
        .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")

      // legend: Condition
      let legendHeight = 20
      let legendCondition = rectSvg.append("g").attr("transform","translate("+ (width - padding.right) +","+ (height / 6) +")")

      legendCondition.append("text")
                .attr("transform","translate(5,0)")
                .text("Condition")

      legendCondition.selectAll(".legend")
                .data(Array.from(new Set(Object.values(data.batchCondition))))
                .enter()
                .append("line")
                .attr("x1", 5)
                .attr("y1", (d, i) => i * legendHeight + 10)
                .attr("x2", 30)
                .attr("y2", (d, i) => i * legendHeight + 10)
                .attr("stroke", d => colorScale(d))
                .attr("stroke-width", 3)

        legendCondition.selectAll(".legend")
                  .data(Array.from(new Set(Object.values(data.batchCondition))))
                  .enter()
                  .append("circle")
                  .attr("cx", 18)
                  .attr("cy", (d, i) => i * legendHeight + 10)
                  .attr("r", 4)
                  .attr("fill", d => colorScale(d))

        legendCondition.selectAll(".text")
                  .data(Array.from(new Set(Object.values(data.batchCondition))))
                  .enter()
                  .append("text")
                  .attr("transform",(d,i) => "translate(35,"+ (i * legendHeight + 15) +")")
                  .text(d => d)

      // legend: Batch
      let legendBatch = rectSvg.append("g").attr("transform","translate("+ (width - padding.right) +","+ (height / 3) +")")

      legendBatch.append("text")
                .attr("transform","translate(5,0)")
                .text("Batch")

      legendBatch.selectAll(".legend")
                .data(data.batch)
                .enter()
                .append("path")
                .attr('d', function(d) {
                  symbolGenerator.type(d3[symbolScale(d)]);
                  return symbolGenerator();
                })
                .attr("fill", (d,i) => "black")
                .attr('transform', function(d, i) {
                  return 'translate(15, '+ (i * legendHeight + 12) +')'
                })

        legendBatch.selectAll(".text")
                  .data(data.batch)
                  .enter()
                  .append("text")
                  .attr("transform",(d,i) => "translate(35,"+ (i * legendHeight + 15) +")")
                  .text(d => d)

      // legend: BatchFit
      let legendBatchFit = rectSvg.append("g").attr("transform","translate("+ (width - padding.right) +","+ (height / 1.5) +")")

      legendBatchFit.append("text")
                .attr("transform","translate(5,0)")
                .text("BatchFit")

      legendBatchFit.selectAll(".legend")
                .data(data.batch)
                .enter()
                .append("line")
                .attr("x1", 5)
                .attr("y1", (d, i) => i * legendHeight + 10)
                .attr("x2", 30)
                .attr("y2", (d, i) => i * legendHeight + 10)
                .attr("stroke", "black")
                .attr("stroke-width", 3)
                .style("stroke-dasharray", (d, i) => i)

        legendBatchFit.selectAll(".text")
                  .data(data.batch)
                  .enter()
                  .append("text")
                  .attr("transform",(d,i) => "translate(35,"+ (i * legendHeight + 15) +")")
                  .text(d => d)
    },
  }
}
</script>

<style scoped="true">
</style>
