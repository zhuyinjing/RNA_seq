<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backReport"></i>
    </el-tooltip>
    <h3>项目：{{$store.state.projectName}}</h3>
    <h4>序列比对结果统计图</h4>
    <p>图中每种颜色代表一个样本，纵坐标为碱基数目，横坐标分别是比对到基因组各种区域上的碱基数。</p>

    <div id="metrics_bar"></div>

    <table class="gridtable">
      <caption>序列比对结果统计表</caption>
      <thead>
        <tr>
          <th>样本</th>
          <th>总碱基数</th>
          <th>核糖体占比</th>
          <th>编码区占比</th>
          <th>UTR占比</th>
          <th>内含子区占比</th>
          <th>基因间区占比</th>
        </tr>
      </thead>
      <tr v-for="(item, index) in tableData">
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item[0]}}</td>
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item[1]}}</td>
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(item[16] - 0).toFixed(3)}}</td>
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(item[17] - 0).toFixed(3)}}</td>
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(item[18] - 0).toFixed(3)}}</td>
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(item[19] - 0).toFixed(3)}}</td>
        <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(item[20] - 0).toFixed(3)}}</td>
      </tr>
    </table>

  </div>
</template>

<script>
import Plotly from 'plotly.js'
export default {
  data () {
    return {
      traces: [],
      tableData: []
    }
  },
  components: {
  },
  mounted () {
    this.initTable()
  },
  methods: {
    initTable () {
      this.axios.get('/server/mappingqc?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        this.tableData = res.data.slice(1)
        for (let i = 0;i < this.tableData.length;i++) {
          let data = this.tableData[i]
          let obj = {
            x: ['总碱基数', '核糖体碱基数', '编码区碱基数', 'UTR碱基数', '内含子碱基数', '基因间区碱基数'],
            y: [data[1]-0, data[3]-0, data[4]-0, data[5]-0, data[6]-0, data[7]-0],
            name: data[0],
            type: 'bar'
          }
          this.traces.push(obj)
        }
        var layout = {barmode: 'group'};
        Plotly.newPlot('metrics_bar', this.traces, layout);
      })
    },
    backReport () {
      this.$router.push({'name': 'report'})
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
table.gridtable {
    width: 100%;
    text-align: center;
    font-size:14px;
    color:#333333;
    border-width: 1px;
    border-color: #ebeef5;
    border-collapse: collapse;
}
table.gridtable th {
    color: #333;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #ebeef5;
}
table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #ebeef5;
    background-color: #ffffff;
}
.bgcolor {
  background-color: #f9f9f9 !important;
}
</style>
