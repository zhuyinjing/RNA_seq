<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside width="350px;" style="width:300px;height:100%;border-right:1px solid #ccc">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>

      <degComp></degComp>

      <div class="">
        <!-- <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>基因热图</el-breadcrumb-item>
        </el-breadcrumb> -->

        <div class="container">
          <!-- <h2>基因差异表达热图 {{$store.state._case}} vs {{$store.state._control}} </h2> -->

          <p>差异表达基因热图，可以通过颜色深浅来直观显示不同实验条件下基因表达的差异，并且可以较直观的显示出不同实验条件下调基因调控模式（表达谱）的差异。默认的配色方案为绿色代表较低的表达水平，红色代表较高的表达水平，黑色代表中间表达水平。用户可以点击左上角的色条更改配色方案。HeatMap 左侧的树状结构表示基因聚类的结果，表达趋势越接近的基因，在树状结构图中的位置也更接近。HeatMap 上方的树状结构图表示样本聚类的结果，基因表达模式更接近的样本，在数据结构图中的位置更接近。HeatMap 的输入数据为样本间差异表达基因列表中前 100 个基因的 TPM 值，基因距离和样本距离的计算采用欧式距离，基因和样本间的 linkage 计算方法为 ward，使用工具为 Inchlib，参考文献:</p>
          <p>Škuta, C., Bartůněk, P., Svozil, D. InCHlib – interactive cluster heatmap for web applications. Journal of Cheminformatics 2014, 6 (44), DOI: 10.1186/s13321-014-0044-4 [<a href="http://www.jcheminf.com/content/6/1/44" target="_blank">全文链接</a>]]</p>

          <!-- <el-row>
            <el-col :span="16">
              <div id="microarrays_dendrogram" class=""></div>
            </el-col>
            <el-col :span="8">
              <div id="microarrays" class="margin-top-200">
                  <div id="boxplot"></div>
              </div>
            </el-col>
          </el-row> -->

          <div class="" style="display:flex">
            <div class="" style="float:left;width:900px;">
              <div id="microarrays_dendrogram" class=""></div>
            </div>
            <div class="" style="float:left;width:800px;" class="margin-top-200">
              <div id="boxplot"></div>
            </div>
          </div>
          <div style="clear:both"></div>

          <!-- <div class="">
            <el-button class="" type="danger" @click="draw()">绘图</el-button>
            <el-button class="" type="info" @click="optionsVisible = true">选项</el-button>
          </div> -->
          <br>

          <!-- <degTable></degTable> -->

         <el-dialog
           title="选项"
           :visible.sync="optionsVisible"
           center>
           <div class="" style="">
             <div class="">
               <div class="labelStyle">
                 <label for="maxpval" class="label-font">基因距离计算方法</label>
               </div>
               <el-input
                 style="display:inline-block;width:50%;"
                 type="textarea"
                 :rows="5"
                 placeholder="请输入基因，多个基因可以用逗号、空格或者换行符分隔"
                 v-model="textareaGeneList">
               </el-input>
             </div>
             <div class="">
               <div class="labelStyle">
                 <label for="maxpval" class="label-font">基因距离计算方法</label>
               </div>
               <el-select class="input-style" v-model="row_distance" placeholder="请选择">
                 <el-option value="euclidean">euclidean</el-option>
                 <el-option value="dice">dice</el-option>
                 <el-option value="hamming">hamming</el-option>
                 <el-option value="jaccard">jaccard</el-option>
                 <el-option value="kulsinski">kulsinski</el-option>
                 <el-option value="matching">matching</el-option>
                 <el-option value="rogerstanimoto">rogerstanimoto</el-option>
                 <el-option value="russellrao">russellrao</el-option>
                 <el-option value="sokalmichener">sokalmichener</el-option>
                 <el-option value="sokalsneath">sokalsneath</el-option>
                 <el-option value="yule">yule</el-option>
                 <el-option value="braycurtis">braycurtis</el-option>
                 <el-option value="canberra">canberra</el-option>
                 <el-option value="chebyshev">chebyshev</el-option>
                 <el-option value="cityblock">cityblock</el-option>
                 <el-option value="correlation">correlation</el-option>
                 <el-option value="cosine">cosine</el-option>
                 <el-option value="mahalanobis">mahalanobis</el-option>
                 <el-option value="minkowski">minkowski</el-option>
                 <el-option value="seuclidean">seuclidean</el-option>
                 <el-option value="sqeuclidean">sqeuclidean</el-option>
               </el-select>
             </div>
             <div class="">
               <div class="labelStyle">
                 <label for="maxfdr" class="label-font">基因linkage计算方法</label>
               </div>
               <el-select class="input-style" v-model="row_linkage" placeholder="请选择">
                 <el-option value="ward">ward</el-option>
                 <el-option value="single">single</el-option>
                 <el-option value="complete">complete</el-option>
                 <el-option value="average">average</el-option>
                 <el-option value="weighted">weighted</el-option>
                 <el-option value="centroid">centroid</el-option>
                 <el-option value="median">median</el-option>
             </el-select>
             </div>
             <div class="">
               <div class="labelStyle">
                 <label for="minfc" class="label-font">样本距离计算方法</label>
               </div>
               <el-select class="input-style" v-model="column_distance" placeholder="请选择">
                 <el-option value="euclidean">euclidean</el-option>
                 <el-option value="dice">dice</el-option>
                 <el-option value="hamming">hamming</el-option>
                 <el-option value="jaccard">jaccard</el-option>
                 <el-option value="kulsinski">kulsinski</el-option>
                 <el-option value="matching">matching</el-option>
                 <el-option value="rogerstanimoto">rogerstanimoto</el-option>
                 <el-option value="russellrao">russellrao</el-option>
                 <el-option value="sokalmichener">sokalmichener</el-option>
                 <el-option value="sokalsneath">sokalsneath</el-option>
                 <el-option value="yule">yule</el-option>
                 <el-option value="braycurtis">braycurtis</el-option>
                 <el-option value="canberra">canberra</el-option>
                 <el-option value="chebyshev">chebyshev</el-option>
                 <el-option value="cityblock">cityblock</el-option>
                 <el-option value="correlation">correlation</el-option>
                 <el-option value="cosine">cosine</el-option>
                 <el-option value="mahalanobis">mahalanobis</el-option>
                 <el-option value="minkowski">minkowski</el-option>
                 <el-option value="seuclidean">seuclidean</el-option>
                 <el-option value="sqeuclidean">sqeuclidean</el-option>
               </el-select>
             </div>
             <div class="">
               <div class="labelStyle">
                 <label class="radio-inline control-label">样本linkage计算方法</label>
               </div>
               <el-select class="input-style" v-model="column_linkage" placeholder="请选择">
                 <el-option value="ward">ward</el-option>
                 <el-option value="single">single</el-option>
                 <el-option value="complete">complete</el-option>
                 <el-option value="average">average</el-option>
                 <el-option value="weighted">weighted</el-option>
                 <el-option value="centroid">centroid</el-option>
                 <el-option value="median">median</el-option>
               </el-select>
             </div>
           </div>
           <span slot="footer" class="dialog-footer">
             <el-button @click="optionsVisible = false">取 消</el-button>
             <el-button type="primary" @click="optionsVisible = false">确 定</el-button>
           </span>
         </el-dialog>

        </div>

      </div>
    </el-main>
  </el-container>

