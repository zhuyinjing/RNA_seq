<template>
      <div class="">
        <imgMenuShowComp></imgMenuShowComp>

        <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">{{$t('report.project')}} {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>时序性差异表达基因轨迹图</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>时序性差异表达基因轨迹图</h2>

        <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['gene_fusion', 'rectContainer'])">{{$t('button.svg')}}</el-button>
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
      let gene = JSON.parse(sessionStorage.getItem('gene_fusion_data'))
      this.axios.get('/server/get_gene_fusion_info?p='+ this.$store.state.projectId +'&sampleName='+ gene.sampleName +'&geneId='+ gene.geneId).then(res => {
        if (res.data.message_type === 'success') {
          this.data = res.data.geneFusion
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
      var width = 800, height = 500;
      var rectSvg = d3.select("#rectContainer").append("svg").attr("width", width).attr("height", height).attr("id", "rectSvg")

      var data = this.data
      var padding = {top:30,right:100,bottom:60,left:30}
      var xScale = d3.scaleLinear().domain(data.fusionCoords).range([padding.left, width - padding.right])
      var xAxis = d3.axisBottom().scale(xScale)
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

      let rectGroup = rectSvg.append("g").attr("transform", "translate(0,50)")

      let rectHeight = 15

      rectGroup
          .append("rect")
          .attr("x",xScale(data.fusionCoords[0]))
          .attr("y",0)
          .attr("width", xScale(data.lengthPair[0]))
          .attr("height", rectHeight)
          .attr("fill", (d,i) => colorScale(1))

      rectGroup
          .append("rect")
          .attr("x",xScale(data.lengthPair[0]))
          .attr("y",0)
          .attr("width", xScale(data.lengthPair[1]))
          .attr("height", rectHeight)
          .attr("fill", (d,i) => colorScale(2))

      if (data.domainCoords[0] !== 'NA') {
        rectGroup
            .append("rect")
            .attr("x",xScale(data.orfCoords[0]))
            .attr("y",rectHeight)
            .attr("width", xScale(data.orfCoords[1] - data.orfCoords[0]))
            .attr("height", rectHeight)
            .attr("fill", (d,i) => colorScale(3))

        rectGroup
            .append("rect")
            .attr("x",xScale(data.domainCoords[0]))
            .attr("y",rectHeight * 2)
            .attr("width", xScale(data.domainCoords[1] - data.domainCoords[0]))
            .attr("height", rectHeight)
            .attr("fill", (d,i) => colorScale(4))

        rectGroup
            .append("text")
            .attr("transform", "translate(" + xScale(data.domainCoords[0] - 0 + ((data.domainCoords[1] - data.domainCoords[0]) / 2)) + ", "+ rectHeight * 4 +")")
            .text(data.pfamDesc)
            .style('text-anchor', 'middle')
      }

    },
  }
}
</script>

<style scoped="true">
</style>
