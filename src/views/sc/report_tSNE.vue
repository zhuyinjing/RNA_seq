<template>
  <div id="container">
    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['tSNE', 'd3container'])">{{$t('button.svg')}}</el-button>
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
      this.axios.get('/singel_cell/server/get_tsne_score?username='+ this.$store.state.username +'&p=' + this.$store.state.projectId).then((res) => {
        if (res.data.message_type === 'success') {
          this.data = res.data
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
      let width = 1000, height = 600
      let padding = {top:30,right:80,bottom:60,left:60}
      let scattersvg = d3.select("#d3container").append("svg").attr("width", width).attr("height", height).attr("id", "scattersvg")
      let svg = scattersvg.append("g").attr("transform", "translate("+ padding.left + "," + padding.top +")")
      let colorScale = d3.scaleOrdinal(d3.schemeCategory20)

      let xScale = d3.scaleLinear().domain(d3.extent(this.data.tSNE_1)).range([0,width - padding.left - padding.right]).nice()
      svg.append("g").attr("transform","translate(0,"+ (height - padding.bottom - padding.top) +")").call(d3.axisBottom(xScale))

      let yScale = d3.scaleLinear().domain(d3.extent(this.data.tSNE_2)).range([height - padding.top - padding.bottom,0]).nice()
      svg.append("g").call(d3.axisLeft(yScale))

      let circles = svg.selectAll("circle")
         .data(this.data.cellId)
         .enter()
         .append("circle")
         .attr("cx", (d,i) => {
           return xScale(self.data.tSNE_1[i])
         })
         .attr("cy", (d,i) => {
           return yScale(self.data.tSNE_2[i])
         })
         .attr("r",2.5)
         .attr("fill", (d,i) => {
           return colorScale(self.data.groupId[i])
         })

      //  上边 和 右边 两侧的 line
      svg.append("line").attr("x1", 0).attr("y1", 0).attr("x2",width-padding.right-padding.left).attr("y2",0).attr("stroke","black").attr("stroke-width","1px")
      svg.append("line").attr("x1", width-padding.right-padding.left).attr("y1", 0).attr("x2",width-padding.right-padding.left).attr("y2",height-padding.top-padding.bottom).attr("stroke","black").attr("stroke-width","1px")

      // x 轴文字
      scattersvg.append("text")
        .attr("transform", "translate("+ (width / 2) +", " + (height - 5) + ")")
        .text("tSNE_1")
        .attr("text-anchor", "middle")

      // y 轴文字
      scattersvg.append("text")
        .text("tSNE_2")
        .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")

      //  图例
      let legendR = 8
      let groups = Array.from(new Set(this.data.groupId)) // 分组去重
      let legend = scattersvg.append("g").attr("transform","translate("+(width-padding.right + 30)+","+(height/3)+")")
      legend.selectAll(".circle")
            .data(groups)
            .enter()
            .append("circle")
            .attr("cx",0)
            .attr("cy",(d,i) => i * 30)
            .attr("r",legendR)
            .attr("fill", d => colorScale(d))

      legend.selectAll(".text")
            .data(groups)
            .enter()
            .append("text")
            .attr("transform",(d,i) => {
              return "translate(" + (legendR * 2) +","+ (legendR/2 + i * 30) +")"
            })
            .text(d => d)

      let brush = d3.brush().on("brush", brushing).on("end", brushend)
      svg.append("g")
          .attr("class", "brush")
          .call(brush);

      function brushing () {
        if (d3.event.selection != null) {
         var brush_coords = d3.brushSelection(this);
         var s = d3.event.selection;
         // style brushed circles
         circles.filter(function (d, i){
              var cx = d3.select(this).attr("cx"),
                  cy = d3.select(this).attr("cy");

              var x0 = brush_coords[0][0],
                  x1 = brush_coords[1][0],
                  y0 = brush_coords[0][1],
                  y1 = brush_coords[1][1];

              return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
          }).attr("fill", "pink").attr("class","brushed")
         }
      }

      function brushend() {
        if (!d3.event.selection) return; // 仅仅只是 click 画布而已
        d3.select(this).call(brush.move, null);
        let s = d3.event.selection;

        let idArr = d3.selectAll(".brushed").data()
        // d3.selectAll(".brushed").classed("brushed",false) // 移除类名
        if (idArr.length !== 0) {

        }
      }

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
