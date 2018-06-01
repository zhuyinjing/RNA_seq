<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backReport"></i>
    </el-tooltip>

    <div class="">
          <div class="" style="width:5px;display:inline-block">
            <el-slider
            v-model="yTop"
            :step="0.1"
            :min="xRightOptions.min"
            :max="xRightOptions.max"
             vertical
            :style="{marginTop: '-50px',marginLeft: '-20px',height: xRightOptions.height + 'px'}"
            @change="xLeftChange()"
            >
          </el-slider>
          </div>
          <div id="canvas" style="display:inline-block"></div>
          <div class="">
              <el-slider
              v-model="xLeft"
              :step="0.1"
              :min="xLeftOptions.min"
              :max="xLeftOptions.max"
              :style="{width: xLeftOptions.width + 'px', marginLeft: '30px'}"
              @change="xLeftChange()"
              >
            </el-slider>
          </div>
          <div class="">
            <el-switch
              style="display: block"
              v-model="xvalueShow"
              active-color="#409EFF"
              inactive-color="#409EFF"
              active-text="x轴:pvalue"
              inactive-text="x轴:padj"
              @change="xvaluechange"
            >
            </el-switch>
          </div>
          <br>
          <div class="">
            显示基因个数:<el-input-number size="mini" v-model="showNum" @change="getData" :min="0" label="描述文字"></el-input-number><span class="geneSumStyle"> (总数：{{this.geneSum}})</span>
          </div>
          <br>
          <div class="">
            Log2FoldChange:<el-input-number size="mini" :min="1" v-model="xLeft" :step="0.1" @change="xLeftChange"></el-input-number>
            -log10(pvalue):<el-input-number size="mini" :min="0" v-model="yTop" :step="0.1" @change="xLeftChange"></el-input-number>
          </div>
          <br>
          <div class="">
            xmin:<el-input-number size="mini" v-model="xmin" @change="initD3"></el-input-number>
            xmax:<el-input-number size="mini" v-model="xmax" @change="initD3"></el-input-number>
          </div>
          <br>
          <div class="">
            ymin:<el-input-number size="mini" v-model="ymin" @change="initD3"></el-input-number>
            ymax:<el-input-number size="mini" v-model="ymax" @change="initD3"></el-input-number>
          </div>
          <br>
          <div class="">
            width:<el-input-number size="mini" v-model="width" @change="initD3"></el-input-number>
            height:<el-input-number size="mini" v-model="height" @change="initD3"></el-input-number>
          </div>
          <br>
          <div class="">
            radius:<el-input-number size="mini" v-model="radius" :min="0" :step="0.1" @change="initD3"></el-input-number>
          </div>
          <br>
        </dv>
    </div>

  </div>
</template>

<script>
import * as d3 from 'd3'
import vueSliderComp from 'vue-slider-component'

