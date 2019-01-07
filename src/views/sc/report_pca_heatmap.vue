<template>
  <div id="container">
    <el-checkbox-group
      v-model="pcArr">
      <el-checkbox v-for="item in pcList" :label="item" :key="item" style="width:20%;">{{item}}</el-checkbox>
    </el-checkbox-group>

    <br>

    <el-button type="primary" size="small" @click="getData()">{{$t('button.confirm')}}</el-button>
    <el-button type="info" size="small" @click="pcArr = []">{{$t('button.clear')}}</el-button>

    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['vizPCA', 'd3container'])">{{$t('button.svg')}}</el-button>
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
    }
  },
  components: {
  },
  mounted() {
    this.axios.get('singel_cell/server/get_pca_heatmap?p='+ this.$store.state.projectId +'&username='+ this.$store.state.username).then((res) => {
      if (res.data.message_type === 'success') {
        this.pcList = res.data.pcNumList.pcNum
        this.pcArr = this.pcList.slice(0,2)
        this.getData()
      } else {
        this.$message.error(res.data.message)
      }
    })
  },
  methods: {
    getData () {
      this.axios.get('singel_cell/server/get_pca_heatmap?p='+ this.$store.state.projectId +'&username='+ this.$store.state.username +'&pcNum='+ this.pcArr.join(',')).then((res) => {
        if (res.data.message_type === 'success') {
          this.data = res.data
          this.initHeatmap()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    initHeatmap () {
      let self = this
      let hassvg = d3.selectAll('svg')
      if (hassvg) {
        d3.selectAll('svg').remove()
      }
      let padding = {top:30,right:80,bottom:60,left:0}
      let width = 5, height = 15  // 每个 rect 的宽度/高度
      let heatmapsvg = d3.select("#d3container").append("svg").attr("width", (width * this.data.cellId.length + padding.left + padding.right) * 3).attr("height", ((height * this.data[this.pcArr[0]].geneIdList.length + padding.top + padding.bottom) * Math.ceil(this.pcArr.length / 3))).attr("id", "heatmapsvg")
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
        let xData = this.data.cellId
        let rectData = this.data[this.pcArr[i]].umiMatrixList
        let yText = this.data[this.pcArr[i]].geneIdList

        let colorScale = d3.scaleSequential().domain(d3.extent(rectData)).interpolator(d3.interpolatePlasma)

        let w = (width * xData.length + padding.right) * (i % 3) + (padding.left * (parseInt(i / 3) + 1)) // 每个 g 的位移
        let h = (height * yText.length + padding.bottom) * parseInt(i / 3) + (padding.top * (parseInt(i / 3) + 1))
        let svg = heatmapsvg.append("g").attr("transform", "translate("+ w + "," + h +")")

        svg.selectAll("rect")
           .data(rectData)
           .enter()
           .append("rect")
           .attr("x", (d,i) => width * (i % xData.length))
           .attr("y", (d,i) => height * parseInt(i / xData.length))
           .attr("width", width)
           .attr("height", height)
           .attr("fill", (d,i) => colorScale(d))
          // .on('mouseover', function (d, i) {
          //     return tooltip.style('visibility', 'visible').text(d)
          //   })
          //   .on('mousemove', function (d, i) {
          //     return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
          //   })
          //   .on('mouseout', function (d, i) {
          //     return tooltip.style('visibility', 'hidden')
          //   })

         // x 轴文字
         svg.append("text")
           .attr("transform", "translate("+ (width * this.data.cellId.length / 2) +", " + (height * yText.length + 15) + ")")
           .text(this.pcArr[i])
           .attr("font-size", "16px")

         // x 轴文字
         svg.append("text")
           .attr("transform", "translate("+ (width * this.data.cellId.length / 2) +", " + (height * yText.length + 15) + ")")
           .text(this.pcArr[i])
           .attr("font-size", "16px")



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
