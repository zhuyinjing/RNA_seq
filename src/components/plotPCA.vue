<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>
      <div class="">
        <imgMenuShowComp></imgMenuShowComp>

        <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>PCA 主成分分析</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>PCA 主成分分析</h2>

        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
        <!-- <div style="margin: 15px 0;"></div> -->
        <el-checkbox-group v-model="checkedPCA" @change="handlecheckedPCAChange">
          <el-checkbox style="width:20%" v-for="pca in checkboxValue" :label="pca" :key="pca">PC{{pca}}</el-checkbox>
        </el-checkbox-group>

        <br>
        <el-button type="primary" @click="initD3()">确定</el-button>
        <el-button type="info" @click="clearChecked()">清空</el-button>

        <div class="container"></div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'
import * as d3 from 'd3'

export default {
  data() {
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
      percentVariance: [],
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  created() {
    this.getValue()
  },
  mounted() {},
  methods: {
    getValue() {
      this.axios.get('/server/pca4gene?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        this.maxValue = res.data.maxValue
        this.minValue = res.data.minValue
        this.percentVariance = res.data.pca4GeneExprMatrix.percentVariance
        this.nameSampleMap = res.data.experimentDesign.nameSampleMap
        // checkbox 选项
        for (let i = 0; i < res.data.pca4GeneExprMatrix.percentVariance.length; i++) {
          this.checkboxValue.push(i + 1)
        }
        // 默认选中前两个
        this.checkedPCA = [this.checkboxValue[0], this.checkboxValue[1]]
        // condition array ["A","B","Normal"]
        for (let k in res.data.experimentDesign.conditionNumMap) {
          this.conditionArr.push(k)
        }
        for (let k in res.data.pca4GeneExprMatrix.sampleCoordMap) {
          let obj = {
            name: k,
            value: res.data.pca4GeneExprMatrix.sampleCoordMap[k]
          }
          this.tableValue.push(obj)
        }
        this.initD3()
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
    clearChecked () {
      this.$confirm('此操作将清空您的选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkedPCA = []
        }).catch(() => {});
    },
    initD3() {
      if (this.checkedPCA.length < 2) {
        this.$message('请至少选择2个PC！')
        return
      }
      if (this.checkedPCA.length > 10) {
        this.$message('最多选择10个PC，请修改您的选项！')
        return
      }
      let hassvg = d3.selectAll('.d3svg')
      if (hassvg) {
        d3.selectAll('.d3svg').remove()
      }
      let self = this
      var initWidth = this.checkedPCA.length > 8 ? this.checkedPCA.length * 100 : 800
      var initHeight = this.checkedPCA.length > 8 ? this.checkedPCA.length * 100 : 800
      // var initWidth = 800 + 40 * this.checkedPCA.length
      // var initHeight = 800 + 40 * this.checkedPCA.length

      var padding = {
        left: 80,
        top: 40,
        right: 150,
        bottom: 20
      }

      var width1 = initWidth - padding.left - padding.bottom
      var height1 = initHeight - padding.top - padding.bottom

      var arr = this.checkedPCA

      var width2 = initWidth - padding.left - padding.bottom
      var height2 = initHeight - padding.top - padding.bottom

      // color 配色
      var colorRandom = d3.scaleOrdinal(d3.schemeCategory20)

      var svgG = d3.select(".container")
        .append("svg")
        .attr("class", "d3svg")
        .attr("width", width1)
        .attr("height", height1)
        .style("padding-left", padding.left)
        .style("padding-right", padding.right)
        .style("padding-top", padding.top)
        .style("padding-bottom", padding.bottom)

      if (this.checkedPCA.length === 2) {
        var width = width2
        var height = height2
        var svg = svgG.append('g').attr('transform', 'translate(' + 0 + ',' + 0 + ')')
        //  x轴文字
        svg.append("text")
    					.attr("x", width / 2)
    					.attr("y", -20)
    					.attr("dy", "-0.3em")
    					.text(function(){
                // return "PC" + self.checkedPCA[0] + ": " + (self.percentVariance[self.checkedPCA[0] - 1] * 100).toFixed(0) + "% " + "variance";
    						return "PC" + self.checkedPCA[0];
    					});
        svg.append("text")
    					.attr("x", width / 2)
    					.attr("y", -5)
    					.attr("dy", "-0.3em")
    					.text(function(){
                // return "PC" + self.checkedPCA[0] + ": " + (self.percentVariance[self.checkedPCA[0] - 1] * 100).toFixed(0) + "% " + "variance";
    						return "(" + (self.percentVariance[self.checkedPCA[0] - 1] * 100).toFixed(0) + "%)";
    					});
        //  y轴文字
        svg.append("text")
    					.attr("x", -60)
    					.attr("y", height / 2)
              .attr("dy", "-0.3em")
              .style('text-anchor', 'start')
              // .attr('transform', 'rotate(-90' + ' ' + 200 + ' ' + '220)')
    					.text(function(){
                // return "PC" + self.checkedPCA[1] + ": " + (self.percentVariance[self.checkedPCA[1] - 1] * 100).toFixed(0) + "% " + "variance";
                return "PC" + self.checkedPCA[1];
    					});
          svg.append("text")
      					.attr("x", -60)
      					.attr("y", height / 2 + 20)
                .attr("dy", "-0.3em")
                .style('text-anchor', 'start')
                // .attr('transform', 'rotate(-90' + ' ' + 200 + ' ' + '220)')
      					.text(function(){
                  // return "PC" + self.checkedPCA[1] + ": " + (self.percentVariance[self.checkedPCA[1] - 1] * 100).toFixed(0) + "% " + "variance";
                  return "(" + (self.percentVariance[self.checkedPCA[1] - 1] * 100).toFixed(0) + "%)";
      					});
        //y轴比例尺
        var yScale = d3.scaleLinear().range([height, 0])
          .domain([(d3.max([self.maxValue[self.checkedPCA[0] - 1], self.maxValue[self.checkedPCA[1] - 1]])) + 2, (d3.min([self.minValue[self.checkedPCA[0] - 1], self.minValue[self.checkedPCA[1] - 1]])) - 2])
        //定义y轴
        var yAxis = d3.axisLeft(yScale).ticks(3)
        //添加y轴
        var yaxisg = svg.append("g")
          .attr("class", "yaxis")
          .attr("transform", "translate(" + 0 + "," + 0 + ")")
          .call(yAxis)
          .style("font-size", "14px")
        //x轴比例尺
        var xScale = d3.scaleLinear().range([0, width])
          .domain([(d3.min([self.minValue[self.checkedPCA[0] - 1], self.minValue[self.checkedPCA[1] - 1]])) - 2, (d3.max([self.maxValue[self.checkedPCA[0] - 1], self.maxValue[self.checkedPCA[1] - 1]])) + 2])
        //定义x轴
        var xAxis = d3.axisBottom(xScale).ticks(3)
        //添加x轴
        var xaxisg = svg.append("g")
          .attr("class", "xaxis")
          .attr("transform", "translate(" + "0 ," + height + ")")
          .call(xAxis)
          .style("font-size", "14px")
        // d3.selectAll('.domain').remove() // 删除多余的两端刻度线
        //添加网格-----------
        // gridlines in x axis function
        function make_x_gridlines() {
          return d3.axisBottom(xScale)
            .ticks(3)
        }

        // gridlines in y axis function
        function make_y_gridlines() {
          return d3.axisLeft(yScale)
            .ticks(3)
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
        var colorRandom = d3.scaleOrdinal(d3.schemeCategory20)
        //添加circle包裹层，有几种类型添加几个
        var cover = svg.append("g")

        //添加circle
        cover.selectAll("circle")
          .data(self.tableValue)
          .enter()
          .append("circle")
          .attr("cx", function(d, i) {
            return xScale(d['value'][self.checkedPCA[0] - 1])
          })
          .attr("cy", function(d, i) {
            return yScale(d['value'][self.checkedPCA[1] - 1])
          })
          .attr("r", function(d) {
            return 6
          })
          .attr("fill", function(d) {
            return colorRandom(colorRandom(self.nameSampleMap[d['name']]['condition']))
          })
          .on("mouseover", function(d) {
            d3.select(this)
              // .attr("r", d3.select(this).attr("r") * 1.6)
            showtext.attr("x", function() {
                return xScale(d['value'][self.checkedPCA[0] - 1])
              })
              .attr("y", function() {
                return yScale(d['value'][self.checkedPCA[1] - 1]) - d3.select(this).attr("r") * 1.6 - 20
              })
              .text(function() {
                return d.name
              })
              .attr("text-anchor", "middle")
          })
          .on("mouseout", function() {
            d3.select(this)
              // .attr("r", d3.select(this).attr("r") / 1.6)
            showtext.text("")
          })

        //添加左侧提示部分包裹层
        let detail = cover.append("g")
        let showtext = svg.append("text")
          .text("")
          .attr("font-size", '14px')

      } else {
        var width = width2 / self.checkedPCA.length
        var height = height2 / self.checkedPCA.length
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            var svg = svgG.append('g').attr('transform', 'translate(' + (j * (width) + (0)) + ',' + (i * (height) + (0)) + ')')
            // var svg = svgG.append('g').attr('transform','translate('+ (j * (width) + (j* 10))  +','+ (i * (height) + (i* 10)) +')')
            //y轴比例尺
            var yScale = d3.scaleLinear().range([height, 0])
              .domain([(d3.max([self.maxValue[arr[j] - 1], self.maxValue[arr[i] - 1]])) + 2, (d3.min([self.minValue[arr[j] - 1], self.minValue[arr[i] - 1]])) - 2])
            //定义y轴
            var yAxis = d3.axisLeft(yScale).ticks(arr.length > 2 ? 0 : 3)
            //添加y轴
            var yaxisg = svg.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(" + 0 + "," + 0 + ")")
              .call(yAxis)
              .style("font-size", "14px")
            //x轴比例尺
            var xScale = d3.scaleLinear().range([0, width])
              .domain([(d3.min([self.minValue[arr[j] - 1], self.minValue[arr[i] - 1]])) - 2, (d3.max([self.maxValue[arr[j] - 1], self.maxValue[arr[i] - 1]])) + 2])
            //定义x轴
            var xAxis = d3.axisBottom(xScale).ticks(arr.length > 2 ? 0 : 3)
            //添加x轴
            var xaxisg = svg.append("g")
              .attr("class", "xaxis")
              .attr("transform", "translate(" + "0 ," + height + ")")
              .call(xAxis)
              .style("font-size", "14px")
            // d3.selectAll('.domain').remove() // 删除多余的两端刻度线
            //添加网格-----------
            // gridlines in x axis function
            function make_x_gridlines() {
              return d3.axisBottom(xScale)
                .ticks(3)
            }

            // gridlines in y axis function
            function make_y_gridlines() {
              return d3.axisLeft(yScale)
                .ticks(3)
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
            //添加circle包裹层，有几种类型添加几个
            var cover = svg.append("g")

            //添加circle
            cover.selectAll("circle")
              .data(self.tableValue)
              .enter()
              .append("circle")
              .attr("cx", function(d) {
                return xScale(d['value'][arr[j] - 1])
              })
              .attr("cy", function(d) {
                return yScale(d['value'][arr[i] - 1])
              })
              .attr("r", function(d) {
                return self.checkedPCA.length > 6 ? 2 : 10 / (arr.length - 1)
              })
              .attr("fill", function(d) {
                return colorRandom(self.nameSampleMap[d['name']]['condition'])
              })
              .on("mouseover", function(d) {
                d3.select(this)
                  // .attr("r", d3.select(this).attr("r") * 1.6)
                showtext.attr("x", function() {
                    return xScale(0)
                  })
                  .attr("y", function() {
                    return yScale(0)
                  })
                  .text(function() {
                    return d.name
                  })
                  .attr("text-anchor", "middle")
              })
              .on("mouseout", function() {
                d3.select(this)
                  // .attr("r", d3.select(this).attr("r") / 1.6)
                showtext.text("")
              })

            //添加左侧提示部分包裹层
            let detail = cover.append("g")
            let showtext = svg.append("text")
              .text("")
              .attr("font-size", '14px')

          }
          //  x轴文字
          svgG.append("text")
      					.attr("x", (width / 2.5) + (i * width))
      					.attr("y", -15)
      					.attr("dy", "-0.3em")
      					.text(function(){
      						return "PC" + self.checkedPCA[i];
      					});
          svgG.append("text")
      					.attr("x", (width / 2.5) + (i * width))
      					.attr("y", -2)
      					.attr("dy", "-0.3em")
      					.text(function(){
      						return "(" + (self.percentVariance[self.checkedPCA[i] - 1] * 100).toFixed(0) + "%" + ")";
      					});
          //  y轴文字
          svgG.append("text")
      					.attr("x", -60)
      					.attr("y", height / 2 + (i * height))
                .attr("dy", "-0.3em")
                .style('text-anchor', 'start')
                // .attr('transform', 'rotate(-90' + ' ' + 50 * (i+1) + ' ' + 80 * (i+1) +')')
      					.text(function(){
                  return "PC" + self.checkedPCA[i];
      					});
          svgG.append("text")
      					.attr("x", -60)
      					.attr("y", height / 2 + 20 + (i * height))
                .attr("dy", "-0.3em")
                .style('text-anchor', 'start')
                // .attr('transform', 'rotate(-90' + ' ' + 50 * (i+1) + ' ' + 80 * (i+1) +')')
      					.text(function(){
                  return "(" + (self.percentVariance[self.checkedPCA[i] - 1] * 100).toFixed(0) + "%" + ")";
      					});
        }
      }


      //  去掉多余的 path class='domain'
      d3.selectAll(".xaxis .domain").remove();
      d3.selectAll(".yaxis .domain").remove();

      //  右侧颜色图例
      svgG.append("text")
        .attr("x", width1 + 10)
        .attr("y", 120)
        .attr("dy", "-0.3em")
        .text(function() {
          return "group";
        });
      for (let i = 0; i < self.conditionArr.length; i++) {
        svgG.append("rect")
          .attr("x", width1 + 10) // rect 横坐标无需改动
          .attr("y", 130 + 30 * i)
          .attr("width", 30)
          .attr("height", 30)
          .attr("fill", "white")
          .attr("stroke", "#999")
        svgG.append("circle")
          .attr("cx", width1 + 10 + 15) // 圆心x坐标无需改动
          .attr("cy", (130 + 30 * i) + 15)
          .attr("r", 8)
          .attr("fill", colorRandom(self.conditionArr[i]))
        svgG.append("text")
          .attr("x", width1 + 10 + 40) // text x坐标无需改动
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
  float: left;
  /* width: 60%; */
  width: calc(100% - 350px);
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
  stroke: #cccccc4d;
}
</style>
