<template>
  <div id="container" v-loading="loading"  element-loading-text="请稍等，数据正在加载中..." element-loading-spinner="el-icon-loading" style="height:100%">
    <el-checkbox-group
      v-model="pcArr">
      <el-checkbox v-for="item in pcList" :label="item" :key="item" style="width:20%;">{{item}}</el-checkbox>
    </el-checkbox-group>

    <br>

    <el-button type="primary" size="small" @click="getData()">{{$t('button.confirm')}}</el-button>
    <el-button type="info" size="small" @click="pcArr = []">{{$t('button.clear')}}</el-button>

    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['JackStrawPlot', 'd3container'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="d3container"></div>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data() {
    return {
      pcList: [],
      pcArr: [],
      data: [],
      radius: 3,
      loading: false
    }
  },
  components: {
  },
  mounted() {
    this.axios.get('singel_cell/server/get_jack_straw_plot?p='+ this.$store.state.projectId +'&username='+ this.$store.state.username +'&pcNum='+ this.pcArr.join(',')).then((res) => {
      if (res.data.message_type === 'success') {
        this.pcList = res.data.pcNumList.pcNum
        this.pcArr = this.pcList.slice(0,6)
        this.getData()
      } else {
        this.$message.error(res.data.message)
      }
    })
  },
  methods: {
    getData () {
      this.loading = true
      this.axios.get('singel_cell/server/get_jack_straw_plot?p='+ this.$store.state.projectId +'&username='+ this.$store.state.username +'&pcNum='+ this.pcArr.join(',')).then((res) => {
        if (res.data.message_type === 'success') {
          this.data = res.data
          this.initScatterPlot()
        } else {
          this.$message.error(res.data.message)
        }
        this.loading = false
      }).catch(() => {
        this.$message.error('请求出错！')
        this.loading = false
      })
    },
    initScatterPlot () {
      let self = this
      let hassvg = d3.selectAll('svg')
      if (hassvg) {
        d3.selectAll('svg').remove()
      }
      let width = 500, height = 300 // 每个 g 标签的宽度/高度
      let padding = {top:30,right:20,bottom:60,left:60}
      let number = 3 // 一行显示几个图
      let scattersvg = d3.select("#d3container").append("svg").attr("width", width * number).attr("height", (height * Math.ceil(this.pcArr.length / number))).attr("id", "scattersvg")
      let colorScale = d3.scaleOrdinal(d3.schemeCategory20)
      let tooltip = d3.select('#container')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')

      for (let i = 0;i < this.pcArr.length;i++) {
        let svg = scattersvg.append("g").attr("transform", "translate("+ ((i % number) * width) + "," + (parseInt(i / number) * height) +")")

        let xData = this.data[this.pcArr[i]].jackStawPlot.map(item => item.empiricalPValue)
        let yData = this.data[this.pcArr[i]].jackStawPlot.map(item => item.fakePValue)

        let xScale = d3.scaleLinear().domain([0,d3.max(xData)*1.2]).range([padding.left,width - padding.right]).nice()
        svg.append("g")
          .attr("transform", "translate(0," + (height - padding.bottom) + ")")
          .call(d3.axisBottom(xScale))
          .selectAll("text")
          // .style("text-anchor", "start")
          // .attr("transform", "rotate(45 -10 10)");

        let yScale = d3.scaleLinear().domain([0,d3.max(yData)*1.2]).range([height - padding.bottom, padding.top]).nice()
        svg.append("g")
          .attr("transform", "translate(" + (padding.left) + ",0)")
          .call(d3.axisLeft(yScale))

        svg.selectAll("circle")
           .data(this.data[this.pcArr[i]].jackStawPlot)
           .enter()
           .append("circle")
           .attr("cx", (d,i) => xScale(d.empiricalPValue))
           .attr("cy", (d,i) => yScale(d.fakePValue))
           .attr("r", self.radius)
           .attr("fill", "#0600ff")

         // x 轴文字
         svg.append("text")
           .attr("transform", "translate("+ (width / 2) +", " + (padding.top - 5) + ")")
           .text(this.pcArr[i] + '\xa0\xa0' + this.data[this.pcArr[i]].jackStrawPlotProp[0].propPValue)
           .attr("text-anchor", "middle")
           .attr("font-size", "16px")

         //  上边 和 右边 两侧的 line
         // svg.append("rect").attr("x",padding.left).attr("y",padding.top).attr("width",width-padding.left-padding.right).attr("height",height-padding.top-padding.bottom).attr("stroke","black").attr("fill","none").attr("stroke-width","1px")
         svg.append("line").attr("x1", padding.left).attr("y1", padding.top).attr("x2",width-padding.right).attr("y2",padding.top).attr("stroke","black").attr("stroke-width","1px")
         svg.append("line").attr("x1", width-padding.right).attr("y1", padding.top).attr("x2",width-padding.right).attr("y2",height - padding.bottom).attr("stroke","black").attr("stroke-width","1px")

         // 斜率为 1 的虚线
         svg.append("line")
            .attr("x1", xScale(0))
            .attr("y1", yScale(0))
            .attr("x2", xScale(xScale.domain()[1]))
            .attr("y2", yScale(xScale.domain()[1]))
            .attr("stroke", "#666")
            .attr("stroke-dasharray", 5)

      }

    },
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
.el-checkbox+.el-checkbox {
  margin-left: 0 !important;
}
</style>