</template>

<script>
import leftMenu from './leftMenu.vue'
import degTable from './degTableComponent.vue'
import degComp from './degComp.vue'
import * as d3 from 'd3'

import Highcharts from 'highcharts/highstock';
export default {
  data () {
    return {
      arr: [],
      value: [],
      sortValue: [],
      idShow: false,
      visible: 'hidden',
      height: 5,
      optionProject: ['RNASeq'],
      project: 'RNASeq',
      row_distance: 'euclidean',
      row_linkage: 'ward',
      column_distance: 'euclidean',
      column_linkage: 'ward',
      data: [],
      checked:[],
      optionsVisible:false,
      textareaGeneList: null,
    }
  },
  components: {
    leftMenu,
    degTable,
    degComp
  },
  watch: {
    '$route': 'routerChange'
  },
  created () {
    this.$store.state.heatmapJson.heatmap_json_string = JSON.parse(this.$store.state.heatmapJson.heatmap_json_string)
  },
  mounted () {
    this.initchart()
  },
  methods: {
    routerChange () {
      this.$store.state.heatmapJson.heatmap_json_string = JSON.parse(this.$store.state.heatmapJson.heatmap_json_string)
      this.initchart()
    },
    draw () {
      console.log(this.$store.state.checked);
    },
    initchart () {
      let stages = this.$store.state.heatmapJson.stages
      let genes = this.$store.state.heatmapJson.genes
      let json = this.$store.state.heatmapJson.heatmap_json_string
      window.boxplot = new Highcharts.Chart({
                  chart: {
                      renderTo: "boxplot",
                      type: 'boxplot',
                      height: 400,
                      width: stages.length > 10 ? stages.length * 30 : 400,
                  },
                  credits: {
                    enabled: false //不显示LOGO
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
                      max_height: 5, //set maximum height of visualization in pixels
                      heatmap_colors: "GrBkRd", //set color scale for clustered data
                      metadata_colors: "RdLrBu", //set color scale for metadata
                      column_dendrogram: true,
                      max_percentile: 90,
                      // middle_percentile: 50,
                      min_percentile: 10,
                      independent_columns: false,
                      heatmap_part_width: 0.7,  // 每一个小格的宽度
                      width: 900,
                      // min_row_width: json.column_metadata.features[0].length * 5,
              });
              var current = null;
              var current_objects = [];// dendrogram.data.nodes[0].objects;
              var current_columns = [];
              dendrogram.add_color_scale("GrBkRd",
                				{"start": {"r":35, "g": 139, "b": 69},
                				"middle": {"r": 0, "g": 0, "b": 0},
                				"end": {"r": 215, "g": 25, "b": 28}
                				})

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

  }
}
</script>

<style scoped="true">
.content {
  float:left;
  /* width: 60%; */
  width: calc(100% - 350px);
  padding: 0 20px;
  margin: 19px auto;
}
.margin-top-200 {
  margin-top: 200px;
}
.labelStyle {
  display:inline-block;
  width:200px;
  text-align:end;
}
.filterbtn {
  margin-left:240px;
  margin-top:-100px;
}
.label-font {
  font-size: 14px;
}
.input-style{
  margin-right: 20px;
  margin-top: 10px;
}
</style>
<style media="screen">
.color_scales {
  z-index: 9 !important;
}
</style>
