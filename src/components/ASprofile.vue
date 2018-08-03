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
        <el-breadcrumb-item>可变剪切事件数量统计</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>可变剪切事件数量统计</h2>

      <div class="" style="min-width:1100px">
        <label for="">可变剪切事件</label>
        <el-select v-model="events" multiple placeholder="请选择" style="width:400px;">
          <el-option
            v-for="item in eventsArr"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label for="">样本</label>
        <el-select v-model="samples" multiple placeholder="请选择" style="width:400px;">
          <el-option
            v-for="(item,key) in samplesArr"
            :key="item"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="initD3()">提交</el-button>
      </div>

      <div id="canvas"></div>

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
      events: [],
      samples: [],
      eventsArr: [],
      samplesArr: [],
      data: {},
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted() {
    this.getValue()
  },
  methods: {
    getValue () {
      this.axios.get('/server/as_profile_info?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        if (res.data.message_type === 'success') {
          this.eventsArr = res.data.ASProfileInfo.asName
          this.samplesArr = res.data.ASProfileInfo.sampleName
          this.data = res.data.ASProfileInfo.asEventMap
          // 默认全选
          this.events = res.data.ASProfileInfo.asName
          // 存索引
          this.samplesArr.forEach((value, key) => {
            this.samples.push(key)
          })
          this.initD3()
        } else {
          this.$message.error('请求错误!')
        }
      })
    },
    initD3() {
      if (this.events.length === 0 || this.samples.length === 0 ) {
        this.$message.error('请选择可变剪切事件和样本，不能为空！')
        return
      }
      let hassvg = d3.selectAll('svg')
      if (hassvg) {
        d3.selectAll('svg').remove()
      }
      let width = 800
      let height = 400
      let margin = {left: 100, right: 30, top: 30, bottom: 80}

      let tooltip = d3.select('body')
      	.append('div')
      	.style('position', 'absolute')
        .style('z-index', '10')
        .style('visibility', 'hidden')
        .style('font-size', '14px')
      	.style('font-weight', 'bold')
      	.text('')

      for (let i = 0;i < this.events.length;i++) {
        let svg = d3.select('#canvas')
          .append('svg')
          .attr('id', 'svg')
          .attr('width', width)
          .attr('height', height)

        let arr = this.data[this.events[i]].filter((value, key) => {
            if (this.samples.includes(key)) {
                return value
            }
        })

        let xData = this.samplesArr.filter((value, key) => {
            if (this.samples.includes(key)) {
                return value
            }
        })
        var x = d3.scaleBand()
          .domain(xData)
          .rangeRound([margin.left, width - margin.right])
          .padding(0.5)

        var y = d3.scaleLinear()
          .domain([0, d3.max(arr)])
          .rangeRound([height - margin.bottom, margin.top]);

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        svg.append("g")
          .selectAll("g")
          .data(arr)
          .enter().append("g")
          .attr("fill", (d, j) => {
            return color(i)
          })
          .selectAll("rect")
          .data(arr)
          .enter().append("rect")
          .attr("width", x.bandwidth)
          .attr("x", (d, i) => {
            return x(xData[i])
          })
          .attr("y", (d) => {
            return y(d)
          })
          .attr("height", (d) => {
            return y(0) - y(d)
          })
          .on('mouseover', (d, i) => {
            return tooltip.style('visibility', 'visible').text(d)
          })
          .on('mousemove', function (d, i) {
            return tooltip.style('top', (event.pageY-10)+'px').style('left',(event.pageX+10)+'px')
          })
          .on('mouseout', function (d, i) {
            return tooltip.style('visibility', 'hidden')
          })

        svg.append("g")
          .attr("transform", "translate(0," + y(0) + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .style("text-anchor", "start")
          .attr("transform", "rotate(45 -10 10)");

        svg.append("g")
          .attr("transform", "translate(" + margin.left + ",0)")
          .call(d3.axisLeft(y))
          .append('text')
          .text(this.events[i])
          .style("font-size", "16px")
          .attr('fill', '#000')
          .attr('transform', 'translate(' + 0 + ', 25)')
      }

    },
  }
}
</script>

<style scoped="true">
.content {
  float: left;
  width: calc(100% - 350px);
  padding: 0 20px;
  margin: 19px auto;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
