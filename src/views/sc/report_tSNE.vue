<template>
  <div id="container">
    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['tSNE', 'd3container'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="d3container"></div>

    <el-button size="small" type="warning" id="brushBtn">brush</el-button>
    <el-button size="small" type="warning" id="removeBrushBtn">remove brush</el-button>
    <el-button size="small" type="warning" id="cancelBrushBtn">取消选中</el-button>

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
    changeGroupName () {
      d3.selectAll("text.groupText")
      .filter(function(){
        return d3.select(this).text() == 0
      })
      .attr("fill", "red");
    },
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
      let padding = {top:30,right:180,bottom:60,left:60}
      let scattersvg = d3.select("#d3container").append("svg").attr("width", width).attr("height", height).attr("id", "scattersvg")
      let svg = scattersvg.append("g").attr("transform", "translate("+ padding.left + "," + padding.top +")")
      let colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      let xText = this.data.tsneNumList.tsneNum[0]
      let yText = this.data.tsneNumList.tsneNum[1]
      let sampleArr = Array.from(new Set(this.data.sampleId)).sort()

      let symbolScale = d3.scaleOrdinal().domain(sampleArr).range([d3.symbolCircle,d3.symbolCross,d3.symbolDiamond,d3.symbolSquare,d3.symbolStar,d3.symbolTriangle,d3.symbolWye]);

      let symbol = d3.symbol().size([50])

      let xScale = d3.scaleLinear().domain(d3.extent(this.data.tSNE_1)).range([0,width - padding.left - padding.right]).nice()
      svg.append("g").attr("transform","translate(0,"+ (height - padding.bottom - padding.top) +")").call(d3.axisBottom(xScale))

      let yScale = d3.scaleLinear().domain(d3.extent(this.data.tSNE_2)).range([height - padding.top - padding.bottom,0]).nice()
      svg.append("g").call(d3.axisLeft(yScale))

      let circles = svg.selectAll("path")
         .data(this.data.cellId)
         .enter()
         .append("path")
         .attr("d", symbol.type( (d,i) => symbolScale(self.data.sampleId[i]) ) )
         .attr("transform",(d,i) => "translate("+ xScale(self.data.tSNE_1[i]) +","+ yScale(self.data.tSNE_2[i]) +")")
         .attr("fill", (d,i) => {
           return colorScale(self.data.groupId[i])
         })

      //  上边 和 右边 两侧的 line
      svg.append("line").attr("x1", 0).attr("y1", 0).attr("x2",width-padding.right-padding.left).attr("y2",0).attr("stroke","black").attr("stroke-width","1px")
      svg.append("line").attr("x1", width-padding.right-padding.left).attr("y1", 0).attr("x2",width-padding.right-padding.left).attr("y2",height-padding.top-padding.bottom).attr("stroke","black").attr("stroke-width","1px")

      // x 轴文字
      scattersvg.append("text")
        .attr("transform", "translate("+ (width / 2) +", " + (height - 5) + ")")
        .text(xText)
        .attr("text-anchor", "middle")

      // y 轴文字
      scattersvg.append("text")
        .text(yText)
        .attr("transform", "translate("+ 15 +", " + (height / 2) + ") rotate(-90)")

      // 分组名称显示（在每组的中心位置）
      let groupArr = Object.keys(this.data.avgMap)
      svg.selectAll(".text")
                .data(groupArr)
                .enter()
                .append("text")
                .attr("transform",d => "translate("+ xScale(this.data.avgMap[d][xText]) +","+ yScale(this.data.avgMap[d][yText]) +")")
                .text(d => d)
                .attr("fill","black")
                .attr("text-anchor", "middle")
                .attr("class","groupText")

      //  分组图例
      let legendR = 8
      let legend = scattersvg.append("g").attr("transform","translate("+(width-padding.right + 30)+","+(height/4)+")")
      legend.selectAll(".circle")
            .data(groupArr)
            .enter()
            .append("circle")
            .attr("cx",0)
            .attr("cy",(d,i) => i * 30)
            .attr("r",legendR)
            .attr("fill", d => colorScale(d))

      legend.selectAll(".text")
            .data(groupArr)
            .enter()
            .append("text")
            .attr("transform",(d,i) => {
              return "translate(" + (legendR * 2) +","+ (legendR/2 + i * 30) +")"
            })
            .text(d => d)
            .attr("class","groupText")

        //  图形图例
        legend.selectAll(".path")
              .data(sampleArr)
              .enter()
              .append("path")
              .attr("d", d3.symbol().size([150]).type( d => symbolScale(d) ))
              .attr("transform",(d,i) => "translate("+ 0 +","+ (i + groupArr.length) * 30 +")")

        legend.selectAll(".text")
              .data(sampleArr)
              .enter()
              .append("text")
              .attr("transform",(d,i) => {
                return "translate(" + (legendR * 2) +","+ (legendR/2 + (i + groupArr.length) * 30) +")"
              })
              .text(d => d)
              .attr("class","groupText")





      let brush = d3.brush().extent([[0,0],[width - padding.left - padding.right,height - padding.top - padding.bottom]]).on("brush", brushing).on("end", brushend)

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
          }).attr("class","brushed")
         }
      }

      function brushend() {
        if (!d3.event.selection) return; // 仅仅只是 click 画布而已
        d3.select(this).call(brush.move, null);
        let s = d3.event.selection;

        let idArr = d3.selectAll(".brushed").data()
        if (idArr.length !== 0) {

        }
      }

      // 添加刷子
      d3.selectAll("#brushBtn").on("click",() => {
           svg.append("g")
              .attr("class", "brush")
              .call(brush);
        })
      // 移除刷子
      d3.selectAll("#removeBrushBtn").on("click",() => {
          svg.selectAll("g.brush").remove()
        })
      // 取消选中
      d3.selectAll("#cancelBrushBtn").on("click",() => {
        d3.selectAll(".brushed").classed("brushed",false) // 移除类名
      })

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
<style media="screen">
.brushed {
  fill: pink;
}
</style>
