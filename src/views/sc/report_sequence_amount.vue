<template>
  <div class="">
    <h2>不同单细胞测序量</h2>
    <p>RNA-seq测序数据产出可以作为衡量单细胞建库质量的一个指标：如果测序数据量太少，说明该细胞RNA分子库浓度不足；如果测序数据量太大，说明该细胞RNA分子库可能具有较高的重复率。所以，在进行单细胞转录组分析之前，要检测各细胞的测序量，根据实际情况去掉测序量偏性较大的细胞。</p>
    <p>如下图所示，横坐标通过barcode表示不同的细胞，纵坐标表示不同细胞的测序量。</p>
    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['bar_chart', 'barContainer'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="barContainer"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data() {
    return {
    }
  },
  components: {
  },
  mounted() {
    this.initBoxPlot()
  },
  methods: {
    initBoxPlot () {
      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 50, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      var y = d3.scaleLinear()
                .range([height, 0]);

      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#barContainer").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // get the data
      d3.csv("/static/data.csv", function(error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function(d) {
          d.sales = +d.sales;
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.salesperson; }));
        y.domain([0, d3.max(data, function(d) { return d.sales; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.salesperson); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.sales); })
            .attr("fill","steelblue")
            .attr("height", function(d) { return height - y(d.sales); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("transform", "rotate(45 -10 10)");

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

      });

    },
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
</style>
