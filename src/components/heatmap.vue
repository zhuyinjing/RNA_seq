<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backHeatmapInput"></i>
    </el-tooltip>

    <div class="icon-func-div">
      <span class="font-size-12">ID显示</span>
      <el-switch
        v-model="idShow"
        active-text=""
        inactive-text=""
        @change="idShowChange"
        >
      </el-switch>
    </div>

    <div id="chart"></div>

    <div class="container">
      <el-row>
        <el-col :span="16">
          <div id="microarrays_dendrogram" class=""></div>
        </el-col>
        <el-col :span="8">
          <div id="microarrays" class="margin-top-200">
              <div id="boxplot"></div>
          </div>
        </el-col>
      </el-row>
    </div>
</div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import Highcharts from 'highcharts/highstock';
export default {
  data () {
    return {
      arr: [],
      temp: [],
      value: [],
      sortValue: [],
      idShow: false,
      visible: 'hidden',
      height: 5,
    }
  },
  components: {
  },
  mounted () {
    this.$store.state.heatmapJson.heatmap_json_string = JSON.parse(this.$store.state.heatmapJson.heatmap_json_string)

    let self = this
    for (let k in this.$store.state.heatmapJson.heatmap_json_string.data.nodes) {
      let node = this.$store.state.heatmapJson.heatmap_json_string.data.nodes[k]
      if (('parent' in node) === false) {
        preOrder(node)
      }
    }
    function preOrder(node){
       if(node.distance === 0){
         self.temp.push(node.objects[0]);  // y 轴的gene名称
         for(let i = 0;i < node.features.length;i++) {
           self.value.push(node.features[i])   // 每一行的值
           self.sortValue.push(node.features[i])  // 用来排序的数组
         }
       } else {
         preOrder(self.$store.state.heatmapJson.heatmap_json_string.data.nodes[node['left_child']]);
         preOrder(self.$store.state.heatmapJson.heatmap_json_string.data.nodes[node['right_child']]);
       }
     }

    setTimeout(() => {
      this.initchart()
      this.d3heatmap()
    }, 500)
  },
  methods: {
    idShowChange () {
      if (this.idShow === true) {
        this.height = 9
        this.visible = 'visible'
      } else {
        this.height = 5
        this.visible = 'hidden'
      }
      this.d3heatmap()
    },
    d3heatmap () {
      let hassvg = d3.selectAll('.d3svg')
      if (hassvg) {
        d3.selectAll('.d3svg').remove()
      }
      let self = this
      let yData = self.temp
      let xData = this.$store.state.heatmapJson.heatmap_json_string.data.feature_names

      var array_data = [];
      var margin = { top: 50, right: 0, bottom: 100, left: 100 },
          width = 800 - margin.left - margin.right,        // 所有格子区域的宽度，即Heatmap的宽度
          height = self.height * yData.length ,
          gridSize = Math.floor(width / xData.length)     // 求地板，即去掉小数部分，width分成24份

              function sortNumber (a, b) {
                return a - b
              }
              self.sortValue.sort(sortNumber)   //  排序后的数组
              let min = self.sortValue[Math.ceil(0.1 * self.sortValue.length)]
              let middle = self.sortValue[Math.ceil(self.sortValue.length/2)]
              let max = self.sortValue[self.sortValue.length - Math.ceil(0.1 * self.sortValue.length) - 1]

              var linear = d3.scaleLinear()
              				.domain([min, middle, max])
              				.range([(d3.rgb(255,0,0)).darker(0.7), (d3.rgb(19,3,3)).darker(1), (d3.rgb(0,255,0)).darker(1)]);

              // 设置chart，svg
              var svg = d3.select("#chart").append("svg") // 选择“chart”（就是div），加入一个svg，设置属性跟div一样大
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .attr("class", "d3svg")
                  .append("g")    // 在svg内加入一个g（group组），并设置元素g的显示位置
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

              var timeLabels = svg.selectAll(".testLabel")
                  .data(xData)
                  .enter().append("text")
                  .text(function(d) { return d; })
                  .attr("x", function(d, i) { return i * gridSize; })
                  .attr("y", 0)
                  .attr("class", 'xText')
                  .style("text-anchor", "middle")
                  .style("font-size", "9px")
                  .style("font-family", "Consolas, Monaco, monospace")
                  .attr("transform", "translate(" + gridSize / 2 + ", -6)")

             var dayLabels = svg.selectAll(".nameLabel")
                 .data(yData)
                 .enter()    // 为data中每一项创建一个".dayLabel"
                 .append("text")    // 为days中每一项创建一的".dayLabel"添加文本，下面全是设置文本的属性
                 .text(function (d) { return d; })
                 .attr("x", 0)
                 .attr("y", function (d, i) { return i * 9; })
                 .style("text-anchor", "end")
                 .style("font-size", "9px")
                 .style("font-family", "Consolas, Monaco, monospace")
                 .attr("transform", "translate(-6," + "9)")
                 .attr('class', 'ySum')
                 .style('visibility', self.visible)

              var heatMap = svg.selectAll(".score")
                  .data(self.value)
                  .enter()
                  .append("rect")
                  .attr("x", function(d, i){ return (i % 12)*gridSize;})
                  .attr("y", function(d, i){ return parseInt(i / 12) * self.height;})
                  .attr("width", gridSize)
                  .attr("height", self.height)
                  .style("fill", "#FFFFFF");
              // duration(1000) 在1000ns也就是1s内将格子图上色
              heatMap.transition().duration(1000)
                  .style("fill", function(d) { return linear(d) });
              // 鼠标停留显示value
              heatMap.append("title").text(function(d) { return d; });
    },
    initchart () {
      let stages = this.$store.state.heatmapJson.stages
      let genes = this.$store.state.heatmapJson.genes
      let json = this.$store.state.heatmapJson.heatmap_json_string
      window.boxplot = new Highcharts.Chart({
                  chart: {
                      renderTo: "boxplot",
                      type: 'boxplot',
                      height: 400
                  },

                  title: {
                      text: "当前基因表达量"
                  },

                  legend: {
                      enabled: false
                  },

                  exporting:{
                      enabled: false
                  },

                  xAxis: {
                      categories: stages,
                      title: {
                          text: 'Sample Types'
                      }
                  },

                  yAxis: {
                      title: {
                          text: 'Read Counts'
                      }
                  },

                  plotOptions: {
                      boxplot: {
                          color: "#000000",
                              fillColor: '#F0F0E0',
                              lineWidth: 2,
                              medianColor: '#0C5DA5',
                              medianWidth: 3,
                              stemColor: '#A63400',
                              stemDashStyle: 'dot',
                              stemWidth: 1,
                              whiskerColor: '#3D9200',
                              whiskerLength: '20%',
                              whiskerWidth: 3
                      }
                  },

                  series: [{
                      name: 'Read Counts',
                      data: [
                      ]
                  }
                  ]
              });

              var target_element = $("#microarrays_dendrogram");
              var offset = target_element.offset();
              var min_y = offset.top + 100;
              var x_pos = offset.left;
              var microarrays_element = $("#microarrays");
              //microarrays_element.css({"left": x_pos + target_element.width()-50, "top": min_y, "z-index": 100});

              window.dendrogram = new InCHlib({ //instantiate InCHlib
                      target: "microarrays_dendrogram", //ID of a target HTML element
                      metadata: true, //turn on the metadata
                      column_metadata: true, //turn on the column metadata
                      min_row_height:5,
                      max_column_width:50,
                      max_height: genes.length * 5, //set maximum height of visualization in pixels
                      heatmap_colors: "RdBkGr", //set color scale for clustered data
                      metadata_colors: "RdLrBu", //set color scale for metadata
                      column_dendrogram: true,
                      max_percentile: 90,
                      // middle_percentile: 50,
                      min_percentile: 10,
                      independent_columns: false
              });

              var current = null;
              var current_objects = [];// dendrogram.data.nodes[0].objects;
              var current_columns = [];

              dendrogram.events.row_onclick = function(object_ids, evt){
                  current = object_ids[0];
                  current_objects = object_ids;
                  draw_boxplot(current_objects, current_columns, evt.pageY);
                  dendrogram.highlight_rows(current_objects);
                  dendrogram.unhighlight_cluster();
              };

              dendrogram.events.dendrogram_node_onclick = function(object_ids, node_id, evt){
                  current_objects = object_ids;
                  draw_boxplot(current_objects, current_columns, evt.pageY);
                  var i;
                  for(i = 0; i<object_ids.length; i++){
                      if(object_ids[i] == current){
                          return;
                      }
                  }
                  dendrogram.highlight_rows([]);
              };

              dendrogram.events.column_dendrogram_node_highlight = function(column_ids, node_id){
                  draw_boxplot(current_objects, column_ids, 0);
              };

              dendrogram.events.column_dendrogram_node_unhighlight = function(){
                  current_columns = [];
                  draw_boxplot(current_objects, current_columns, 0);
              };

              dendrogram.events.on_zoom = function(node_id){
                  microarrays_element.css({"top": min_y});
              };

              dendrogram.events.empty_space_onclick = function(){
                  dendrogram.highlight_rows([]);
                  //microarrays_element.hide();
              };

              dendrogram.read_data(json); //read input json file
              dendrogram.draw(); //draw cluster heatmap
              draw_boxplot(current_objects, current_columns, min_y);
              dendrogram.highlight_rows(current_objects);

              function draw_boxplot(object_ids, column_ids, y){
                  current_columns = column_ids;
                  var header = dendrogram.header;
                  if(current_columns.length === 0){
                      for(j = 0; j<header.length; j++){
                          current_columns.push(j);
                      }
                  }

                  microarrays_element.hide();
                  var class2values = {};
                  for (var m = 0; m < stages.length; ++ m) {
                      class2values[stages[m]] = [];
                  }

                  var max_y = min_y + target_element.height() - dendrogram.footer_height;
                  var i, j, values, row_id, key;
                  //var header = dendrogram.header;
                  var column_metadata = dendrogram.column_metadata.features[0];
                  var boxplot_height = 400;

                  y = (y + boxplot_height > max_y)?max_y - boxplot_height:y-100;
                  y = (y < min_y)?min_y: y;

                  microarrays_element.css({"top": y});

                  for (i = 0; i < object_ids.length; i++) {
                      row_id = dendrogram.objects2leaves[object_ids[i]];
                      values = dendrogram.data.nodes[row_id].features;
                      boxplot.setTitle({text: dendrogram.data.nodes[row_id].objects[0]});
                      for (j = 0; j < current_columns.length; j++) {
                          key = current_columns[j];
                          class2values[column_metadata[key]].push(values[key]);
                      }
                  }

                  if (object_ids.length > 1) {
                      boxplot.setTitle({text: "多个基因"});
                  }

                  while(boxplot.series.length > 0){
                      boxplot.series[0].remove(true);
                  }

                  var seriesData = [];
                  for(var idx = 0; idx < stages.length; ++ idx) {
                      if(class2values[stages[idx]] && class2values[stages[idx]].length) {
                          seriesData.push(get_boxplot_parameters(class2values[stages[idx]]));
                      } else {
                          seriesData.push([0,0,0,0,0]);
                      }
                  }
                  boxplot.addSeries({data:seriesData, name: "Average Signal"}, true);
                  microarrays_element.show();
              }

              function get_boxplot_parameters(array){
                  var min, max, median, lower_q, upper_q;
                  array.sort(function(a,b){return a - b;});
                  var array_length = array.length;
                  min = array[0];
                  max = array[array_length-1];
                  var median_index = dendrogram._hack_round(array_length/2);
                  var quarter = dendrogram._hack_round(array_length/4);
                  median = array[median_index];
                  lower_q = array[median_index-quarter];
                  upper_q = array[median_index+quarter];
                  if (array.length < 4) {
                      upper_q = max;
                  }
                  var parameters = [min, lower_q, median, upper_q, max];
                  return parameters;
              }
    },
    backHeatmapInput () {
      this.$router.push({'name': 'heatmap_input'})
    }

  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
.icon-func-div {
  margin-top: 10px;
}
.font-size-12 {
  font-size: 12px;
}
.margin-top-200 {
  margin-top: 200px;
}
</style>
