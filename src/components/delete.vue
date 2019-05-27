<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>
      <imgMenuShowComp></imgMenuShowComp>

      <degComp></degComp>

      <!-- <el-button type="primary" size="small" icon="el-icon-document" @click="$store.commit('d3savePDF', '基因热图')">生成 PDF</el-button> -->
      <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['基因热图'])">{{$t('button.svg')}}</el-button>
      <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

      <div class="">
        <div class="icon-func-div">
          <span class="font-size-12">{{$t('d3.gene_id_show')}}</span>
          <el-switch
            v-model="idShow"
            active-text=""
            inactive-text=""
            @change="idShowChange"
            >
          </el-switch>
        </div>

        <div id="d3container"></div>

        <div id="d3container" style="display:flex">
          <div class="" style="float:left;width:900px;">
            <svg width="960" height="500" id="test"></svg>
          </div>

          <div class="" style="float:left;width:800px;" class="margin-top-200">
            <div id="boxplot">12</div>
          </div>
        </div>

        </div>
    </el-main>
  </el-container>
</template>

<script>
import * as d3 from 'd3'
import leftMenu from './leftMenu.vue'
import degComp from './degComp.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'
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
    leftMenu,
    degComp,
    imgMenuShowComp
  },
  created () {
    this.$store.state.heatmapJson.heatmap_json_string = JSON.parse(this.$store.state.heatmapJson.heatmap_json_string)
    console.log(this.$store.state.heatmapJson.heatmap_json_string);

    let test = this.$store.state.heatmapJson.heatmap_json_string.column_dendrogram.nodes
    let col = this.$store.state.heatmapJson.heatmap_json_string

    let self = this

    // let obj = {
    //   0: {
    //     distance: 0,
    //     parent: 2
    //   },
    //   1: {
    //     distance: 0,
    //     parent: 2
    //   },
    //   2: {
    //     distance: 5,
    //     parent: 3,
    //     leftChild: 0,
    //     rightChild: 1
    //   },
    //   3: {
    //     distance: 6,
    //     leftChild: 2,
    //     rightChild: 4
    //   },
    //   4: {
    //     distance: 0,
    //     parent: 3
    //   }
    // }

    function convert (data, parentId) {
      let convertData = []
      for (let k in data) {
        if (data[k].parent == parentId) {
          convertData.push(data[k])
          converChild(data, data[k], k)
        }
      }
      return convertData
    }

    function converChild (arr, parentItem, parentId) {
      parentItem.children = parentItem.children ? parentItem.children : []
      for (let o in arr) {
        if (arr[o].parent == parentId) {
          parentItem.children.push(arr[o])
          converChild(arr, arr[o], o)
        }
      }
      return parentItem.children
    }

    console.time(1)
    let result = convert(test, 22)
    self.test = test[22]
    self.test.children = result
    console.timeEnd(1);

    return

    // let self = this
    // for (let k in this.$store.state.heatmapJson.heatmap_json_string.data.nodes) {
    //   let node = this.$store.state.heatmapJson.heatmap_json_string.data.nodes[k]
    //   if (('parent' in node) === false) {
    //     preOrder(node)
    //   }
    // }
    // function preOrder(node){
    //    if(node.distance === 0){
    //      self.temp.push(node.objects[0]);  // y 轴的gene名称
    //      for(let i = 0;i < node.features.length;i++) {
    //        self.value.push(node.features[i])   // 每一行的值
    //        self.sortValue.push(node.features[i])  // 用来排序的数组
    //      }
    //    } else {
    //      preOrder(self.$store.state.heatmapJson.heatmap_json_string.data.nodes[node['left_child']]);
    //      preOrder(self.$store.state.heatmapJson.heatmap_json_string.data.nodes[node['right_child']]);
    //    }
    //  }
  },
  mounted () {
    this.initBoxPlot()
    this.initSvg()
    // this.d3heatmap()
  },
  watch: {
    '$route': 'routerChange'
  },
  methods: {
    initSvg () {
      var width = 900,
        height = 500,
        wrapperWidth = Math.min(width, height) * 0.6,
        linkHeight = 50,
        margin = 5,
        heatmapWidth = wrapperWidth - (linkHeight + margin),
        mousePosition;

    var svg = d3.select('#test')
        .attr('width', width)
        .attr('height', height)
        // .on('mousemove', function() {
        //     mousePosition = d3.mouse(this);
        //     tooltipGroup.attr('transform', 'translate(' + (mousePosition[0] - (150 / 2) + 10) + ',' + (mousePosition[1] + 20) + ')');
        //     tooltipText.text(function() {
        //         return selectedCell ? '(' + selectedCell.col + ', ' + selectedCell.row + '): value: ' + selectedCell.value : ''
        //     });
        // });

    var heatmap = svg.append('g').attr('class', 'heatmap')
        .attr('transform', 'translate('+ ((width - wrapperWidth) / 2) + ',' + ((height - wrapperWidth) / 2) + ')');

    var tableData = [
        {
            key: 'a',
            values: [
                {key: 'd1', value: 0.1},
                {key: 'd2', value: 0.5},
                {key: 'd4', value: 0.9},
                {key: 'd3', value: 0.6}
            ]
        },
        {
            key: 'f',
            values: [
                {key: 'd1', value: 0.6},
                {key: 'd2', value: 0.9},
                {key: 'd4', value: 0.6},
                {key: 'd3', value: 0.9}
            ]
        },
        {
            key: 'g',
            values: [
                {key: 'd1', value: 0.7},
                {key: 'd2', value: 0.8},
                {key: 'd4', value: 0.9},
                {key: 'd3', value: 0.8}
            ]
        },
        {
            key: 'e',
            values: [
                {key: 'd1', value: 0.5},
                {key: 'd2', value: 0.1},
                {key: 'd4', value: 0.4},
                {key: 'd3', value: 0.5}
            ]
        },
        {
            key: 'b',
            values: [
                {key: 'd1', value: 0.2},
                {key: 'd2', value: 0.4},
                {key: 'd4', value: 0.1},
                {key: 'd3', value: 0.7}
            ]
        },
        {
            key: 'c',
            values: [
                {key: 'd1', value: 0.3},
                {key: 'd2', value: 0.3},
                {key: 'd4', value: 0.2},
                {key: 'd3', value: 0.8}
            ]
        },
        {
            key: 'd',
            values: [
                {key: 'd1', value: 0.4},
                {key: 'd2', value: 0.2},
                {key: 'd4', value: 0.3},
                {key: 'd3', value: 0.9}
            ]
        }
    ];

    var nCols = tableData[0].values.length;  // x
    var nRows = tableData.length;           // y
    var bandX = d3.scaleBand()
        .domain(d3.range(nCols))
        .range([0, heatmapWidth]);
    var bandY = d3.scaleBand()
        .domain(d3.range(nRows))
        .range([0, heatmapWidth]);

    var heatColor = d3.scaleLinear().domain([0.1, 0.5, 0.9]).range(['#00ff00', '#ff0000', 'black']);
    var table = heatmap.append('g').attr('class', 'table')
        .attr('transform', 'translate(' + (linkHeight + margin) + ',' + (linkHeight + margin) + ')');
    var rows = table.selectAll('.row')
        .data(tableData)
        .enter().append('g')
        .attr('class', 'row')
        .attr('transform', function(d, i) {
            return 'translate(0, ' + bandY(i) + ')';
        });

    var selectedCell;

    rows.selectAll('rect')
        .data(function(d) { d.values.map(function(i) {return i.parent = d.key}); return d.values; })
        .enter().append('rect')
        .style('fill', function (d) {return heatColor(d.value)})
        .style('opacity', 0.7)
        .attr('x', function(d, i) {return bandX(i);})
        .attr('width', bandX.bandwidth())
        .attr('height', bandY.bandwidth())
        // .on('mouseover', function(d) {
        //     selectedCell = {row: d.parent, col: d.key, value: d.value};
        //     tooltip.style('opacity', 1);
        //     d3.select(this)
        //         .style('opacity', 1)
        //         .style('stroke', '#000')
        //         .style('stroke-width', 2);
        // })
        // .on('mouseout', function(d) {
        //     selectedCell = null;
        //     tooltip.style('opacity', 0);
        //     d3.select(this)
        //         .style('opacity', 0.7)
        //         .style('stroke-width', 0);
        // });


    var yRootData = {
        totalLength: 0.76,
        children: [
            {
                length: 0.05,
                children: [
                    {
                        length: 0.71,
                        key: 'a'
                    },
                    {
                        length: 0.37,
                        children: [
                            {
                                length: 0.34,
                                key: 'f'
                            },
                            {
                                length: 0.34,
                                key: 'g'
                            }
                        ]
                    }
                ]
            },
            {
                length: 0.33,
                children: [
                    {
                        length: 0.43,
                        key: 'e'
                    },
                    {
                        length: 0.21,
                        children : [
                            {
                                length: 0.22,
                                key: 'b'
                            },
                            {
                                length: 0.10,
                                children: [
                                    {
                                        length: 0.12,
                                        key: 'c'
                                    },
                                    {
                                        length: 0.12,
                                        key: 'd'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var yRoot = d3.hierarchy(yRootData)
        .sum(function(d) {
            return d.length;
        });

    setYLinkScaledY(yRoot, yRoot.data.length = 0, linkHeight / yRoot.data.totalLength);
    function setYLinkScaledY(d, y0, k) {
        d.yLinkScaledY = (y0 += d.data.length) * k;
        if (d.children) d.children.forEach(function(d) { setYLinkScaledY(d, y0, k); });
    }

    var yCluster = d3.cluster()
        .size([heatmapWidth, linkHeight]) // 245, 50
        .separation(function() {return 1;});

    yCluster(yRoot);

    var yLinks = heatmap.append('g').attr('class', 'ylinks')
        .attr('transform', 'translate(' + 0 + ',' + (linkHeight + margin) + ')');
    yLinks.selectAll('.link')
        .data(yRoot.descendants().slice(1))
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('stroke-width', 1)
        .attr("d", function(d) {
            return "M" + d.yLinkScaledY + "," + d.x
                    + "L" + d.parent.yLinkScaledY + "," + d.x
                    + " " + d.parent.yLinkScaledY + "," + d.parent.x;
        });

    var linkExtension = heatmap.append("g")
      .attr('transform', 'translate(' + 0 + ',' + (linkHeight + margin) + ')')
      .attr("class", "link-extensions")
      .selectAll("path")
      .data(yRoot.links().filter(function(d) {
          return !d.target.children;
        }))
      .enter().append("path")
      .each(function(d) {
        d.target.linkExtensionNode = this;
      })
      .attr("d", linkExtensionVariable)
      .style("stroke","black")

    function linkExtensionVariable(d) {
      return linkStep(d.target.x, d.target.yLinkScaledY, d.target.x, linkHeight);
      // return linkStep(innerRadius, d.target.x, d.target.radius, d.target.x); // x 轴聚类
    }

    function linkStep(startAngle, startRadius, endAngle, endRadius) {
      return "M" + startRadius  + "," + startAngle
          // + (endAngle === startAngle ? "" : "L" + startRadius  + "," + endAngle)
          + "L" + startRadius + "," + endAngle
          + "L" + endRadius + "," + endAngle
    }

    var yNodes = heatmap.append('g').attr('class', 'ynodes')
        .attr('transform', 'translate(' + (heatmapWidth + margin + 10) + ',' + (linkHeight + margin + 4) + ')');
    yNodes.selectAll('.y-node')
        .data(yRoot.descendants())
        .enter().append('text')
        .attr('class', function(d) {return 'y-node ' + (d.data.key ? d.data.key : '')})
        .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })
        .text(function(d) { return d.children ? '' : d.data.key });
    //
    //     var xRootData = this.$store.state.test
    //
    //     var xRoot = d3.hierarchy(xRootData, function(d) {
    //       return d.branchset;
    //     })
    //         .sum(function(d) {
    //             return d.length;
    //         });
    //
    //         console.log(xRoot);
    //
    //     setXLinkScaledY(xRoot, xRoot.data.length = 0, 0.2);
    //
    //     function setXLinkScaledY(d, y0, k) {
    //         d.xLinkScaledY = (y0 += d.data.length) * k;
    //         if (d.children) d.children.forEach(function(d) { setXLinkScaledY(d, y0, k); });
    //     }
    //     var xCluster = d3.cluster()
    //         .size([heatmapWidth, linkHeight])
    //         .separation(function() {return 1;});


    var xRootData = {
        totalLength: 0.8,
        children: [
            {
                length: 0.4,
                children: [
                    {
                        length: 0.4,
                        key: 'd1'
                    },
                    {
                        length: 0.4,
                        key: 'd2'
                    }
                ]
            },
            {
                length: 0.6,
                children: [
                    {
                        length: 0.2,
                        key: 'd4'
                    },
                    {
                        length: 0.2,
                        key: 'd3'
                    }
                ]
            }
        ]
    };

    var xRoot = d3.hierarchy(xRootData)
        .sum(function(d) {
            return d.length;
        });

    setXLinkScaledY(xRoot, xRoot.data.length = 0, linkHeight / xRoot.data.totalLength);

    function setXLinkScaledY(d, y0, k) {
        d.xLinkScaledY = (y0 += d.data.length) * k;
        if (d.children) d.children.forEach(function(d) { setXLinkScaledY(d, y0, k); });
    }
    var xCluster = d3.cluster()
        .size([heatmapWidth, linkHeight])
        .separation(function() {return 1;});

    xCluster(xRoot);
    var xLinks = heatmap.append('g').attr('class', 'xlinks')
        .attr('transform', 'translate(' + (linkHeight + margin) + ',' + 0 + ')');
    xLinks.selectAll('.link')
        .data(xRoot.descendants().slice(1))
        .enter().append('path')
        .attr('class', 'link')
        .style('fill', 'none')
        .style('stroke', 'blue')
        .style('stroke-width', 1)
        .attr("d", function(d) {
            return "M" + d.x + "," + d.xLinkScaledY
                    + "L" + d.x + "," + d.parent.xLinkScaledY
                    + " " + d.parent.x + "," + d.parent.xLinkScaledY;
        });

    // var xNodes = heatmap.append('g').attr('class', 'xnodes')
    //     .attr('transform', 'translate(' + (linkHeight + margin - 5) + ',' + (heatmapWidth + margin + 20) + ')');
    // xNodes.selectAll('.x-node')
    //     .data(xRoot.descendants())
    //     .enter().append('text')
    //     .attr('class', 'x-node')
    //     .style("text-anchor", 'start')
    //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    //     .text(function(d) { return d.children ? '' : d.data.key });

    // var tooltipGroup = svg.append('g').attr('class', 'tooltip');
    // var tooltip = tooltipGroup.append('rect')
    //         .attr('x', 0)
    //         .attr('y', 0)
    //         .attr('width', 150)
    //         .attr('height', 30)
    //         .style('opacity', 0)
    //         .style('stroke', '#000')
    //         .style('stroke-width', 1)
    //         .style('fill', 'rgba(255, 255, 255, 0.9');
    // var tooltipText = tooltipGroup.append('text')
    //         .attr('x', 0)
    //         .attr('y', 0)
    //         .attr('dx', 10)
    //         .attr('dy', 20)
    },
    routerChange () {
      this.idShow = false
      this.idShowChange()
    },
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
      // mouseover text
      let tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('visibility', 'hidden')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('color', 'yellow')
        .text('')
      var array_data = [];
      var margin = { top: 50, right: 20, bottom: 100, left: 100 },
          width = 820 - margin.left - margin.right,        // 所有格子区域的宽度，即Heatmap的宽度
          height = self.height * yData.length ,
          gridSize = Math.floor(width / xData.length)     // 求地板，即去掉小数部分，width分成 xData.length 份

              function sortNumber (a, b) {
                return a - b
              }
              self.sortValue.sort(sortNumber)   //  排序后的数组
              let min = self.sortValue[Math.ceil(0.1 * self.sortValue.length)]
              let middle = self.sortValue[Math.ceil(self.sortValue.length/2)]
              let max = self.sortValue[self.sortValue.length - Math.ceil(0.1 * self.sortValue.length) - 1]

              var linear = d3.scaleLinear()
              				.domain([min, middle, max])
              				.range([(d3.rgb(0,255,0)).darker(1), (d3.rgb(19,3,3)).darker(1), (d3.rgb(255,0,0)).darker(0.7)]);

              // 设置chart，svg
              var svg = d3.select("#d3container").append("svg") // 选择“chart”（就是div），加入一个svg，设置属性跟div一样大
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .attr("class", "d3svg")
                  .append("g")    // 在svg内加入一个g（group组），并设置元素g的显示位置
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

              var timeLabels = svg.selectAll(".testLabel")
                  .data(xData)
                  .enter().append("text")
                  .text(function(d) { return d; })
                  .attr("x", function(d, i) { return i * gridSize + 15; })
                  .attr("y", height)
                  .attr("class", 'xText')
                  .style("font-size", "9px")
                  // .style("font-weight", "bold")
                  .style("font-family", "Consolas, Monaco, monospace")
                  .style("text-anchor", "start")
                  .attr('transform', (d,i)=>{
                    return 'rotate(45, ' + (i * gridSize) + ' '+ (height) +')'
                  })

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
                  .attr("x", function(d, i){ return (i % xData.length)*gridSize;})
                  .attr("y", function(d, i){ return parseInt(i / xData.length) * self.height;})
                  .attr("width", gridSize)
                  .attr("height", self.height)
                  .style("fill", "#FFFFFF")
                  .on('mouseover', function (d, i) {
                    return tooltip.style('visibility', 'visible').text(d)
                  })
                  .on('mousemove', function (d, i) {
                    return tooltip.style('top', (d3.event.pageY-10)+'px').style('left',(d3.event.pageX+10)+'px')
                  })
                  .on('mouseout', function (d, i) {
                    return tooltip.style('visibility', 'hidden')
                  })
              // duration(1000) 在1000ns也就是1s内将格子图上色
              heatMap.transition().duration(500)
                  .style("fill", function(d) { return linear(d) });
    },
    initBoxPlot () {
      let stages = this.$store.state.heatmapJson.stages
      let genes = this.$store.state.heatmapJson.genes
      let json = this.$store.state.heatmapJson.heatmap_json_string
      let boxplot = new Highcharts.Chart({
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
                          text: 'TPMs'
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
                      name: 'TPMs',
                      data: [
                      ]
                  }
                  ]
              });

          draw_boxplot(['ENSG00000050426'], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

          var offset = {
            left: 320,
            top: 418.84375
          };
          var min_y = offset.top + 100;
          var x_pos = offset.left;

          var current = null;
          var current_objects = []; // dendrogram.data.nodes[0].objects;
          var current_columns = [];

          function draw_boxplot(object_ids, column_ids, y){
              current_columns = column_ids;
              var header = dendrogram.header;
              if(current_columns.length === 0){
                  for(j = 0; j<header.length; j++){
                      current_columns.push(j);
                  }
              }

              var class2values = {};
              for (var m = 0; m < stages.length; ++ m) {
                  class2values[stages[m]] = [];
              }

              var max_y = min_y + 811 - 150;
              var i, j, values, row_id, key;
              //var header = dendrogram.header;
              var column_metadata = ["HF", "HF", "dCM", "dCM", "HF", "Normal", "Normal", "Normal", "Normal", "Normal", "HF", "dCM"];
              var boxplot_height = 400;

              y = (y + boxplot_height > max_y)?max_y - boxplot_height:y-100;
              y = (y < min_y)?min_y: y;

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
  width: 60%;
  padding: 0 20px;
  margin: 19px auto;
}
.icon-func-div {
  margin-top: 10px;
}
.font-size-12 {
  font-size: 12px;
}
</style>
