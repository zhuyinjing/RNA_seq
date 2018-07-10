<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: 'report_deg' }">差异表达基因</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'heatmap_input' }">绘制基因热图</el-breadcrumb-item> -->
        <el-breadcrumb-item>PCA 主成分分析</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>PCA 主成分分析</h2>

      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedPCA" @change="handlecheckedPCAChange">
        <el-checkbox style="width:20%" v-for="pca in checkboxValue" :label="pca" :key="pca">PC{{pca}}</el-checkbox>
      </el-checkbox-group>

      <el-button type="primary" @click="initD3()">确定</el-button>

      <div class="container"></div>

    </div>

  </div>
</template>

<script>
import leftMenu from './leftMenu.vue'
import * as d3 from 'd3'

export default {
  data () {
    return {
      checkboxValue: [],
      checkAll: false,
      checkedPCA: [],
      isIndeterminate: false,
      tableValue: [],
      conditionArr: [],
      maxValue: [],
      minValue: [],
      nameSampleMap: {},
    }
  },
  components: {
    leftMenu
  },
  created () {
    this.getValue()
  },
  mounted () {
  },
  methods: {
    getValue () {
      this.axios.get('/server/pca4gene?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        this.maxValue = res.data.maxValue
        this.minValue = res.data.minValue
        this.nameSampleMap = res.data.experimentDesign.nameSampleMap
        // checkbox 选项
        for (let i = 0;i < res.data.pca4GeneExprMatrix.percentVariance.length;i++) {
          this.checkboxValue.push(i + 1)
        }
        // condition array ["A","B","Normal"]
        for (let k in res.data.experimentDesign.conditionNumMap) {
          this.conditionArr.push(k)
        }
        for (let k in res.data.pca4GeneExprMatrix.sampleCoordMap) {
          let obj = {name: k, value: res.data.pca4GeneExprMatrix.sampleCoordMap[k]}
          this.tableValue.push(obj)
        }
      })
    },
    handleCheckAllChange(val) {
      this.checkedPCA = val ? this.checkboxValue : [];
      this.isIndeterminate = false;
    },
    handlecheckedPCAChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkboxValue.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkboxValue.length;
    },
    initD3 () {
      let self = this
      var initWidth = 800
      var initHeight = 800

      var padding = {
        left: 40,
        top: 20,
        right: 100,
        bottom: 20
      }

      var width = initHeight - padding.left - padding.bottom
      var height = initWidth - padding.top - padding.bottom

      var svg = d3.select(".container")
        .append("svg")
        .attr("class", "test")
        .attr("width", width)
        .attr("height", height)
        .style("padding-left", padding.left)
        .style("padding-right", padding.right)
        .style("padding-top", padding.top)
        .style("padding-bottom", padding.bottom)
      // var svg = svgG.append('g').attr('transform','translate('+padding.left+','+padding.top+')')

      //y轴比例尺
      let yScale = d3.scaleLinear().range([height, 0])
        .domain([(d3.max([self.maxValue[0], self.maxValue[1]])) , (d3.min([self.minValue[0], self.minValue[1]])) ])
      //定义y轴
      let yAxis = d3.axisLeft(yScale).ticks(3)
      //添加y轴
      let yaxisg = svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .call(yAxis)
        .style("font-size", "14px")
      //x轴比例尺
      let xScale = d3.scaleLinear().range([0, width])
        .domain([(d3.min([self.minValue[0], self.minValue[1]])), (d3.max([self.maxValue[0], self.maxValue[1]])) ])
      //定义x轴
      let xAxis = d3.axisBottom(xScale).ticks(3)
      //添加x轴
      let xaxisg = svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(" + "0 ," + height + ")")
        .call(xAxis)
        .style("font-size", "14px")
      d3.selectAll('.domain').remove() // 删除多余的两端刻度线
      //添加网格-----------
      // gridlines in x axis function
      function make_x_gridlines() {
        return d3.axisBottom(xScale)
          .ticks(4)
      }

      // gridlines in y axis function
      function make_y_gridlines() {
        return d3.axisLeft(yScale)
          .ticks(4)
      }

      // add the X gridlines
      svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
        )

      // add the Y gridlines
      svg.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
        )
      // color 配色
      var colorRandom = d3.scaleOrdinal(d3.schemeCategory10)
      // console.log(colorRandom("A"));
      //添加circle包裹层，有几种类型添加几个
      var cover = svg.append("g")

      //添加circle
      cover.selectAll("circle")
        .data(self.tableValue)
        .enter()
        .append("circle")
        .attr("cx", function(d,i) {
          return xScale(d['value'][0])
        })
        .attr("cy", function(d,i) {
          return yScale(d['value'][1])
        })
        .attr("r", function(d) {
          return 10
        })
        .attr("fill", function(d) {
          return colorRandom(self.nameSampleMap[d['name']]['condition'])
        })

        //  右侧颜色图例
        svg.append("text")
    					.attr("x", width + 10)
    					.attr("y", 120)
    					.attr("dy", "-0.3em")
    					.text(function(){
    						return "group";
    					});
      for (let i = 0;i < self.conditionArr.length;i++) {
        svg.append("rect")
                .attr("x", width + 10) // rect 横坐标无需改动
                .attr("y", 130 + 30 * i)
                .attr("width", 30)
                .attr("height", 30)
                .attr("fill", "white")
                .attr("stroke", "#999")
        svg.append("circle")
              .attr("cx", width + 10 + 15) // 圆心x坐标无需改动
              .attr("cy", (130 + 30 * i) + 15)
              .attr("r", 10)
              .attr("fill", colorRandom(self.conditionArr[i]))
        svg.append("text")
              .attr("x", width + 10 + 40) // text x坐标无需改动
              .attr("y", 155 + 30 * i)
              .attr("dy", "-0.3em")
              .text(self.conditionArr[i]);
      }
    },


  }
}
</script>

<style scoped="true">
.content {
  float:left;
  width: 60%;
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
.el-checkbox+.el-checkbox {
  margin-left: 0 !important;
}
</style>
<style media="screen">
.grid .tick line {
  stroke: #ccc;
}
</style>
