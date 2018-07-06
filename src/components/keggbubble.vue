<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item>KEGG 气泡图</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>KEGG 气泡图 </h2>

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
      xData: [],
      yData: [],
      tableValue: [],
    }
  },
  components: {
    leftMenu
  },
  mounted () {
    this.axios.get('/server/enrich_bubble_diagram?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&fileType=KEGG').then((res) => {
      this.xData = res.data.x
      this.yData = res.data.y
      this.tableValue = res.data.coordinateList
      this.initD3()
    })
  },
  methods: {
    initD3 () {
          let self = this
          var initWidth = 800
          var initHeight = 800

          var padding = {
            left: 300,
            top: 20,
            right: 20,
            bottom: 20
          }

          var height = initWidth - padding.top - padding.bottom
          var width = initHeight - padding.left - padding.right


          var svg = d3.select(".container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("padding-left", padding.left)
            .style("padding-right", padding.right)
            .style("padding-top", padding.top)
            .style("padding-bottom", padding.bottom)

          //添加y轴坐标轴

          //y轴比例尺
          let ydata = self.yData
          let yScale = d3.scaleBand().rangeRound([height, 0]).padding(1)
            .domain(ydata.map(function(d) {
              return d;
            }))

          //定义y轴
          let yAxis = d3.axisLeft(yScale)

          //添加y轴
          svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .call(yAxis);

          //添加x轴坐标轴

          //x轴比例尺
          let xData = self.xData

          let xScale = d3.scaleBand().rangeRound([0, width]).padding(1)
            .domain(xData.map(function(d) {
              return d;
            }))

          //定义x轴
          let xAxis = d3.axisBottom(xScale)

          //添加x轴
          svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + "0 ," + height + ")")
            .call(xAxis);

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

        var colorLinear = d3.scaleLinear()
            .domain([d3.min(self.tableValue , function (d) {
            				  return Number(d.p_value); } ),
                    d3.max(self.tableValue , function (d) {
                    	 return Number(d.p_value); })])
            .range(["red", "blue"]);

        var radiusLinear = d3.scaleLinear()
            .domain([d3.min(self.tableValue , function (d) {
            				  return d.gene_ratio; } ),
                    d3.max(self.tableValue , function (d) {
                    	 return d.gene_ratio; })])
            .range([10, 20]);

          //添加circle包裹层，有几种类型添加几个
          var cover = svg.append("g")

          //添加circle
          cover.selectAll("circle")
            .data(self.tableValue)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
              return xScale(d.x)
            })
            .attr("cy", function(d) {
              return yScale(d.y)
            })
            .attr("r", function(d) {
              return radiusLinear(d.gene_ratio)
            })
            .attr("fill", function(d) {
              return colorLinear(Number(d.p_value))
            })
            .on("mouseover", function(d) {
              let self = this;
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") * 1.6)
              showtext.attr("x", function() {
                  return xScale(d.x)
                })
                .attr("y", function() {
                  return yScale(d.y) - d3.select(self).attr("r") * 1.6 - 5
                })
                .text(function() {
                  return d.id
                })
                .attr("text-anchor", "middle")
                .attr("fill", "#666")
            })
            .on("mouseout", function() {
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r", d3.select(this).attr("r") / 1.6)
              showtext.text("")
            })
          //添加左侧提示部分包裹层
          let detail = cover.append("g")
          let showtext = svg.append("text")
            .text("")
            .attr("font-size", '14px')
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
</style>
<style media="screen">
.grid .tick line {
  stroke: #ccc;
}
</style>
