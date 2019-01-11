<template>
  <div id="container">

    <el-button type="primary" size="small" @click="getScatterData()">{{$t('button.confirm')}}</el-button>
    <el-button type="info" size="small" @click="selected = []">{{$t('button.clear')}}</el-button>

    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['scatter', 'scatterContainer'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="scatterContainer"></div>

  </div>
</template>

<script>
import * as d3 from 'd3'
import * as d3Chromatic from 'd3-scale-chromatic'

export default {
  data() {
    return {
      pcList: [],
      selected: [],
      scatterData: [],
      radius: 3,
      selected: ['ENSG00000205403','ENSG00000251562','ENSG00000003402'],
    }
  },
  components: {
  },
  mounted() {
    this.getScatterData()
  },
  methods: {
    getScatterData () {
      this.axios.get('singel_cell/server/get_gene_tsne_score?p='+ this.$store.state.projectId +'&username='+ this.$store.state.username +'&geneId='+ this.selected.join(',')).then((res) => {
        if (res.data.message_type === 'success') {
          this.scatterData = res.data
          this.initScatter()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    initScatter () {
      let self = this
      let hassvg = d3.selectAll('#scattersvg')
      if (hassvg) {
        d3.selectAll('#scattersvg').remove()
      }
      let width = 500, height = 300 // 每个 g 标签的宽度/高度
      let padding = {top:50,right:80,bottom:40,left:60}
      let number = 2 // 一行显示几个图
      let scattersvg = d3.select("#scatterContainer").append("svg").attr("width", width * number).attr("height", (height * Math.ceil(this.selected.length / number))).attr("id", "scattersvg")
      let tooltip = d3.select('#container')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')
      let tsneNum = this.scatterData.tsneNumList.tsneNum // ["tSNE_1", "tSNE_2"]

      for (let i = 0;i < this.selected.length;i++) {
        let svg = scattersvg.append("g").attr("transform", "translate("+ ((i % number) * width) + "," + (parseInt(i / number) * height) +")")
        let xData = this.scatterData[tsneNum[0]]
        let yData = this.scatterData[tsneNum[1]]
        let colorValue = this.scatterData[this.selected[i]] // 每个 circle 的值，为了区别颜色的深浅
        let colorScale = d3.scaleSequential(d3Chromatic.interpolatePurples).domain(d3.extent(colorValue))

        let xScale = d3.scaleLinear().domain(d3.extent(xData)).range([padding.left,width - padding.right]).nice()
        svg.append("g")
          .attr("transform", "translate(0," + (height - padding.bottom) + ")")
          .call(d3.axisBottom(xScale).tickValues([-20,0,20]))
          .selectAll("text")

        let yScale = d3.scaleLinear().domain(d3.extent(yData)).range([height - padding.bottom, padding.top]).nice()
        svg.append("g")
          .attr("transform", "translate(" + (padding.left) + ",0)")
          .call(d3.axisLeft(yScale).tickValues([-20,0,20]))

        svg.selectAll("circle")
           .data(xData)
           .enter()
           .append("circle")
           .attr("cx", (d,i) => xScale(xData[i]))
           .attr("cy", (d,i) => yScale(yData[i]))
           .attr("r", 2.5)
           .attr("fill", (d,i) => colorScale(colorValue[i]))
           .on('mouseover', function (d, i) {
               return tooltip.style('visibility', 'visible').text(self.scatterData.cellId[i])
             })
             .on('mousemove', function (d, i) {
               return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
             })
             .on('mouseout', function (d, i) {
               return tooltip.style('visibility', 'hidden')
             })

         // x 轴文字
         svg.append("text")
           .attr("transform", "translate("+ (width / 2) +", " + height + ")")
           .text(tsneNum[0])
           .attr("text-anchor", "middle")

         // 标题
         svg.append("text")
           .attr("transform", "translate("+ (width / 2) +", " + (padding.top - 10) + ")")
           .text(this.scatterData.geneMap[this.selected[i]])
           .attr("text-anchor", "middle")
           .attr("font-weight", 600)

         // y 轴文字
         svg.append("text")
           .text(tsneNum[1])
           .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")


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