export default {
  data () {
    return {
      showNum: 3000,
      arr: [],
      xvalueShow: true,
      geneSum: null,
      toolDivShow: false,
      xLeft: 0,
      yTop: 0,
      xmin: -3,
      xmax: 3,
      ymin: 0,
      ymax: 12,
      radius: 1,
      width: 800,
      height: 600,
      xLeftOptions: {
        eventType: 'auto',
        width: 750,
        height: 6,
        dotSize: 16,
        dotHeight: null,
        dotWidth: null,
        min: 1,
        max: 4,
        interval: 0.1,
        show: true,
        speed: 0.5,
        disabled: false,
        piecewise: false,
        piecewiseStyle: false,
        piecewiseLabel: false,
        tooltip: false,
        tooltipDir: 'top',
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: false,
        formatter: null,
        bgStyle: null,
        sliderStyle: null,
        processStyle: null,
        piecewiseActiveStyle: null,
        piecewiseStyle: null,
        tooltipStyle: null,
        labelStyle: null,
        labelActiveStyle: null
      },
      xRightOptions: {
        eventType: 'auto',
        width: 5,
        height: 550,
        dotSize: 16,
        dotHeight: null,
        dotWidth: null,
        min: 2,
        max: 4,
        interval: 0.1,
        show: true,
        speed: 0.5,
        disabled: false,
        piecewise: false,
        piecewiseStyle: false,
        piecewiseLabel: false,
        tooltip: false,
        tooltipDir: 'top',
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: false,
        formatter: null,
        bgStyle: null,
        sliderStyle: null,
        processStyle: null,
        piecewiseActiveStyle: null,
        piecewiseStyle: null,
        tooltipStyle: null,
        labelStyle: null,
        labelActiveStyle: null
      },
      pvalueArr: [],
      padjArr: []
    }
  },
  components: {
    vueSliderComp
  },
  mounted () {
    this.getData()
    if (sessionStorage.getItem('geneSum')) {
      this.geneSum = sessionStorage.getItem('geneSum') - 0
    }
  },
  methods: {
    getData () {
      let _case = sessionStorage.getItem('_case')
      let _control = sessionStorage.getItem('_control')
      this.axios.get('/server/volcano?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&_case=' + _case + '&_control=' + _control + '&gene_num=' + this.showNum).then((res) => {
        if (res.data.length > 0) {
          this.pvalueArr = []
          this.padjArr = []
          res.data = res.data.slice(1)
          for (let i = 0;i< res.data.length; i++) {
            let val = res.data[i]
            this.pvalueArr.push([val[1] - 0, Math.log10(val[2]) * -1, val[4]])
            this.padjArr.push([val[1] - 0, Math.log10(val[3]) * -1, val[4]])
          }
          if (this.xvalueShow === true) {
            this.arr = this.pvalueArr
          } else {
            this.arr = this.padjArr
          }
          this.toolDivShow = true
          this.initD3()
        } else {
          this.$message({
            message: '暂无数据!',
            duration: 1000
          })
        }
      })
    },
    backReport () {
      this.$router.push({'name': 'report'})
    },
    change () {
      let all = d3.selectAll('.red')
      all.attr('class', 'green')
    },
    initD3 () {
      let hassvg = d3.selectAll('svg')
      if (hassvg) {
        d3.selectAll('svg').remove()
      }
      let self = this
      let width = this.width
      let height = this.height
      let padding = {left: 30, right: 30, top: 30, bottom: 30}
      this.xLeftOptions.max = this.xmax
      this.xRightOptions.min = this.ymin
      this.xRightOptions.max = this.ymax
      this.xLeftOptions.width = this.width  - 50
      this.xRightOptions.height = this.height  - 50
      let svg = d3.select('#canvas')
        .append('svg')
        .attr('id', 'svg')
        .attr('width', width)
        .attr('height', height)
      let xScale = d3.scaleLinear()
        .domain([this.xmin, this.xmax])
        .range([0, width - padding.left - padding.right])
      let yScale = d3.scaleLinear()
        .domain([this.ymin, this.ymax])
        .range([height - padding.top - padding.bottom, 0])
      let tooltip = d3.select('body')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
      	.style('color', '#3497db')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
      	.style('font-weight', 'bold')
      	.text('')
      let circles = svg.selectAll('circle')
        .data(self.arr)
        .enter()
        .append('circle')
        .attr('cx', (d) => {
          return padding.left + xScale(d[0])
        })
        .attr('cy', (d) => {
          return padding.bottom + yScale(d[1])
        })
        .attr('r', self.radius)
        .on('mouseover', function (d, i) {
          return tooltip.style('visibility', 'visible').text(d[2])
        })
        .on('mousemove', function (d, i) {
          return tooltip.style('top', (event.pageY-10)+'px').style('left',(event.pageX+10)+'px')
        })
        .on('mouseout', function (d, i) {
          return tooltip.style('visibility', 'hidden')
        })
      let xAxis = d3.axisBottom()
        .scale(xScale)
      let yAxis = d3.axisLeft()
        .scale(yScale)
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(xAxis)
        .append('text')
        .text('Log2FoldChange')
        .attr('stroke', '#808080')
        .attr('transform', 'translate('+ width/2.2 + ', 28)')
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis)
        .append('text')
        .text('-log10(pvalue)')
        .attr('stroke', '#808080')
        .attr('transform', 'translate(' + padding.left + ', -10)')
      svg.selectAll('text')
        .data(self.arr)
        .enter()
        .append('text')
        .filter((d) => {
          return d[1] > 2 && d[0] < -1
        })
        .text((d) => {
          return d[2]
        })
        .attr('x', (d) => {
          return padding.left + xScale(d[0])
        })
        .attr('y', (d) => {
          return padding.bottom + yScale(d[1])
        })
        .attr('fill', '#3497db')
      	.style('color', '#3497db')
        .style('visibility', 'visible')
        .style('font-size', '6px')
      	.style('font-weight', 'bold')
      if (self.xLeft !== 0 || self.yTop !== 0) {
        self.xLeftChange()
      }
    },
    xLeftChange () {
      let self = this
      let svg = d3.selectAll('circle')
        .classed('green', (d, i) => {
          return d[0] < -self.xLeft && d[1] > self.yTop
        })
        .classed('red', (d, i) => {
          return d[0] > self.xLeft && d[1] > self.yTop
        })
    },
    xvaluechange () {
      if (this.xvalueShow === true) {
        this.arr = this.pvalueArr
        this.initD3()
      } else {
        this.arr = this.padjArr
        this.initD3()
      }
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
</style>
<style>
path{
    fill: none;
    stroke: cornflowerblue;
    stroke-width: 2px;
}
.domain,.tick line {
    stroke: gray;
    stroke-width: 1px;
}
.margin-0-auto {
  margin: 0 auto;
}
.green {
  fill: green;
}
.red {
  fill: red;
}
.text-align-center {
  text-align: center;
}
.geneSumStyle {
  font-size: 12px;
  color: #999;
}
.el-slider.is-vertical .el-slider__runway{
  margin-top: -25px;
}
</style>
