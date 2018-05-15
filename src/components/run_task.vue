<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backProjectList"></i>
    </el-tooltip>
    <p>项目：{{this.$store.state.projectName}}</p>
    <div id="container"></div>
    <div class="">
      <el-button v-if="runBtnShow" type="primary" @click="startTask()">运行分析任务</el-button>
      <transition name="fade">
        <el-button v-if="refreshBtnShow" type="danger" @click="runTask()">刷新任务状态</el-button>
      </transition>
      <el-button v-show="reportBtnShow" type="success" @click="report()">生成报告</el-button>
      <el-button v-show="resultBtnShow" type="success" @click="result()">结果导入ABrowse</el-button>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      runBtnShow: true,
      refreshBtnShow: false,
      reportBtnShow: false,
      resultBtnShow: false,
    }
  },
  components: {
  },
  mounted () {
    this.runTask(-1)
  },
  methods: {
    runTask (step) {
      let hassvg = d3.selectAll('svg')
      if (hassvg) {
        d3.selectAll('svg').remove()
      }
      var FINISHED = 300;

      var processMessage = {};
      processMessage.currentStepSn = step
      var pipeline = [
              "FastQC", "Mapping", "Assembling", "Quantification", "DEG"
          ];

      var arrows = [1, 1, 1, 1];

      var padding = {
          top: 30,
          right: 10,
          bottom: 30,
          left: 0
      };

      var rectStep = 30;
      var rectWidth = 200;
      var rectHeight = 30;

      // var svg = d3.select("svg");

      let svg = d3.select('#container')
        .append('svg')


      var svgHeight = padding.top + rectHeight + padding.bottom;
      var svgWidth = padding.left + rectWidth * pipeline.length + rectStep * (pipeline.length - 1) + padding.right;
      svg.attr("height", svgHeight).attr("width", svgWidth);

      var defs = svg.append("defs");

      var arrowMarker = defs.append("marker")
          .attr("id", "arrow")
          .attr("markerUnits", "strokeWidth")
          .attr("markerWidth", "12")
          .attr("markerHeight", "12")
          .attr("viewBox", "0 0 12 12")
          .attr("refX", "6")
          .attr("refY", "6")
          .attr("orient", "auto");

      var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

      arrowMarker.append("path")
          .attr("d", arrow_path)
          .attr("fill", "gray");

          var rect = svg.selectAll("rect")
          .data(pipeline)
          .enter()
          .append("rect")
          .attr("fill", function (d, i) { // i 01234
              if (i < processMessage.currentStepSn) {
                  return "green";
              } else if (i == processMessage.currentStepSn) {
                  return "orange";
              } else {
                  return "white";
              }
          })
          .attr("stroke", function (d, i) {
              if (i < processMessage.currentStepSn) {
                  return "green";
              } else if (i == processMessage.currentStepSn) {
                  return "orange";
              } else {
                  return "gray";
              }
          })
          .attr("x", function (d, i) {
              return padding.left + i * (rectStep + rectWidth);
          })
          .attr("y", function (d, i) {
              return padding.top;
          })
          .attr("width", rectWidth)
          .attr("height", rectHeight)
          .attr("class", function (d, i) {
              return d;
          });

      var text = svg.selectAll("text")
          .data(pipeline)
          .enter()
          .append("text")
          .attr("fill", "black")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .attr("x", function (d, i) {
              return padding.left + i * (rectStep + rectWidth);
          })
          .attr("y", function (d, i) {
              return padding.top;
          })
          .attr("dx", rectWidth / 2)
          .attr("dy", "1.5em")
          .text(function (d, i) {
              return d;
          });

      var sizeExpand = 3;

      var line = svg.selectAll("line")
          .data(arrows)
          .enter()
          .append("line")
          .attr("x1", function (d, i) {
              return padding.left + rectWidth * (i + 1) + rectStep * i + sizeExpand;
          })
          .attr("y1", padding.top + rectHeight / 2)
          .attr("x2", function (d, i) {
              return padding.left + rectWidth * (i + 1) + rectStep * i + rectStep - 12;
          })
          .attr("y2", padding.top + rectHeight / 2)
          .attr("stroke", "gray")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow)");

      if (processMessage.status !== FINISHED && processMessage.currentStepSn >= 0) {

          var prevOpacity = 1;
          var prevRectWidth = rectWidth;
          var prevRectHeight = rectHeight;
          var prevY = padding.top;

          var anchorX = svg.select("." + pipeline[processMessage.currentStepSn]).attr("x");
          var prevX = anchorX;

          var durationTime = 1000;

          function twinkle() {

              svg.selectAll("." + pipeline[processMessage.currentStepSn])
                  .transition()
                  .duration(durationTime)
                  .attr("width", function (d, i) {
                      prevRectWidth == rectWidth ? prevRectWidth = rectWidth + sizeExpand * 2 : prevRectWidth = rectWidth;
                      return prevRectWidth;
                  })
                  .attr("height", function (d, i) {
                      prevRectHeight == rectHeight ? prevRectHeight = rectHeight + sizeExpand * 2 : prevRectHeight = rectHeight;
                      return prevRectHeight;
                  })
                  .attr("y", function (d, i) {
                      prevY == padding.top ? prevY = padding.top - sizeExpand : prevY = padding.top;
                      return prevY;
                  })
                  .attr("x", function (d, i) {
                      prevX == anchorX ? prevX = anchorX - sizeExpand : prevX = anchorX;
                      return prevX;
                  })
                  .attr("opacity", function (d, i) {
                      prevOpacity == 1 ? prevOpacity = 0.5 : prevOpacity = 1;
                      return prevOpacity;
                  });

          };

          setInterval(twinkle, durationTime);
      }
    },
    startTask () {
      this.runBtnShow = false
      this.refreshBtnShow = true
      this.runTask(0)
    },
    report () {

    },
    result () {

    },
    backProjectList () {
      this.$emit('backProjectList')
    }
  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.right {
  float: right;
  width: 60px;
}
.item {
  margin: 4px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
