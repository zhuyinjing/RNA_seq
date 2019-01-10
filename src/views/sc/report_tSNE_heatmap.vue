<template>
  <div id="container">

    <el-button type="primary" size="small" @click="getData()">{{$t('button.confirm')}}</el-button>
    <el-button type="info" size="small" @click="pcArr = []">{{$t('button.clear')}}</el-button>

    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['heatmap', 'heatmapContainer'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="heatmapContainer"></div>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data() {
    return {
      pcList: [],
      pcArr: [],
      heatmapData: [],
      radius: 3,
      selected: ['ENSG00000205403','ENSG00000251562','ENSG00000003402'],
    }
  },
  components: {
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get('singel_cell/server/get_gene_tsne_heatmap?p='+ this.$store.state.projectId +'&username='+ this.$store.state.username +'&geneId='+ this.selected.join(',')).then((res) => {
        if (res.data.message_type === 'success') {
          this.heatmapData = res.data
          this.initHeatmap()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    initHeatmap () {
      let self = this
      let hassvg = d3.selectAll('#heatmapsvg')
      if (hassvg) {
        d3.selectAll('#heatmapsvg').remove()
      }
      let padding = {top:50,right:10,bottom:30,left:0}
      let width = 5, height = 15  // 每个 rect 的宽度/高度
      let xData = this.heatmapData.groupNum // 一共有几个分组，画几个 g 标签
      let cellNumber = 0
      this.heatmapData.groupNum.map(item => {
        cellNumber+=this.heatmapData[item].cellIdList.length // 获取 cell 的总个数，为了确定 svg 的 width
      })
      let yTextPadding = 100 // 右侧文字所占空间的 width
      let svgWidth = width * cellNumber + (padding.left + padding.right) * xData.length + yTextPadding
      let svgHeight = height * this.selected.length + padding.top + padding.bottom
      let heatmapsvg = d3.select("#heatmapContainer").append("svg").attr("width", svgWidth).attr("height", svgHeight).attr("id", "heatmapsvg")
      let tooltip = d3.select('#container')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')
      let colorValueArr = [] // 把所有分组拼接到一起，为了求所有数据的最大值和最小值 当作 colorScale 的值域
      xData.map(item => {
        colorValueArr = colorValueArr.concat(this.heatmapData[item]['umiMatrixList'])
      })
      let colorScale = d3.scaleSequential().domain(d3.extent(colorValueArr.map(d => d.umiValue))).interpolator(d3.interpolatePlasma)

      let lastWidth = 0 // 记录之前所有的 width
      for (let i = 0;i < xData.length;i++) {
        i === 0? lastWidth = 0 :lastWidth += this.heatmapData[xData[i - 1]].cellIdList.length * width
        let rectData = this.heatmapData[xData[i]].umiMatrixList
        let cellLength = this.heatmapData[xData[i]]['cellIdList'].length
        let geneLength = this.heatmapData[xData[i]]['geneIdList'].length

        let w = lastWidth + (padding.right + padding.left) * i  // 每个 g 的位移
        let h = padding.top
        let svg = heatmapsvg.append("g").attr("transform", "translate("+ w + "," + h +")")

        svg.selectAll("rect")
           .data(rectData)
           .enter()
           .append("rect")
           .attr("x", (d,i) => width * (i % cellLength))
           .attr("y", (d,i) => height * parseInt(i / cellLength))
           .attr("width", width)
           .attr("height", height)
           .attr("fill", (d,i) => colorScale(d.umiValue))
           // .on('mouseover', function (d, i) {
           //    return tooltip.style('visibility', 'visible').text(d.umiValue)
           //  })
           //  .on('mousemove', function (d, i) {
           //    return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
           //  })
           //  .on('mouseout', function (d, i) {
           //    return tooltip.style('visibility', 'hidden')
           //  })

         // x 轴文字
         svg.append("text")
           .attr("transform", "translate("+ (width * cellLength / 2) +", " + (height * geneLength + 20) + ")")
           .text(xData[i])
           .attr("text-anchor", "middle")
           .attr("font-size", "16px")

      }

      // y 轴文字
      heatmapsvg.append("g")
         .attr("transform", (d,i) => {return "translate("+ (svgWidth - yTextPadding) +", " + padding.top + ")"})
         .selectAll(".text")
         .data(this.heatmapData[xData[0]].geneNameList)
         .enter()
         .append("text")
         .attr("transform", (d,i) => {return "translate("+ 0 +", " + ((i + 1) * height) + ")"})
         .text(d => d)
         .attr("font-size", height +"px")

      let defs = heatmapsvg.append("defs");

      let linearGradient = defs.append("linearGradient")
  								.attr("id","linearColor")
  								.attr("x1","0%")
  								.attr("y1","0%")
  								.attr("x2","100%")
  								.attr("y2","0%");
      linearGradient.append("stop")
  						      .attr("offset","0%")
  						      .style("stop-color",d3.interpolatePlasma(0));

      linearGradient.append("stop")
  						      .attr("offset","50%")
  						      .style("stop-color",d3.interpolatePlasma(0.5));

  		linearGradient.append("stop")
        						.attr("offset","100%")
        						.style("stop-color",d3.interpolatePlasma(1));

      heatmapsvg.append("g")
                .attr("transform","translate("+ 0 +","+ 5 +")")
                .attr("id", "legend")
                .append("rect")
      					.attr("x", 0)
      					.attr("y", 0)
      					.attr("width", 100)
      					.attr("height", 30)
      					.style("fill","url(#" + linearGradient.attr("id") + ")")

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
